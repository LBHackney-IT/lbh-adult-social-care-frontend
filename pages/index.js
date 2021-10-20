import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Loading } from 'components';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';

export const getServerSideProps = withSession(({ req }) => {
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
    router.replace(BROKER_PORTAL_ROUTE);
  }, [router]);

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
