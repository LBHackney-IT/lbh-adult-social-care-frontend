import "bulma/css/bulma.css";
import "./public/css/index.scss";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./reducers/store";
import * as serviceWorker from "./serviceWorker";
import Login from "../pages/Login";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Login />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
