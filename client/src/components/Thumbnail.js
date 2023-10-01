import { CONNECTION_STATES } from "../constants";
import html from "../libraries/rendering-library";

export const Thumbnail = ({ status }) => {
  return html`<div
    style=${{
      height: "100%",
      display: "flex",
      alignItems: "center",
    }}
  >
    <div style=${{ textAlign: "center", color: "white" }}>
      ${CONNECTION_STATES[status].displayMessage}
    </div>
  </div>`;
};
