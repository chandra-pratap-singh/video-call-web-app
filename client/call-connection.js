import { EVENTS } from "./constants";

class CallConnection {
  eventMap = {
    [EVENTS.SOCKET_ROOM_GENERATED]: [],
    [EVENTS.CONNECTION_STATE_CHANGED]: [],
    [EVENTS.SOCKET_ROOM_JOINED]: [],
    [EVENTS.RECEIVED_REMOTE_STREAM]: [],
    [EVENTS.CONNECTION_TERMINATED]: [],
    [EVENTS.CONNECTION_STEPS_COMPLETED]: [],
  };
  roomId;
  peerConnection;
  socket;
  logger;
  peerConnectionList;
  localStream;
  isSendingOffer = false;

  _registerLogger(peerConnection, socket, logger) {
    const originalEmit = socket.emit;
    socket.emit = function (event, ...args) {
      logger(`Outgoing event: ${event} `, ...args);
      originalEmit.apply(socket, [event, ...args]);
    };
    socket.onAny((event, ...args) => {
      logger(`Incoming event: ${event} `, ...args);
    });
    peerConnection.addEventListener("connectionstatechange", () => {
      logger("Peer connection event: ", peerConnection.connectionState);
    });
  }

  constructor(peerConnection, socket, logger) {
    // if (!this.peerConnection && !this.socket) {
    this.peerConnection = peerConnection;
    this.socket = socket;
    this.logger = logger;
    this._registerLogger(peerConnection, socket, logger);
    // }
  }

  async _sendOffer() {
    // const offer = await this.peerConnection.createOffer();
    try {
      this.isSendingOffer = true;
      await this.peerConnection.setLocalDescription();
      const offer = this.peerConnection.localDescription;
      this.socket.emit("send:offer", offer, this.roomId);
    } catch (err) {
      console.error(err);
    } finally {
      this.isSendingOffer = false;
    }
  }

  async _sendAnswer() {
    // const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription();
    const answer = this.peerConnection.localDescription;
    this.socket.emit("send:answer", answer, this.roomId);
  }

  _executeEvenListereners(event, data) {
    const callbacks = this.eventMap[event];
    callbacks.forEach((callback) => callback(data));
  }

  // _sendNegotiationOffer = async () => {
  //   const offer = await this.peerConnection.createOffer();
  //   await this.peerConnection.setLocalDescription(offer);
  //   this.socket.emit("send:negotiation:offer", offer, this.roomId);
  // };

  _terminateConnection() {
    this.peerConnection.getSenders().forEach((sender) => {
      if (sender.track) {
        sender.track.stop();
      }
    });
    this.peerConnection.close();
    this._executeEvenListereners(EVENTS.CONNECTION_TERMINATED);
  }

