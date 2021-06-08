import React from "react";
import "/styles/index.scss";
import "bulma/css/bulma.css";
import { Provider } from "react-redux";
import {useStore} from "../store";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
