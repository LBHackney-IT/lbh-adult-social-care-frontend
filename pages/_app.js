import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
// eslint-disable-next-line import/no-absolute-path,import/no-unresolved
import '/styles/globals.scss';
import { Provider } from 'react-redux';

import { fetcher } from 'api';
import { CustomNotification, MainHeader } from 'components';
import { useRouter } from 'next/router';
import { useStore } from '../store';
import {
  APP_SERVICE_ROUTES_MAP,
  getPrevRouteInfo,
  saveToStoragePrevRoute,
  setPreviousPath
} from '../routes/RouteConstants';

const swrOptions = {
  errorRetryCount: 3,
  revalidateOnMount: true,
  fetcher,
};

export default function App ({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(() => {
    if (router?.pathname && getPrevRouteInfo(router.pathname)?.route) {
      saveToStoragePrevRoute(router.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    if (router.asPath && !APP_SERVICE_ROUTES_MAP.some(item => item.includes(router.asPath))) {
      setPreviousPath(router.asPath);
    }
  }, [router.asPath]);

  return (
    <Provider store={store}>
      <SWRConfig value={swrOptions}>
        <MainHeader />
        <CustomNotification />
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
