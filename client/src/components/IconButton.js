import html from "../libraries/rendering-library";

const ICON_BUTTON_STYLE = {
  border: "0px",
  cursor: "pointer",
  backgroundColor: "transparent",
  padding: "8px",
  transition: "background-color 0.3s ease-in-out", // Add a smooth transition
  ":hover": {
    backgroundColor: "darkblue", // Change background color on hover
  },
};

export const IconButton = ({ icon, onclick }) => {
  return html`
    <button style=${ICON_BUTTON_STYLE} onclick=${onclick}><${icon} /></button>
  `;
};
