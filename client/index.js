import { io } from "socket.io-client";
import CallConnection from "./call-connection";
import { EVENTS } from "./constants";

import { render } from "preact";
import html from "./rendering-library";
import { App } from "./src/App";

const socket = io();
const configuration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};
const peerConnection = new RTCPeerConnection(configuration);
peerConnection.addEventListener("connectionstatechange", (event) => {
  console.log("Connection state changed to:", peerConnection.connectionState);
});
function logger(...args) {
  console.log(...args);
}
const callConnection = new CallConnection(peerConnection, socket, logger);
await callConnection.connect();

render(
  html`<${App} callConnection=${callConnection} />`,
  document.getElementById("root")
);
