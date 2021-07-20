import React, { useState } from "react";
import { useRouter } from "next/router";
import {AdultSocialCare, HackneyLogo} from "../Icons";
import {includeString} from "../../service/helpers";

const ApproverHeader = () => {
  const router = useRouter();

  const [socialWorkerRoutes] = useState([
    {route: 'logout', name: 'Log Out'},
  ]);

  const changeRoute = route => {
    if(route === 'logout') {
      router.push('/');
    }
  };

  return (
    <div className='default-logo-header'>
      <div onClick={() => router.push('/care-package')} className='hackney-adult-logo is-clickable'>
        <HackneyLogo />
        <span>|</span>
        <AdultSocialCare />
      </div>
      <div className='default-logo-header-navigation'>
        {socialWorkerRoutes.map(item => {
          const isActiveRoute = includeString(router.pathname, item.route);
          return (
            <p key={item.name} onClick={() => changeRoute(item.route)} className={`default-logo-header-item${isActiveRoute ? ' default-logo-header-active-item' : ''}`}>
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default ApproverHeader;
