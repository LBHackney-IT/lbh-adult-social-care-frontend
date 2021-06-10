import React from "react";
import "/styles/globals.scss";
import "bulma/css/bulma.css";
import { Provider } from "react-redux";
import { useStore } from "../store";
import PaymentsHeader from "../components/Payments/PaymentsHeader";

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState)

  return (
    <Provider store={store}>
      <PaymentsHeader />
      <Component {...pageProps} />
    </Provider>
  )
}
