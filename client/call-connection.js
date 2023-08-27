import { EVENTS } from "./constants";

class CallConnection {
  eventMap = {
    [EVENTS.SOCKET_ROOM_GENERATED]: [],
    [EVENTS.CONNECTION_STATE_CHANGED]: [],
    [EVENTS.SOCKET_ROOM_JOINED]: [],
    [EVENTS.RECEIVED_REMOTE_STREAM]: [],
    [EVENTS.CONNECTION_TERMINATED]: [],
  };
  roomId;
  isPeerPresent;
  peerConnection;
  socket;
  logger;

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
    if (!this.peerConnection && !this.socket) {
      this.peerConnection = peerConnection;
      this.socket = socket;
      this.logger = logger;
      this.isPeerPresent = false;
      this._registerLogger(peerConnection, socket, logger);
    }
  }

  async _sendOffer() {
    const offer = await this.peerConnection.createOffer();
    await this.peerConnection.setLocalDescription(offer);
    this.socket.emit("send:offer", offer, this.roomId);
  }

  async _sendAnswer() {
    const answer = await this.peerConnection.createAnswer();
    await this.peerConnection.setLocalDescription(answer);
    this.socket.emit("send:answer", answer, this.roomId);
  }

  _executeEvenListereners(event, data) {
    const callbacks = this.eventMap[event];
    callbacks.forEach((callback) => callback(data));
  }

  _sendNegotiationOffer = async () => {
    if (this.isPeerPresent) {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      this.socket.emit("send:negotiation:offer", offer, this.roomId);
    }
  };

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

  async connect() {
    this.peerConnection.addEventListener("icecandidate", (event) => {
      if (event.candidate) {
        this.socket.emit("new:ice:candidate", event.candidate, this.roomId);
      }
    });

    this.socket.on("new:ice:candidate:received", async (iceCandidate) => {
      if (iceCandidate) {
        try {
          await this.peerConnection.addIceCandidate(iceCandidate);
        } catch (e) {
          this.logger("Error adding received ice candidate", e);
        }
      }
    });

    const ls = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    this.localStream = ls;

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });

    this.peerConnection.addEventListener("track", (event) => {
      const [remoteStream] = event.streams;
      this.remoteStream = remoteStream;
      this._executeEvenListereners(EVENTS.RECEIVED_REMOTE_STREAM, {
        remoteStream,
      });
    });

    this.peerConnection.addEventListener("negotiationneeded", (event) => {
      this._sendNegotiationOffer();
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
      this.socket.emit("answer:accepted", this.roomId);
    });

    this.socket.on("connection:made", () => {
      this.isPeerPresent = true;
    });

    this.socket.on("received:offer", async (offer) => {
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      await this._sendAnswer();
    });

    this.socket.on("received:negotiation:offer", async (offer) => {
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      socket.emit("send:negotiation:answer", answer, this.roomId);
    });

    this.socket.on("received:negotiation:answer", async (answer) => {
      const remoteDesc = new RTCSessionDescription(answer);
      await this.peerConnection.setRemoteDescription(remoteDesc);
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
