import React from 'react';
import { SWRConfig } from 'swr';
import '/styles/globals.scss';
import 'bulma/css/bulma.css';
import { Provider } from 'react-redux';
import { useStore } from '../store';
import AdditionalHeader from '../components/AdditionalHeader';
import CustomNotification from '../components/Notifications';
import fetcher from '../swrAPI/fetcher';

const swrOptions = {
  errorRetryCount: 3,
  revalidateOnMount: true,
  fetcher,
};

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <SWRConfig value={swrOptions}>
        <CustomNotification />
        <AdditionalHeader />
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
