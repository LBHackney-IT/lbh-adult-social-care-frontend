import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { BROKERAGE_ROUTE, getPreviousPath } from 'routes/RouteConstants';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { handleRoleBasedAccess } from './api/handleRoleBasedAccess';
import { accessRoutes } from './api/accessMatrix';

// NOTE No need to chekc for auth here, as that is handled by the middleware

export default function IndexPage() {
  const router = useRouter();

  // NOTE This redirect will only works if the user is logged in, otherwise it will be guarded by the middleware and redirect the user to /login
  useEffect(() => {
    const prevPath = getPreviousPath();
    router.push(!prevPath ? BROKERAGE_ROUTE : prevPath);
  }, []);

  return <div />;
}
