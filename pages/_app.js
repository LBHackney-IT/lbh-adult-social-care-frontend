import React from 'react';
import '/styles/globals.scss';
import 'bulma/css/bulma.css';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import AdditionalHeader from '../components/AdditionalHeader';
import CustomNotification from '../components/Notifications';

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <CustomNotification />
      <AdditionalHeader />
      <Component {...pageProps} />
    </Provider>
  );
}
