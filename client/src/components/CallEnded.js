import html from "../libraries/rendering-library";

export const CallEnded = () => {
  const redirectToHomePage = () => {
    location.assign("/");
  };
  return html`<div>
    <div>Call Ended!</div>
    <button onclick="${redirectToHomePage}">Home Page</button>
  </div>`;
};
