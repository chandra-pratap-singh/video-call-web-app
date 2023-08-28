import html from "../rendering-library";
import { useRef, useEffect } from "preact/hooks";
import { EVENTS } from "../constants";

const PAGE_STYLE = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: "0px",
  margin: "0px",
};

const VIDEO_CONTAINER_STYLE = {
  flex: "1",
  position: "relative",
};

const BOTTOM_BAR_STYLE = {
  backgroundColor: "#3C3C3C",
  height: "10vh",
};

const REMOTE_VIDEO_STYLE = {
  left: "0px",
  right: "0px",
  top: "0px",
  bottom: "0px",
  position: "absolute",
};

const LOCAL_VIDEO_STYLE = {
  position: "absolute",
  right: "0px",
  bottom: "0px",
};

export const MeetingRoom = ({ roomId, callConnection }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  useEffect(() => {
    function displayRemoteVideo() {
      const remoteStream = callConnection.getRemoteStream();
      remoteVideoRef.current.srcObject = remoteStream;
    }
    callConnection.on(EVENTS.RECEIVED_REMOTE_STREAM, displayRemoteVideo);
    return () => {
      callConnection.off(EVENTS.RECEIVED_REMOTE_STREAM, displayRemoteVideo);
    };
  }, []);

  useEffect(() => {
    function displayLocalVideo() {
      const localStream = callConnection.getLocalStream();
      localVideoRef.current.srcObject = localStream;
    }
    displayLocalVideo();
  }, []);

  return html`<div style=${PAGE_STYLE}>
    <div style=${VIDEO_CONTAINER_STYLE}>
      <video
        ref=${remoteVideoRef}
        width="100%"
        height="100%"
        id="remote-video-player"
        autoplay
        style=${REMOTE_VIDEO_STYLE}
      ></video>
      <video
        ref=${localVideoRef}
        width="25%"
        height="25%"
        id="local-video-player"
        autoplay
        muted
        style=${LOCAL_VIDEO_STYLE}
      ></video>
    </div>
    <div style=${BOTTOM_BAR_STYLE}></div>
  </div>`;
};
