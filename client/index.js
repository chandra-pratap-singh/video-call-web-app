import { render } from "preact";
import html from "./src/libraries/rendering-library";
import { App } from "./src/App";

render(html`<${App} />`, document.getElementById("root"));
