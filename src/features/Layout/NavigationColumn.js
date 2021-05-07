import { NavLink } from "react-router-dom";
import { CaretRightIcon, CaretRightHighlightIcon } from "../components/Icons";
import * as RouteConstants from "../../routes/RouteConstants";

const NavItem = ({ children, to = "/xyz" }) => {
  return (
    <NavLink
      className="navigation-item is-clickable"
      activeClassName="is-active"
      to={to}
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
    </NavLink>
  );
};

const NavigationColumn = () => {
  return (
    <div className="nav-column-cont">
      <NavItem to={RouteConstants.PROPOSED_PACKAGES}>Proposed Packages</NavItem>
      <NavItem to={RouteConstants.CARE_PACKAGE}>Care Package</NavItem>
      {/* <NavItem to={RouteConstants.CLIENT_HISTORY}>Client History</NavItem>
      <NavItem>Client details</NavItem>
      <NavItem>Medical history</NavItem>
      <NavItem>Important to me</NavItem>
      <NavItem>GP Details</NavItem>
      <NavItem>Communication Support</NavItem>
      <NavItem>Mental Capacity Assessment</NavItem>
      <NavItem>Carer</NavItem>
      <NavItem>Risk Assessment</NavItem>
      <NavItem>Review</NavItem> */}
    </div>
  );
};

export default NavigationColumn;
