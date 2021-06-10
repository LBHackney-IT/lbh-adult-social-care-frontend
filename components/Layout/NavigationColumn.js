import React, {useEffect} from "react";
import { CaretRightIcon, CaretRightHighlightIcon } from "../Icons";
import * as RouteConstants from "../../routes/RouteConstants";
import {useRouter} from "next/router";

const NavItem = ({ children, to }) => {
  const router = useRouter();
  const activeRouteClass = router.pathname.indexOf(to) > - 1 ? " is-active" : '';
  return (
    <div
      className={`navigation-item is-clickable${activeRouteClass}`}
      onClick={() => router.push(to)}
    >
      <div>
        {children}
        <span className="caret">
          <CaretRightIcon />
        </span>
        <span className="caret-highlight">
          <CaretRightHighlightIcon />
        </span>
      </div>
    </div>
  );
};

const NavigationColumn = () => {
  return (
    <div className="nav-column-cont">
      <NavItem to={RouteConstants.PROPOSED_PACKAGES}>Proposed Packages</NavItem>
      <NavItem to={RouteConstants.CARE_PACKAGE}>Care Package</NavItem>
      <NavItem to={RouteConstants.CLIENT_HISTORY}>Client History</NavItem>
      <NavItem to="/test">Client details</NavItem>
      <NavItem to="/test">Medical history</NavItem>
      <NavItem to="/test">Important to me</NavItem>
      <NavItem to="/test">GP Details</NavItem>
      <NavItem to="/test">Communication Support</NavItem>
      <NavItem to="/test">Mental Capacity Assessment</NavItem>
      <NavItem to="/test">Carer</NavItem>
      <NavItem to="/test">Risk Assessment</NavItem>
      <NavItem to="/test">Review</NavItem>
    </div>
  );
};

export default NavigationColumn;
