import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Loading } from 'components';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { BROKER_ASSISTANCE_ROUTE, DEFAULT_REDIRECT_ROUTE_INFO, getPreviousPath } from 'routes/RouteConstants';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) return DEFAULT_REDIRECT_ROUTE_INFO;

  return { props: {} };
});

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getPreviousPath() || BROKER_ASSISTANCE_ROUTE);
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
