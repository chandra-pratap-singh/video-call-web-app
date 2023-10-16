import { CopyIcon } from "../icons/copy";
import html from "../libraries/rendering-library";

export const Invitation = ({ invitationUrl, roomId }) => {
  const startCall = () => {
    location.assign(invitationUrl);
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
  return html`<div class="d-flex full-page-container flex-centered">
    <div>
      <h4 class="title text-center">Share your call invite</h4>
      <p class="text-light text-center">
        Share the invitation link or room ID with the individuals you wish to
        connect with.
      </p>
      <div
        class="info-box d-flex flex-justify-content-space-between flex-align-items-center flex-gap-xl"
      >
        <div>
          <div class="text-label">Invitation Link</div>
          <div>${invitationUrl}</div>
        </div>
        <div>
          <button onclick=${copyInvitationUrl} class="border-0">
            <${CopyIcon} />
          </button>
        </div>
      </div>
      <div
        class="info-box d-flex flex-justify-content-space-between flex-align-items-center flex-gap-xl"
      >
        <div>
          <div class="text-label">Room Id</div>
          <div>${roomId}</div>
        </div>
        <div>
          <button onclick=${copyRoomId} class="border-0">
            <${CopyIcon} />
          </button>
        </div>
      </div>
      <div class="text-center">
        <button onclick=${startCall} class="button-primary">Start Call</button>
      </div>
    </div>
  </div>`;
};
