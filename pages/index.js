import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { LOGIN_ROUTE } from 'routes/RouteConstants';
import Loading from 'components/Loading';

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(LOGIN_ROUTE);
  }, []);

  return (
    <div>
      <Head>
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>
      <div id='modal' />
      <Loading className='loading-center' />
    </div>
  );
}
