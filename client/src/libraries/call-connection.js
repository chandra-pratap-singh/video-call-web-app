import { EVENTS } from "../../constants";

class CallConnection {
  eventMap = {
    [EVENTS.SOCKET_ROOM_GENERATED]: [],
    [EVENTS.CONNECTION_STATE_CHANGED]: [],
    [EVENTS.SOCKET_ROOM_JOINED]: [],
    [EVENTS.RECEIVED_REMOTE_STREAM]: [],
    [EVENTS.CONNECTION_TERMINATED]: [],
    [EVENTS.CONNECTION_STEPS_COMPLETED]: [],
    [EVENTS.VIDEO_TRACK_TOGGLED]: [],
    [EVENTS.AUDIO_TRACK_TOGGLED]: [],
    [EVENTS.SCREEN_SHARING_TOGGLED]: [],
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

  _joinRoom(socket, roomId) {
    socket.emit("join:socket:room", roomId);
  }

  _connect() {
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

    this.peerConnection.addEventListener("track", (event) => {
      const [remoteStream] = event.streams;
      this.remoteStream = remoteStream;
      this._executeEvenListereners(EVENTS.RECEIVED_REMOTE_STREAM, {
        remoteStream,
      });
    });

    this.peerConnection.addEventListener("negotiationneeded", () => {
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
      this.socket.emit("answer:accepted", this.roomId);
    });

    this.socket.on("connection:steps:completed", () => {
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
      this.peerConnection.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      this.socket.emit("send:negotiation:answer", answer, this.roomId);
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

    this.socket.on("video:track:toggle", (value) => {
      this._executeEvenListereners(EVENTS.VIDEO_TRACK_TOGGLED, value);
    });

    this.socket.on("audio:track:toggle", (value) => {
      this._executeEvenListereners(EVENTS.AUDIO_TRACK_TOGGLED, value);
    });

    this.socket.on("screen:sharing:toggled", (value) => {
      this._executeEvenListereners(EVENTS.SCREEN_SHARING_TOGGLED, value);
    });
  }

  constructor(peerConnection, socket, logger, roomId) {
    this.peerConnection = peerConnection;
    this.socket = socket;
    this.logger = logger;
    this.roomId = roomId;
    this._registerLogger(peerConnection, socket, logger);
    this._connect();
    this._joinRoom(socket, roomId);
  }

  async _sendOffer() {
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
    await this.peerConnection.setLocalDescription();
    const answer = this.peerConnection.localDescription;
    this.socket.emit("send:answer", answer, this.roomId);
  }

  _executeEvenListereners(event, data) {
    const callbacks = this.eventMap[event];
    callbacks.forEach((callback) => callback(data));
  }

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
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = !!value;
    });
    this.socket.emit("audio:track:toggle", this.roomId, !!value);
  }

  _setVideo(value) {
    this.localStream.getVideoTracks().forEach((track) => {
      track.enabled = !!value;
    });
    this.socket.emit("video:track:toggle", this.roomId, !!value);
  }

  async _shareStream(video = true, audio = true) {
    const ls = await navigator.mediaDevices.getUserMedia({
      video,
      audio,
    });
    this.localStream = ls;

    this.localStream.getTracks().forEach((track) => {
      this.peerConnection.addTrack(track, this.localStream);
    });
  }

  async shareScreen() {
    const ss = await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: "always",
        displaySurface: "monitor",
      },
    });
    if (ss) {
      this.screenStream = ss;
      this.shareScreenSender = [];
      this.screenStream.getTracks().forEach((track) => {
        const sender = this.peerConnection.addTrack(track, this.screenStream);
        this.shareScreenSender.push(sender);
      });
      this.socket.emit("screen:sharing:toggled", this.roomId, true);
    }
  }

  stopSharingScreen() {
    this.screenStream?.getTracks().forEach((track) => {
      track.stop();
    });
    this.socket.emit("screen:sharing:toggled", this.roomId, false);
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
    await this._shareStream(true, true);
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
