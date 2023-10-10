import html from "../libraries/rendering-library";
import { pages } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { getInvitationUrl } from "../utils/utils";

// const BUTTON_BG_COLOR = "#D9D9D9";
// const BORDER_BG_COLOR = "#CCCCCC";

// const PAGE_STYLE = {
//   minHeight: "100vh",
//   width: "100vw",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };

// const CONTAINER_STYLE = {
//   border: `2px solid ${BORDER_BG_COLOR}`,
//   padding: "2%",
//   borderRadius: "4px",
// };

// const PADDED_ITEM_STYLE = {
//   paddingTop: "24px",
//   paddingBottom: "24px",
//   paddingLeft: "16px",
//   paddingRight: "16px",
// };

// const INPUT_WITH_BUTTON_STYLE = {
//   display: "flex",
//   height: "40px",
//   alignItems: "streach",
//   border: `0.5px solid ${BORDER_BG_COLOR}`,
//   borderRadius: "4px",
// };

// const ROOM_INPUT_STYLE = {
//   flex: 1,
//   backgroundColor: "#F3F3F3",
//   border: "0px",
//   fontSize: "1rem",
//   // width: "80%",
//   width: "320px",
//   padding: "6px",
// };

// const JOIN_ROOM_BUTTON_STYLE = {
//   fontSize: "1rem",
//   backgroundColor: BUTTON_BG_COLOR,
//   border: "0px",
//   padding: "8px",
//   cursor: "pointer",
//   borderRadius: "2px",
// };

// const OR_STYLE = {
//   textAlign: "center",
//   fontSize: "1.2rem",
//   padding: "16px",
// };

// const START_NEW_MEETING_BUTTON_STYLE = {
//   fontSize: "1rem",
//   backgroundColor: "#3A7DFF",
//   color: "white",
//   border: "0px",
//   padding: "8px",
//   cursor: "pointer",
//   height: "40px",
//   width: "100%",
//   borderRadius: "6px",
// };

export const Home = ({
  roomId,
  setRoomId,
  redirectToPage,
  setInvitationUrl,
}) => {
  const handleRoomIdChange = (e) => {
    e.preventDefault;
    const { value } = e.target;
    setRoomId(value);
  };

  const startNewCall = () => {
    const newRoomId = uuidv4();
    const invitationUrl = getInvitationUrl(newRoomId);
    setInvitationUrl(invitationUrl);
    setRoomId(newRoomId);
    redirectToPage(pages.invitation.pageId);
  };

  const joinRoom = () => {
    const invitationUrl = getInvitationUrl(roomId);
    location.assign(invitationUrl);
  };

  return html`<div class="d-flex full-page-container flex-centered">
    <div class="border-l-gray border-radius-s p-xxl w-25">
      <div class="p-xl">
        <div
          class="d-flex flex-align-items-stretch border-xs-gray border-radius-s w-100"
        >
          <input
            value=${roomId}
            onInput=${handleRoomIdChange}
            class="border-0 flex-1"
            placeholder="Enter room Id"
          />
          <button class="border-0" onclick="${joinRoom}">Join Room</button>
        </div>
      </div>
      <div class="title">OR</div>
      <div class="p-xl">
        <button
          onclick=${startNewCall}
          class="button button-primary w-100 border-radius-s"
        >
          Start New Meeting
        </button>
      </div>
    </div>
  </div>`;
};
