import React from "react";
import "/styles/globals.scss";
import "bulma/css/bulma.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import AdditionalHeader from "../components/AdditionalHeader";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <AdditionalHeader />
      <Component {...pageProps} />
    </Provider>
  )
}
