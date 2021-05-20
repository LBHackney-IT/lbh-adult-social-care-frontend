import React from "react";
import { useLocation, useHistory } from 'react-router-dom';
import {HackneyFullLogo} from "../../components/Icons";

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
      console.log('logout');
    } else {
      pushRoute(`/payments/${route}`);
    }
  };

  return (
    <div className='payments__header'>
      <HackneyFullLogo />
      <div className='payments__header-navigation'>
        {paymentsRoutes.map(item => {
          const isActiveRoute = location.indexOf(item.route) > -1;
          return (
            <p key={item.name} onClick={() => changeRoute(item.route)} className={`payments__header-item${isActiveRoute ? ' payments__header-active-item' : ''}`}>
              {item.name}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentsHeader;
