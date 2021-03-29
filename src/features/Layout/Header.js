import { ArrowLeftIcon, HackneyLogo } from "../components/Icons";
import { NavLink } from "react-router-dom";

const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div className="level">
        <div className="level-item level-left">
          <HackneyLogo />
        </div>
        <div className="level-item level-right"></div>
      </div>
    </div>
  );
};

const Header = ({ children, subTitle }) => {
  return (
    <>
      <HeaderNav />
      <div className="page-header">
        <NavLink to="/">
          <ArrowLeftIcon />
          Back
        </NavLink>
        <div className="header-title">
          <h5>{subTitle}</h5>
          <h3>
            <strong>{children}</strong>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Header;
