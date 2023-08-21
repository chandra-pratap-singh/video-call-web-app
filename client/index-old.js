import { io } from "socket.io-client";
const socket = io();
const originalEmit = socket.emit;
socket.emit = function (event, ...args) {
  console.log(`Outgoing event: ${event} `, ...args);
  originalEmit.apply(socket, [event, ...args]);
};
socket.onAny((event, ...args) => {
  console.log(`sockets event: ${event} `, ...args);
});

let isPeerPresent = false;

const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
const peerConnection = new RTCPeerConnection(configuration);

const getRoomId = () => {
  const queryString = window.location.search;
  const queryParams = new URLSearchParams(queryString);
  return queryParams.get("roomId");
};
const roomId = getRoomId();

const containerElement = document.getElementById("container");
const startCallButton = document.getElementById("start-call-button");
const statusElement = document.getElementById("status");
const localVideoPlayer = document.getElementById("local-video-player");
const remoteVideoPlayer = document.getElementById("remote-video-player");
let ls;
const startVideo = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true,
  });
  localStream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, localStream);
  });
  ls = localStream;
  localVideoPlayer.srcObject = localStream;
};

let hostRoomId;

const copyInvitationUrl = (url) => {
  navigator.clipboard.writeText(url);
};

const updateStatus = (status) => {
  statusElement.innerText = status;
};

const startNewCall = () => {
  socket.emit("generate:socket:room");
};

const sendOffer = async () => {
  console.log("isPeerPresent ", isPeerPresent);
  if (!isPeerPresent) return;
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("send:offer", offer, hostRoomId || roomId);
};

const sendAnswer = async () => {
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("send:answer", answer, roomId || hostRoomId);
};

socket.on("connected", () => {
  updateStatus("connected");
});

socket.on("socket:room:generated", async (roomId) => {
  hostRoomId = roomId;
  const currentUrl = window.location.href;
  const invitationUrl = `${currentUrl}?roomId=${roomId}`;

  containerElement.innerHTML = `
  <div> Invitation Url: <span>${invitationUrl}</span>
  </div>
  `;
  updateStatus("Waiting for Other user");
  startVideo();
});

socket.on("new:user:joined", async () => {
  isPeerPresent = true;
  updateStatus("New User Joined the room");
  await sendOffer();
});

socket.on("received:answer", async (answer) => {
  const remoteDesc = new RTCSessionDescription(answer);
  await peerConnection.setRemoteDescription(remoteDesc);
  updateStatus("Users connected");
});

socket.on("socket:room:joined", () => {
  updateStatus("Joined Room");
  // startVideo();
});

socket.on("received:offer", async (offer) => {
  isPeerPresent = true;
  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  await sendAnswer();
  startVideo();
});

const sendNegotiationOffer = async () => {
  if (!isPeerPresent) return;
  const offer = await peerConnection.createOffer();
  await peerConnection.setLocalDescription(offer);
  socket.emit("send:negotiation:offer", offer, hostRoomId || roomId);
};

socket.on("received:negotiation:offer", async (offer) => {
  peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  const answer = await peerConnection.createAnswer();
  await peerConnection.setLocalDescription(answer);
  socket.emit("send:negotiation:answer", answer, roomId || hostRoomId);
});

socket.on("received:negotiation:answer", async (answer) => {
  const remoteDesc = new RTCSessionDescription(answer);
  await peerConnection.setRemoteDescription(remoteDesc);
});

startCallButton.addEventListener("click", startNewCall);

// Define a function to check the connection status
function checkConnectionStatus() {
  const connectionState = peerConnection.connectionState;
  console.log("Connection status:", connectionState);
  // You can take further actions based on the connectionState
}

peerConnection.addEventListener("connectionstatechange", () => {
  checkConnectionStatus();
  console.log("Peer connection: ", peerConnection.connectionState);
  updateStatus(peerConnection.connectionState);
});

peerConnection.addEventListener("negotiationneeded", async (event) => {
  console.log("negotiationneeded");
  await sendNegotiationOffer();
});

peerConnection.addEventListener("track", (event) => {
  const [remoteStream] = event.streams;
  console.log("remote stream ", remoteStream);
  remoteVideoPlayer.srcObject = remoteStream;
});

remoteVideoPlayer.addEventListener("error", (event) => {
  console.error("Error occurred in video element:", event.target.error);
});

if (roomId) {
  socket.emit("join:socket:room", roomId);
}

/**
 * getLocalStream
 * getRemoteStream
 * joinRoom
 * generateRoom
 * connectionStatus
 * endCall
 * onNewUserJoin
 */