  _setAudio(value) {
    const audioSender = this.peerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "audio");
    if (audioSender) {
      audioSender.track.enabled = !!value;
    }
  }

  _setVideo(value) {
    const videoSender = this.peerConnection
      .getSenders()
      .find((sender) => sender.track.kind === "video");
    if (videoSender) {
      videoSender.track.enabled = value;
    }
  }

  async _shareStream() {
    console.log("Function called");
    const ls = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.localStream = ls;

    this.localStream.getTracks().forEach((track) => {
      console.log("called inside track ", this.peerConnection);
      this.peerConnection.addTrack(track, this.localStream);
    });
  }

  async connect() {
    this.peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        this.socket.emit("new:ice:candidate", event.candidate, this.roomId);
      }
    });

    this.socket.on("new:ice:candidate:received", async (iceCandidate) => {
      if (
        iceCandidate &&
        (this.peerConnection.iceConnectionState === "have-remote-offer" ||
          this.peerConnection.iceConnectionState === "have-local-offer")
      ) {
        try {
          await this.peerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
          this.logger("Error adding received ice candidate", e);
        }
      }
    });

    // this.peerConnection.ontrack(() => {
    //   console.log("ontrack called");
    // });

    this.peerConnection.addEventListener("track", (event) => {
      const [remoteStream] = event.streams;
      console.log("received track ", remoteStream);
      this.remoteStream = remoteStream;
      this._executeEvenListereners(EVENTS.RECEIVED_REMOTE_STREAM, {
        remoteStream,
      });
    });

    this.peerConnection.addEventListener("negotiationneeded", (event) => {
      // this._sendNegotiationOffer();
      this._sendOffer();
    });

    this.peerConnection.addEventListener("connectionstatechange", () => {
      this.logger("Peer connection: ", this.peerConnection.connectionState);
      this._executeEvenListereners(EVENTS.CONNECTION_STATE_CHANGED, {
        peerConnection: this.peerConnection.connectionState,
      });
    });

    this.socket.on("socket:room:generated", async (roomId) => {
      this.roomId = roomId;
      this._executeEvenListereners(EVENTS.SOCKET_ROOM_GENERATED, { roomId });
    });

    this.socket.on("new:user:joined", async () => {
      await this._sendOffer();
    });

    this.socket.on("received:answer", async (answer) => {
      const remoteDesc = new RTCSessionDescription(answer);
      await this.peerConnection.setRemoteDescription(remoteDesc);
      // await this._shareStream();
      this.socket.emit("answer:accepted", this.roomId);
    });

    this.socket.on("connection:steps:completed", () => {
      // await this._shareStream();
      this._executeEvenListereners(EVENTS.CONNECTION_STEPS_COMPLETED);
    });

    this.socket.on("received:offer", async (offer) => {
      if (
        this.isSendingOffer ||
        this.peerConnection.signalingState !== "stable"
      )
        return;
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      await this._sendAnswer();
    });

    this.socket.on("received:negotiation:offer", async (offer) => {
      // if (
      //   this.peerConnection.signalingState === "have-remote-offer" ||
      //   this.peerConnection.signalingState === "have-local-pranswer"
      // ) {
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit("send:negotiation:answer", answer, this.roomId);
      // }
    });

    this.socket.on("received:negotiation:answer", async (answer) => {
      console.log(
        "this.peerConnection.signalingState ",
        this.peerConnection.signalingState
      );
      // if (
      //   this.peerConnection.signalingState === "have-remote-offer" ||
      //   this.peerConnection.signalingState === "have-local-pranswer"
      // ) {
      const remoteDesc = new RTCSessionDescription(answer);
      await this.peerConnection.setRemoteDescription(remoteDesc);
      // }
    });

    this.socket.on("socket:room:joined", () => {
      this._executeEvenListereners(EVENTS.SOCKET_ROOM_JOINED);
    });

    this.socket.on("end:call", () => {
      this._terminateConnection();
    });
  }

  getInvitationUrl() {
    const currentUrl = window.location.href;
    const invitationUrl = `${currentUrl}?roomId=${this.roomId}`;
    return invitationUrl;
  }

  getRoomId() {
    return this.roomId;
  }

  getLocalStream() {
    return this.localStream;
  }

  getRemoteStream() {
    return this.remoteStream;
  }

  generateRoom() {
    this.socket.emit("generate:socket:room");
  }

  joinRoom(roomId) {
    this.socket.emit("join:socket:room", roomId);
    this.roomId = roomId;
  }

  muteAudio() {
    this._setAudio(false);
  }

  unMuteAudio() {
    this._setAudio(true);
  }

  muteVideo() {
    this._setVideo(false);
  }

  unMuteVideo() {
    this._setVideo(true);
  }

  endCall() {
    this.socket.emit("end:call:start", this.roomId);
  }

  async startVideo() {
    await this._shareStream();
  }

  on(event, callBack) {
    if (!this.eventMap[event].includes(callBack)) {
      this.eventMap[event] = [...this.eventMap[event], callBack];
    }
  }

  off(event, callBack) {
    this.eventMap[event] = this.eventMap[event].filter(
      (item) => item !== callBack
    );
  }
}

export default CallConnection;
