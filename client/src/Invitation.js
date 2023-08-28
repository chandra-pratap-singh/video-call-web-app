import { CopyIcon } from "../icons/mingcute_copy-line";
import html from "../rendering-library";
import { pages } from "./constants";

const PAGE_STYLE = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
};

const CONTAINER_STYLE = {
  //   width: "100%",
};

const TITLE_STYLE = {
  fontSize: "1.5rem",
  color: "#333333",
};

const DESC_STYLE = {
  color: "#666666",
};

const COPY_CONTAINER_STYLE = {
  backgroundColor: "F3F3F3",
  padding: "16px",
  margin: "16px",
  textAlign: "left",
  color: "#404040",
};

const COPY_CODE_STYLE = {
  display: "flex",
  gap: "32px",
  justifyContent: "space-between",
  //   width: "100%",
  //   border: "1px solid red",
};

const START_NOW_BUTTON_STYLE = {
  fontSize: "1rem",
  backgroundColor: "#3A7DFF",
  color: "white",
  border: "0px",
  padding: "8px",
  cursor: "pointer",
  height: "40px",
  borderRadius: "6px",
};

const LABEL_STYLE = {
  fontSize: "0.8rem",
  color: "#595959",
};

const ICON_BUTTON_STYLE = {
  border: "0px",
  cursor: "pointer",
};

export const Invitation = ({ invitationUrl, roomId, redirectToPage }) => {
  const startCall = () => {
    redirectToPage(pages.meetingRoom.pageId);
  };
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };
  const copyInvitationUrl = () => {
    copyToClipboard(invitationUrl);
  };

  const copyRoomId = () => {
    copyToClipboard(roomId);
  };
  return html`<div style=${PAGE_STYLE}>
    <div style=${CONTAINER_STYLE}>
      <h4 style=${TITLE_STYLE}>Share your call invite</h4>
      <p style=${DESC_STYLE}>
        Share the invitation link or room ID with the individuals you wish to
        connect with.
      </p>
      <div style=${COPY_CONTAINER_STYLE}>
        <div style=${LABEL_STYLE}>Invitation Link</div>
        <div style=${COPY_CODE_STYLE}>
          ${invitationUrl}
          <button style=${ICON_BUTTON_STYLE} onclick=${copyInvitationUrl}>
            <${CopyIcon} />
          </button>
        </div>
      </div>
      <div style=${COPY_CONTAINER_STYLE}>
        <div style=${LABEL_STYLE}>Room Id</div>
        <div style=${COPY_CODE_STYLE}>
          ${roomId}
          <button style=${ICON_BUTTON_STYLE} onclick=${copyRoomId}>
            <${CopyIcon} />
          </button>
        </div>
      </div>
      <div>
        <button onclick=${startCall} style=${START_NOW_BUTTON_STYLE}>
          Start Call
        </button>
      </div>
    </div>
  </div>`;
};
