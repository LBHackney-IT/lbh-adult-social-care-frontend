import React from "react";
import { useLocation, useHistory } from 'react-router-dom';
import {HackneyFullLogo} from "../Icons";
import {includeString} from "../../service/helpers";

const paymentsRoutes = [
  {route: 'pay-runs', name: 'Pay Runs'},
  {route: 'bills', name: 'Bills'},
  {route: 'care-charges', name: 'Care Charges'},
  {route: 'reclaims', name: 'Reclaims'},
  {route: 'supplier-returns', name: 'Supplier Returns'},
  {route: 'reporting', name: 'Reporting'},
  {route: 'logout', name: 'Log Out'},
];

const PaymentsHeader = () => {
  const location = useLocation().pathname;
  const pushRoute = useHistory().push;
  if(location.indexOf('payments') === -1) {
    return <></>
  }

  const changeRoute = route => {
    if(route === 'logout') {
      pushRoute('/');
    } else {
      pushRoute(`/payments/${route}`);
    }
  };

  return (
    <div className='default-logo-header'>
      <HackneyFullLogo />
      <div className='default-logo-header-navigation'>
        {paymentsRoutes.map(item => {
          const isActiveRoute = includeString(location, item.route);
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
