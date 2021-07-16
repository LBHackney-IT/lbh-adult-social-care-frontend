import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AdultSocialCare, HackneyLogo } from '../Icons';
import { includeString } from '../../service/helpers';

const SocialWorkerHeader = () => {
  const router = useRouter();

  const [socialWorkerRoutes] = useState([
    { route: '', name: 'Submitted Forms' },
    { route: 'new-package', name: 'New Package' },
    { route: 'logout', name: 'Log Out' },
  ]);

  const changeRoute = (route) => {
    if (route === 'logout') {
      router.push('/');
    } else {
      router.push(`/social-worker/${route}`);
    }
  };

  return (
    <div className="default-logo-header">
      <div className="hackney-adult-logo">
        <HackneyLogo />
        <span>|</span>
        <AdultSocialCare />
      </div>
      <div className="default-logo-header-navigation">
        {socialWorkerRoutes.map((item) => {
          const isActiveRoute = includeString(router.pathname, item.route);
          return (
            <p
              key={item.name}
              onClick={() => changeRoute(item.route)}
              className={`default-logo-header-item${isActiveRoute ? ' default-logo-header-active-item' : ''}`}
            >
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default SocialWorkerHeader;
