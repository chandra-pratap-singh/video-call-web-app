import { io } from "socket.io-client";
import CallConnection from "./call-connection";
import { EVENTS } from "./constants";
const socket = io();
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
const peerConnection = new RTCPeerConnection(configuration);
function logger(...args) {
  console.log(...args);
}
const callConnection = new CallConnection(peerConnection, socket, logger);
await callConnection.connect();

const startCall = () => {
  callConnection.generateRoom();
};

const displayInvitation = (invitationUrl) => {
  const containerElement = document.getElementById("container");
  containerElement.innerHTML = `
  <div> Invitation Url: <span>${invitationUrl}</span>
  </div>
  `;
};

const displayRemoteVideo = () => {
  const remoteStream = callConnection.getRemoteStream();
  const remoteVideoPlayer = document.getElementById("remote-video-player");
  remoteVideoPlayer.srcObject = remoteStream;
};

const displayLocalVideo = () => {
  const localVideoPlayer = document.getElementById("local-video-player");
  const localStream = callConnection.getLocalStream();
  localVideoPlayer.srcObject = localStream;
};

callConnection.on(EVENTS.SOCKET_ROOM_GENERATED, () => {
  const invitationUrl = callConnection.getInvitationUrl();
  displayInvitation(invitationUrl);
  displayLocalVideo();
});

callConnection.on(EVENTS.RECEIVED_REMOTE_STREAM, () => {
  displayRemoteVideo();
});

callConnection.on(EVENTS.SOCKET_ROOM_JOINED, () => {
  displayLocalVideo();
});

const startCallButton = document.getElementById("start-call-button");
startCallButton.addEventListener("click", startCall);

const getRoomId = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  return queryParams.get("roomId");
};
const roomId = getRoomId();
if (roomId) {
  callConnection.joinRoom(roomId);
}

const remoteVideoPlayer = document.getElementById("remote-video-player");
remoteVideoPlayer.addEventListener("error", (event) => {
  console.error("Error occurred in video element:", event.target.error);
});

const endcall = () => {
  callConnection.endCall();
};
const endCallButton = document.getElementById("end-call-button");
endCallButton.addEventListener("click", endcall);

// Audio
let isAudioMuted = false;
const muteAudioButton = document.getElementById("mute-audio-button");
const toggleAudioMute = () => {
  if (isAudioMuted) {
    callConnection.unMuteAudio();
    isAudioMuted = false;
    muteAudioButton.innerText = "Mute Audio";
  } else {
    callConnection.muteAudio();
    isAudioMuted = true;
    muteAudioButton.innerText = "Unmute Audio";
  }
};
muteAudioButton.addEventListener("click", toggleAudioMute);

// Video
let isVideoMuted = false;
const muteVideoButton = document.getElementById("mute-video-button");
const toggleVideoMute = () => {
  if (isVideoMuted) {
    callConnection.unMuteVideo();
    isVideoMuted = false;
    muteVideoButton.innerText = "Mute Video";
  } else {
    callConnection.muteVideo();
    isVideoMuted = true;
    muteVideoButton.innerText = "Unmute Video";
  }
};
muteVideoButton.addEventListener("click", toggleVideoMute);
