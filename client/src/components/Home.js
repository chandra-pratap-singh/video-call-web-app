import html from "../libraries/rendering-library";
import { pages } from "../constants";
import { v4 as uuidv4 } from "uuid";
import { getInvitationUrl } from "../utils/utils";

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
    <div class="border-l-gray border-radius-s p-xxl w-25 m-w-100 m-m-l m-p-l">
      <div class="p-xl m-p-s">
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
      <div class="title text-center">OR</div>
      <div class="p-xl m-p-s">
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
