import React from "react";
import { useRouter } from "next/router";
import {HackneyFullLogo} from "../Icons";
import {includeString} from "../../service/helpers";
import {ACTIVE_PACKAGES_ROUTE, PAYMENTS_ROUTE, SUPPLIER_DASHBOARD_ROUTE} from "../../routes/RouteConstants";

const supplierRoutes = [
  {route: SUPPLIER_DASHBOARD_ROUTE, name: 'Supplier Returns'},
  {route: ACTIVE_PACKAGES_ROUTE, name: 'Active Packages'},
  {route: PAYMENTS_ROUTE, name: 'Payments'},
  {route: '/', name: 'Log Out'},
];


const SupplierDashboardHeader = () => {
  const router = useRouter();

  const changeRoute = route => {
    router.push(route);
  };

  return (
    <div className='default-logo-header'>
      <HackneyFullLogo />
      <div className='default-logo-header-navigation'>
        {supplierRoutes.map(item => {
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

export default SupplierDashboardHeader;
