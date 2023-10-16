import html from "../libraries/rendering-library";

export const CallEnded = () => {
  const redirectToHomePage = () => {
    location.assign("/");
  };
  return html`<div class="d-flex full-page-container flex-centered">
    <div>
      <p class="text-center">Call Ended!</p>
      <button onclick="${redirectToHomePage}">Go to Home Page</button>
    </div>
  </div>`;
};
