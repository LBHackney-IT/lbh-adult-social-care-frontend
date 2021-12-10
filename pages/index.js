import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Loading } from 'components';
import { BROKER_REFERRAL_ROUTE, getPreviousPath } from 'routes/RouteConstants';

export default function IndexPage () {
  const router = useRouter();

  useEffect(() => {
    router.replace(getPreviousPath() || BROKER_REFERRAL_ROUTE);
  }, []);

  return (
    <div>
      <Head>
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>
      <div id="modal" />
      <Loading />
    </div>
  );
}
