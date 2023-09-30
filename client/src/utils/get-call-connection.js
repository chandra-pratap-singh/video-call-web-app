import { io } from "socket.io-client";
import CallConnection from "../libraries/call-connection";

export const getCallConnection = (roomId) => {
  const socket = io();
  const configuration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peerConnection = new RTCPeerConnection(configuration);
  function logger(...args) {
    console.log(...args);
  }
  const callConnection = new CallConnection(
    peerConnection,
    socket,
    logger,
    roomId
  );
  return callConnection;
};
