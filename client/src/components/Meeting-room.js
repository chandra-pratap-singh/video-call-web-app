import html from "../libraries/rendering-library";
import {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "preact/hooks";
import { EVENTS } from "../../constants";
import { IconButton } from "./IconButton";
import { Mic } from "../icons/mic";
import { Video } from "../icons/video";
import { CallEnd } from "../icons/call_end";
import { MicMute } from "../icons/mic_mute";
import { VideoMute } from "../icons/video_mute";
import { getCallConnection } from "../utils/get-call-connection";
import { CONNECTION_STATES, pages } from "../constants";
import { Thumbnail } from "./Thumbnail";
import { ShareScreenIcon } from "../icons/share_screen";
import { ShareScreenMuteIcon } from "../icons/share_screen_mute";

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

const LOCAL_VIDEO_CONTAINER_STYLE = {
  position: "absolute",
  right: "16px",
  bottom: "16px",
  border: "2px solid white",
  borderRadius: "8px",
  height: "25%",
};

const THUMBNAIL_OVERLAY_CONTAINER_STYLE = {
  position: "absolute",
  right: "0px",
  left: "0px",
  top: "0px",
  bottom: "0px",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const LOCAL_VIDEO_STYLE = {
  height: "100%",
  width: "100%",
};

export const MeetingRoom = ({ roomId, redirectToPage }) => {
  const callConnection = useMemo(() => {
    if (roomId) return getCallConnection(roomId);
  }, [roomId]);
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(
    CONNECTION_STATES.new.key
  );

  const [isRemoteVideoTrackAvailable, setIsRemoteVideoTrackAvailable] =
    useState(true);
  const [isRemoteAudioTrackAvailable, setIsRemoteAudioTrackAvailable] =
    useState(true);
  const [isRemoteScreenTrackAvailable, setIsRemoteScreenTrackAvailable] =
    useState(false);

  const [remoteStream, setRemoteStream] = useState();
  const [localStream, setLocalStream] = useState();
  const [isSharingScreen, setIsSharingScreen] = useState(false);

  const startLocalVideo = () => {
    const localStream = callConnection.getLocalStream();
    setLocalStream(localStream);
  };

  useEffect(() => {
    if (callConnection) {
      function displayRemoteVideo() {
        const remoteStream = callConnection.getRemoteStream();
        setRemoteStream(remoteStream);
      }
      callConnection.on(EVENTS.RECEIVED_REMOTE_STREAM, displayRemoteVideo);
      return () => {
        callConnection.off(EVENTS.RECEIVED_REMOTE_STREAM, displayRemoteVideo);
      };
    }
  }, []);

  useEffect(async () => {
    if (callConnection) {
      try {
        await callConnection.startVideo();
        startLocalVideo();
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  }, []);

  useEffect(() => {
    if (callConnection) {
      function handleCallEnded() {
        redirectToPage(pages.callEnded.pageId);
      }
      callConnection.on(EVENTS.CONNECTION_TERMINATED, handleCallEnded);
      return () => {
        callConnection.off(EVENTS.CONNECTION_TERMINATED, handleCallEnded);
      };
    }
  }, []);

  useEffect(() => {
    if (callConnection) {
      function handleConnectionStateChange({ peerConnection: state }) {
        setConnectionStatus(state);
      }
      callConnection.on(
        EVENTS.CONNECTION_STATE_CHANGED,
        handleConnectionStateChange
      );
      return () => {
        callConnection.off(
          EVENTS.CONNECTION_STATE_CHANGED,
          handleConnectionStateChange
        );
      };
    }
  }, []);

  useEffect(() => {
    if (callConnection) {
      function handleVideoTrackToggle(value) {
        setIsRemoteVideoTrackAvailable(value);
      }
      callConnection.on(EVENTS.VIDEO_TRACK_TOGGLED, handleVideoTrackToggle);
      return () => {
        callConnection.off(EVENTS.VIDEO_TRACK_TOGGLED, handleVideoTrackToggle);
      };
    }
  }, []);

  useEffect(() => {
    if (callConnection) {
      function handleAudioTrackToggle(value) {
        setIsRemoteAudioTrackAvailable(value);
      }
      callConnection.on(EVENTS.AUDIO_TRACK_TOGGLED, handleAudioTrackToggle);
      return () => {
        callConnection.off(EVENTS.AUDIO_TRACK_TOGGLED, handleAudioTrackToggle);
      };
    }
  }, []);

  useEffect(() => {
    if (callConnection) {
      function handleScreenTrackToggle(value) {
        setIsRemoteScreenTrackAvailable(value);
      }
      callConnection.on(EVENTS.SCREEN_SHARING_TOGGLED, handleScreenTrackToggle);
      return () => {
        callConnection.off(
          EVENTS.SCREEN_SHARING_TOGGLED,
          handleScreenTrackToggle
        );
      };
    }
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

  const handleToggleShareScreen = useCallback(async () => {
    if (isSharingScreen) {
      callConnection.stopSharingScreen();
      setIsSharingScreen(false);
      await callConnection.startVideo();
      startLocalVideo();
      if (isVideoMuted) {
        callConnection.muteVideo();
        setIsVideoMuted(true);
      }
      if (isAudioMuted) {
        callConnection.muteAudio();
        setIsAudioMuted(true);
      }
    } else {
      callConnection.shareScreen();
      setIsSharingScreen(true);
    }
  });

  const handleEndCall = () => {
    callConnection.endCall();
    location.assign("/");
  };

  const remoteVideoPlayer = useMemo(() => {
    return connectionStatus === CONNECTION_STATES.connected.key
      ? (isRemoteVideoTrackAvailable || isRemoteScreenTrackAvailable) &&
          html`<video
            ref=${remoteVideoRef}
            height="100%"
            id="remote-video-player"
            autoplay
            srcObject=${remoteStream}
            controls=${false}
          ></video>`
      : html`<${Thumbnail} status=${connectionStatus} />`;
  }, [
    connectionStatus,
    isRemoteVideoTrackAvailable,
    remoteVideoRef,
    remoteStream,
    isRemoteScreenTrackAvailable,
  ]);

  const localVideoPlayer = useMemo(() => {
    return !isVideoMuted && !isSharingScreen
      ? html`<div style=${LOCAL_VIDEO_CONTAINER_STYLE}>
          <video
            ref=${localVideoRef}
            id="local-video-player"
            autoplay
            muted
            style=${LOCAL_VIDEO_STYLE}
            controls=${false}
            srcObject=${localStream}
          ></video>
        </div>`
      : null;
  });

  const overlay = useMemo(() => {
    if (connectionStatus === CONNECTION_STATES.connected.key) {
      return html`<div style=${THUMBNAIL_OVERLAY_CONTAINER_STYLE}>
        ${!isRemoteAudioTrackAvailable ? html` <${MicMute} />` : null}
        ${!isRemoteVideoTrackAvailable ? html` <${VideoMute} />` : null}
      </div>`;
    }
  });

  return html`<div style=${PAGE_STYLE}>
    <div style=${VIDEO_CONTAINER_STYLE}>
      ${overlay}
      <div style=${REMOTE_VIDEO_CONTAINER_STYLE}>${remoteVideoPlayer}</div>
      ${localVideoPlayer}
    </div>
    <div style=${BOTTOM_BAR_STYLE}>
      <div style=${ACTIONS_STYLE}>
        <${IconButton}
          icon=${isSharingScreen ? ShareScreenIcon : ShareScreenMuteIcon}
          onclick=${handleToggleShareScreen}
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
