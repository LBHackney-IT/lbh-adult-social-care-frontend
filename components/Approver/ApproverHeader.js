import React from 'react';
import { useRouter } from 'next/router';
import { includeString } from 'service/helpers';
import { CARE_PACKAGE_ROUTE, LOGOUT_ROUTE } from '../../routes/RouteConstants';
import { AdultSocialCare, HackneyLogo } from '../Icons';

const socialWorkerRoutes = [
  { route: CARE_PACKAGE_ROUTE, name: 'New Package' },
  { route: LOGOUT_ROUTE, name: 'Log Out' },
];

const ApproverHeader = () => {
  const router = useRouter();

  const changeRoute = (route) => {
    router.push(route);
  };

  return (
    <div className="default-logo-header">
      <div onClick={() => router.push(CARE_PACKAGE_ROUTE)} className="hackney-adult-logo is-clickable">
        <HackneyLogo />
        <span>|</span>
        <AdultSocialCare />
      </div>
      <div className="default-logo-header-navigation">
        {socialWorkerRoutes.map((item) => {
          const isActiveRoute = includeString(router.pathname, item?.route);
          return (
            <p
              key={item?.name}
              onClick={() => changeRoute(item?.route)}
              className={`default-logo-header-item${isActiveRoute ? ' default-logo-header-active-item' : ''}`}
            >
              {item?.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ApproverHeader;
