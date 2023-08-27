import html from "../rendering-library";
import { useState, useRef, useEffect } from "preact/hooks";
import { EVENTS } from "../constants";

export const MeetingRoom = ({ roomId, callConnection }) => {
  //   const [localStream, setLocalStream] = useState();
  //   const [remoteStream, setRemoteStream] = useState();
  const localVideoRef = useRef();
  const remoteVideoRef = useRef();

  //   callConnection.on(EVENTS.SOCKET_ROOM_GENERATED, () => {
  //     const invitationUrl = callConnection.getInvitationUrl();
  //     displayInvitation(invitationUrl);
  //     displayLocalVideo();
  //   });

  //   callConnection.on(EVENTS.RECEIVED_REMOTE_STREAM, () => {
  //     displayRemoteVideo();
  //   });

  //   callConnection.on(EVENTS.SOCKET_ROOM_JOINED, () => {
  //     displayLocalVideo();
  //   });

  useEffect(() => {
    function displayRemoteVideo() {
      console.log("Receiving remote stream");
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

  return html`<div>
    Meeting room: ${roomId}
    <div>
      <div style="display: flex">
        <div>
          1
          <video
            ref=${localVideoRef}
            id="local-video-player"
            width="320"
            height="240"
            autoplay
            muted
          ></video>
        </div>
        <div>
          2
          <video
            ref=${remoteVideoRef}
            id="remote-video-player"
            width="320"
            height="240"
            autoplay
          ></video>
        </div>
      </div>
    </div>
  </div>`;
};
