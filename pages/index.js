import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Loading } from 'components';
import { BROKERAGE_ROUTE, getPreviousPath } from 'routes/RouteConstants';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { handleRoleBasedAccess } from './api/handleRoleBasedAccess';
import { accessRoutes } from './api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.APPROVALS)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

export default function IndexPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace(getPreviousPath() ?? BROKERAGE_ROUTE);
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
