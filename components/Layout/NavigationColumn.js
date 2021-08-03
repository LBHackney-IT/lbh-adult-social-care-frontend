import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import * as RouteConstants from '../../routes/RouteConstants';
import { selectMobileMenu } from '../../reducers/mobileMenuReducer';
import NavClientSummary from '../NavClientSummary';

const NavItem = ({ children, to, params = '' }) => {
  const router = useRouter();
  const activeRouteClass = router.pathname.indexOf(to) > -1 ? ' is-active' : '';
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
      {clientSummaryInfo && <NavClientSummary showBackButton={showBackButton} props={clientSummaryInfo} />}
      <NavItem to={RouteConstants.CARE_PACKAGE_ROUTE}>Care Package</NavItem>
      <NavItem to="/social-worker">Social Worker</NavItem>
      <NavItem to="/approver-hub">Approver Hub</NavItem>
      <NavItem to="/brokerage-hub">Brokerage Hub</NavItem>
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
