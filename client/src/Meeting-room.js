import html from "../rendering-library";
import { useRef, useEffect, useState } from "preact/hooks";
import { EVENTS } from "../constants";
import { IconButton } from "./IconButton";
import { AddParticipants } from "./icons/add_participants";
import { Mic } from "./icons/mic";
import { Video } from "./icons/video";
import { CallEnd } from "./icons/call_end";
import { MicMute } from "./icons/mic_mute";
import { VideoMute } from "./icons/video_mute";
import e from "cors";

const PAGE_STYLE = {
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  padding: "0px",
  margin: "0px",
  backgroundColor: "#333333",
};

const VIDEO_CONTAINER_STYLE = {
  flex: "1",
  position: "relative",
};

const BOTTOM_BAR_STYLE = {
  backgroundColor: "#3C3C3C",
  height: "8vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const ACTIONS_STYLE = {
  display: "flex",
  gap: "64px",
};

const REMOTE_VIDEO_CONTAINER_STYLE = {
  display: "flex",
  justifyContent: "center",
  height: "100%",
};

const LOCAL_VIDEO_STYLE = {
  position: "absolute",
  right: "16px",
  bottom: "16px",
  border: "2px solid white",
  borderRadius: "8px",
};

export const MeetingRoom = ({ roomId, callConnection }) => {
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

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

  const toggleAudioMute = () => {
    if (isAudioMuted) {
      callConnection.unMuteAudio();
      setIsAudioMuted(false);
    } else {
      callConnection.muteAudio();
      setIsAudioMuted(true);
    }
  };
  const toggleVideoMute = () => {
    if (isVideoMuted) {
      callConnection.unMuteVideo();
      setIsVideoMuted(false);
    } else {
      callConnection.muteVideo();
      setIsVideoMuted(true);
    }
  };

  const handleAddParticipant = () => {};

  const handleEndCall = () => {
    callConnection.endCall();
  };

  return html`<div style=${PAGE_STYLE}>
    <div style=${VIDEO_CONTAINER_STYLE}>
      <div style=${REMOTE_VIDEO_CONTAINER_STYLE}>
        <video
          ref=${remoteVideoRef}
          height="100%"
          id="remote-video-player"
          autoplay
        ></video>
      </div>
      <video
        ref=${localVideoRef}
        height="25%"
        id="local-video-player"
        autoplay
        muted
        style=${LOCAL_VIDEO_STYLE}
      ></video>
    </div>
    <div style=${BOTTOM_BAR_STYLE}>
      <div style=${ACTIONS_STYLE}>
        <${IconButton}
          icon=${AddParticipants}
          onclick=${handleAddParticipant}
        />
        <${IconButton}
          icon=${isAudioMuted ? MicMute : Mic}
          onclick=${toggleAudioMute}
        />
        <${IconButton}
          icon=${isVideoMuted ? VideoMute : Video}
          onclick=${toggleVideoMute}
        />
        <${IconButton} icon=${CallEnd} onclick=${handleEndCall} />
      </div>
    </div>
  </div>`;
};
