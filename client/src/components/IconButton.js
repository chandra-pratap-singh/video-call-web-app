import html from "../libraries/rendering-library";

export const IconButton = ({ icon, onclick }) => {
  return html`
    <button class="button-icon" onclick=${onclick}><${icon} /></button>
  `;
};
