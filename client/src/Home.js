import html from "../rendering-library";
import { useEffect } from "preact/hooks";
import { pages } from "./constants";
import { EVENTS } from "../constants";

const BUTTON_BG_COLOR = "#D9D9D9";
const BORDER_BG_COLOR = "#CCCCCC";

const PAGE_STYLE = {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const CONTAINER_STYLE = {
  border: `2px solid ${BORDER_BG_COLOR}`,
  padding: "32px",
  borderRadius: "4px",
};

const PADDED_ITEM_STYLE = {
  paddingTop: "24px",
  paddingBottom: "24px",
  paddingLeft: "16px",
  paddingRight: "16px",
};

const INPUT_WITH_BUTTON_STYLE = {
  display: "flex",
  height: "40px",
  alignItems: "streach",
  border: `0.5px solid ${BORDER_BG_COLOR}`,
  borderRadius: "4px",
};

const ROOM_INPUT_STYLE = {
  flex: 1,
  backgroundColor: "#F3F3F3",
  border: "0px",
  fontSize: "1rem",
  width: "320px",
  padding: "6px",
};

const JOIN_ROOM_BUTTON_STYLE = {
  fontSize: "1rem",
  backgroundColor: BUTTON_BG_COLOR,
  border: "0px",
  padding: "8px",
  cursor: "pointer",
  borderRadius: "2px",
};

const OR_STYLE = {
  textAlign: "center",
  fontSize: "1.2rem",
  padding: "16px",
};

const START_NEW_MEETING_BUTTON_STYLE = {
  fontSize: "1rem",
  backgroundColor: "#3A7DFF",
  color: "white",
  border: "0px",
  padding: "8px",
  cursor: "pointer",
  height: "40px",
  width: "100%",
  borderRadius: "6px",
};

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

  return html`<div style=${PAGE_STYLE}>
    <div style=${CONTAINER_STYLE}>
      <div style=${PADDED_ITEM_STYLE}>
        <div style=${INPUT_WITH_BUTTON_STYLE}>
          <input
            value=${roomId}
            onInput=${handleRoomIdChange}
            style=${ROOM_INPUT_STYLE}
            placeholder="Enter room Id"
          />
          <button style=${JOIN_ROOM_BUTTON_STYLE}>Join Room</button>
        </div>
      </div>
      <div style=${{ ...OR_STYLE }}>OR</div>
      <div style=${PADDED_ITEM_STYLE}>
        <button onclick=${startNewCall} style=${START_NEW_MEETING_BUTTON_STYLE}>
          Start New Meeting
        </button>
      </div>
    </div>
  </div>`;
};
