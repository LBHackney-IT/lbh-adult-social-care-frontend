import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
import '/styles/globals.scss';
import { Provider } from 'react-redux';

import { fetcher } from 'api';
import { CustomNotification } from 'components';
import { useRouter } from 'next/router';
import { useStore } from '../store';
import { getPrevRouteInfo, saveToStoragePrevRoute } from '../routes/RouteConstants';

const swrOptions = {
  errorRetryCount: 3,
  revalidateOnMount: true,
  fetcher,
};

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(() => {
    if(router?.route) {
      const [ mainRoute ] = router.route.split('/');
      if(getPrevRouteInfo(mainRoute)?.route) saveToStoragePrevRoute(mainRoute);
    }
  }, [router.route])

  return (
    <Provider store={store}>
      <SWRConfig value={swrOptions}>
        <CustomNotification />
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
