import { CaretRightIcon } from "../components/Icons";

const NavItem = ({ children, to }) => {
  return (
    <div className="navigation-item">
      {children} <CaretRightIcon />
    </div>
  );
};

const NavigationColumn = () => {
  return (
    <div>
      <NavItem>Client History</NavItem>
      <NavItem>Client details</NavItem>
      <NavItem>Medical history</NavItem>
      <NavItem>Important to me</NavItem>
      <NavItem>GP Details</NavItem>
      <NavItem>Communication Support</NavItem>
      <NavItem>Mental Capacity Assessment</NavItem>
      <NavItem>Carer</NavItem>
      <NavItem>Risk Assessment</NavItem>
      <NavItem>Care Package</NavItem>
      <NavItem>Review</NavItem>
    </div>
  );
};

export default NavigationColumn;
