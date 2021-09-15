import React from 'react';
import { SWRConfig } from 'swr';
import '/styles/globals.scss';
import 'bulma/css/bulma.css';
import { Provider } from 'react-redux';
import AdditionalHeader from 'components/AdditionalHeader';
import CustomNotification from 'components/Notifications';
import fetcher from 'api/SWR/fetcher';
import { useStore } from '../store';
import { CancelElementModal } from '../components/CareCharges/CancelElementModal'

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
        <CancelElementModal />
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
