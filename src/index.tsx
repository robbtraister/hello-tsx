import { StrictMode } from "react";
import ReactDOM from "react-dom";

import { App } from "./app";

import "./index.scss";

// if sent here from the 404 page, update the history URI
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  history.replaceState(null, "", redirect);
}

const dataPromise = Promise.all([
  window.fetch("/store.json").then((resp) => resp.json()),
  window.fetch("/user.json").then((resp) => resp.json()),
]);

window.document.addEventListener("DOMContentLoaded", async () => {
  const [store, user] = await dataPromise;
  ReactDOM.render(
    <StrictMode>
      <App store={store} user={user} />
    </StrictMode>,
    document.getElementById("root")
  );
});
