import React from "react";
import { useLocation, useHistory } from 'react-router-dom';
import {HackneyFullLogo} from "../Icons";
import {includeString} from "../../service/helpers";

const supplierRoutes = [
  {route: '/supplier-dashboard/supplier-returns', name: 'Supplier Returns'},
  {route: '/active-packages', name: 'Active Packages'},
  {route: '/payments', name: 'Payments'},
  {route: 'logout', name: 'Log Out'},
];

const SupplierDashboardHeader = () => {
  const location = useLocation().pathname;
  const pushRoute = useHistory().push;
  if(location.indexOf('/supplier-dashboard') === -1) {
    return <></>
  }

  const changeRoute = route => {
    if(route === 'logout') {
      pushRoute('/');
    } else {
      pushRoute(route);
    }
  };

  return (
    <div className='default-logo-header'>
      <HackneyFullLogo />
      <div className='default-logo-header-navigation'>
        {supplierRoutes.map(item => {
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

export default SupplierDashboardHeader;
