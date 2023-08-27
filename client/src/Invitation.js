import html from "../rendering-library";
import { pages } from "./constants";

export const Invitation = ({ invitationUrl, redirectToPage }) => {
  const startCall = () => {
    console.log("start call clicked");
    redirectToPage(pages.meetingRoom.pageId);
  };
  return html`<div>
    <div>Invitation Url: ${invitationUrl}</div>
    <button onclick=${startCall}>Start Call</button>
  </div>`;
};
