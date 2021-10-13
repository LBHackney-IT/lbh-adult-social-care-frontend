import Head from 'next/head';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BROKERAGE_HUB_ROUTE } from 'routes/RouteConstants';
import Loading from 'components/Loading';
import withSession from 'lib/session';
import { getLoggedInUser } from '../service/helpers';

export const getServerSideProps = withSession(async ({ req }) => {
  const user = getLoggedInUser({ req });

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return { props: {} };
});

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(BROKERAGE_HUB_ROUTE);
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
