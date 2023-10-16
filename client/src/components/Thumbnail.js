import { CONNECTION_STATES } from "../constants";
import html from "../libraries/rendering-library";

export const Thumbnail = ({ status }) => {
  return html`<div class="d-flex flex-align-items-center h-100">
    <div class="text-center text-white">
      ${CONNECTION_STATES[status].displayMessage}
    </div>
  </div>`;
};
