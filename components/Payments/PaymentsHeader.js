import React from "react";
import { useRouter } from "next/router";
import {HackneyFullLogo} from "../Icons";
import {includeString} from "../../service/helpers";

const paymentsRoutes = [
  {route: 'pay-runs', name: 'Pay Runs'},
  {route: 'care-charges', name: 'Care Charges'},
  {route: 'reclaims', name: 'Reclaims'},
  {route: 'reporting', name: 'Reporting'},
  {route: 'logout', name: 'Log Out'},
];

const PaymentsHeader = () => {
  const router = useRouter();

  const changeRoute = route => {
    if(route === 'logout') {
      router.push('/');
    } else {
      router.push(`/payments/${route}`);
    }
  };

  return (
    <div className='default-logo-header'>
      <HackneyFullLogo />
      <div className='default-logo-header-navigation'>
        {paymentsRoutes.map(item => {
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

export default PaymentsHeader;
