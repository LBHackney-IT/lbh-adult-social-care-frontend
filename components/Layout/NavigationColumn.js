import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as RouteConstants from 'routes/RouteConstants';
import { selectMobileMenu } from 'reducers/mobileMenuReducer';
import NavClientSummary from '../NavClientSummary';

const links = [
  { to: RouteConstants.CARE_PACKAGE_ROUTE, label: 'Care Package' },
  { to: RouteConstants.SOCIAL_WORKER_ROUTE, label: 'Social Worker' },
  { to: RouteConstants.APPROVER_HUB_ROUTE, label: 'Approver Hub' },
  { to: RouteConstants.BROKER_PORTAL_ROUTE, label: 'Brokerage Hub' },
];

const NavItem = ({ children, to, params = '' }) => {
  const router = useRouter();
  const activeRouteClass = router.pathname.indexOf(to) > -1 && to !== '/' ? ' is-active' : '';

  return (
    <div
      className={`navigation-item is-clickable${activeRouteClass}`}
      onClick={() => router.push(`${to}${params}`)}
      role="presentation"
    >
      <div>{children}</div>
    </div>
  );
};

const NavigationColumn = ({ clientSummaryInfo, showBackButton }) => {
  const { isOpened } = useSelector(selectMobileMenu);
  const mobileNavBar = isOpened ? ' opened-mobile-nav' : '';

  return (
    <div className={`column pb-0 mb-0 nav-column${mobileNavBar}`}>
      {clientSummaryInfo && <NavClientSummary showBackButton={showBackButton} {...clientSummaryInfo} />}

      {links.map(({ to, label }) => (
        <NavItem key={label} to={to}>
          {label}
        </NavItem>
      ))}

      {/* /!* <NavItem to={RouteConstants.CLIENT_HISTORY_ROUTER}>Client History</NavItem> */}
      {/* <NavItem to="/test">Client details</NavItem>
      <NavItem to="/test">Medical history</NavItem>
      <NavItem to="/test">Important to me</NavItem>
      <NavItem to="/test">GP Details</NavItem>
      <NavItem to="/test">Communication Support</NavItem>
      <NavItem to="/test">Mental Capacity Assessment</NavItem>
      <NavItem to="/test">Carer</NavItem>
      <NavItem to="/test">Risk Assessment</NavItem>
      <NavItem to="/test">Review</NavItem> */}
    </div>
  );
};

export default NavigationColumn;
