import React from 'react';
import { SWRConfig } from 'swr';
import '/styles/globals.scss';
import { Provider } from 'react-redux';

import CustomNotification from 'components/Notifications';
import fetcher from 'api/SWR/fetcher';
import { useStore } from '../store';

const swrOptions = {
  errorRetryCount: 3,
  revalidateOnMount: true,
  fetcher,
};

export default function App ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <SWRConfig value={swrOptions}>
        <CustomNotification/>
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
