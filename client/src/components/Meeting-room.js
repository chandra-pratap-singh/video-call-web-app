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

const MeetingRoom = ({ roomId, redirectToPage }) => {
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

  const cleanUpAfterStopSharingScreen = useCallback(async () => {
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
  });

  const handleToggleShareScreen = useCallback(async () => {
    if (isSharingScreen) {
      await callConnection.stopSharingScreen();
      await cleanUpAfterStopSharingScreen();
    } else {
      await callConnection.shareScreen();
      setIsSharingScreen(true);
    }
  }, [cleanUpAfterStopSharingScreen]);

  useEffect(() => {
    if (callConnection) {
      function handleStopScreenSharingCleanup() {
        cleanUpAfterStopSharingScreen();
      }
      callConnection.on(
        EVENTS.SCREEN_SHARING_INACTIVE,
        handleStopScreenSharingCleanup
      );
      return () => {
        callConnection.off(
          EVENTS.SCREEN_SHARING_INACTIVE,
          handleStopScreenSharingCleanup
        );
      };
    }
  }, [cleanUpAfterStopSharingScreen]);

  const handleEndCall = () => {
    callConnection.endCall();
    location.assign("/");
  };

  const remoteVideoPlayer = useMemo(() => {
    return connectionStatus === CONNECTION_STATES.connected.key
      ? (isRemoteVideoTrackAvailable || isRemoteScreenTrackAvailable) &&
          html`<video
            ref=${remoteVideoRef}
            id="remote-video-player"
            autoplay
            srcObject=${remoteStream}
            controls=${false}
            class="h-100 max-w-100"
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
      ? html`<div
          class="position-absolute position-bottom-right h-25 max-w-100"
        >
          <video
            ref=${localVideoRef}
            id="local-video-player"
            autoplay
            muted
            controls=${false}
            srcObject=${localStream}
            class="h-100 border-radius-l border-l-white"
          ></video>
        </div>`
      : null;
  });

  const overlay = useMemo(() => {
    if (connectionStatus === CONNECTION_STATES.connected.key) {
      return html`<div
        class="position-absolute position-full-screen h-100 d-flex flex-centered"
      >
        ${!isRemoteAudioTrackAvailable ? html` <${MicMute} />` : null}
        ${!isRemoteVideoTrackAvailable ? html` <${VideoMute} />` : null}
      </div>`;
    }
  });

  return html`<div
    class="full-page-container h-100 d-flex flex-direction-column background-dark"
  >
    <div class="position-relative flex-1 ">
      ${overlay}
      <div class="d-flex flex-centered  max-w-100 remote-video-container h-100">
        ${remoteVideoPlayer}
      </div>
      ${localVideoPlayer}
    </div>
    <div class="background-gray d-flex flex-centered p-l bottom-bar">
      <div class="d-flex flex-justify-content-space-between w-50 m-w-100">
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

export default MeetingRoom;
