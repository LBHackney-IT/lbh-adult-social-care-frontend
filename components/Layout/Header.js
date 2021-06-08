import { ArrowLeftIcon, HackneyLogo } from "../Icons";
import Link from "next/link";

const HeaderNav = () => {
  return (
    <div className="header-nav">
      <div className="level">
        <div className="level-item level-left">
          <HackneyLogo />
        </div>
        <div className="level-item level-right"/>
      </div>
    </div>
  );
};

const Header = ({ children, subTitle }) => {
  return (
    <>
      <HeaderNav />
      <div className="page-header">
        <Link to="/">
          <ArrowLeftIcon />
          Back
        </Link>
        <div className="header-title">
          {subTitle !== undefined ? <h5>{subTitle}</h5> : null}
          <h3>
            <strong>{children}</strong>
          </h3>
        </div>
      </div>
    </>
  );
};

export default Header;
