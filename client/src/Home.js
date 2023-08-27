import html from "../rendering-library";
import { useEffect } from "preact/hooks";
import { pages } from "./constants";
import { EVENTS } from "../constants";

export const Home = ({
  roomId,
  setRoomId,
  callConnection,
  redirectToPage,
  setInvitationUrl,
}) => {
  const handleRoomIdChange = (e) => {
    e.preventDefault;
    const { value } = e.target;
    setRoomId(value);
  };

  const startNewCall = () => {
    callConnection.generateRoom();
  };

  useEffect(() => {
    function handleRoomGenerated() {
      const invitationUrl = callConnection.getInvitationUrl();
      const generatedRoomId = callConnection.getRoomId();
      setInvitationUrl(invitationUrl);
      setRoomId(generatedRoomId);
      redirectToPage(pages.invitation.pageId);
    }
    callConnection.on(EVENTS.SOCKET_ROOM_GENERATED, handleRoomGenerated);
    return () => {
      callConnection.off(EVENTS.SOCKET_ROOM_GENERATED, handleRoomGenerated);
    };
  }, []);

  return html`<div>
    <div>
      <input value=${roomId} onInput=${handleRoomIdChange} />
      <button>Join Room</button>
    </div>
    OR
    <div>
      <button onclick=${startNewCall}>Start New Meeting</button>
    </div>
  </div>`;
};
