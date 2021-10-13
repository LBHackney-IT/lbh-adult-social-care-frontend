import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';
import Loading from 'components/Loading';
import withSession from 'lib/session';
import { getUserSession } from 'service/helpers';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };
  return { props: {} };
});

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(BROKER_PORTAL_ROUTE);
  }, []);

  return (
    <div>
      <Head>
        <link href="/fonts/style.css" rel="stylesheet" />
      </Head>
      <div id="modal" />
      <Loading className="loading-center" />
    </div>
  );
}
