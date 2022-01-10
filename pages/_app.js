import React, { useEffect } from 'react';
import { SWRConfig } from 'swr';
// eslint-disable-next-line import/no-absolute-path,import/no-unresolved
import '/styles/globals.scss';
import { Provider } from 'react-redux';
import { fetcher } from 'api';
import { CustomNotification } from 'components';
import { useRouter } from 'next/router';
import {
  APP_SERVICE_ROUTES_MAP,
  getPrevRouteInfo,
  saveToStoragePrevRoute,
  setPreviousPath,
} from 'routes/RouteConstants';
import { useStore } from '../store';

const swrOptions = {
  errorRetryCount: 3,
  revalidateOnMount: true,
  fetcher,
};

export default function App({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);
  const router = useRouter();

  useEffect(() => {
    // breadcrumbs route
    if (router?.pathname && getPrevRouteInfo(router.pathname)?.route) {
      saveToStoragePrevRoute(router.pathname);
    }
  }, [router.pathname]);

  useEffect(() => {
    // save redirect route
    const { asPath: path } = router;
    if (path && !APP_SERVICE_ROUTES_MAP.some((item) => path.includes(item))) {
      setPreviousPath(path);
    }
  }, [router.asPath]);

  return (
    <Provider store={store}>
      <SWRConfig value={swrOptions}>
        <CustomNotification />
        <Component {...pageProps} />
      </SWRConfig>
    </Provider>
  );
}
