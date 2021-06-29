import React from "react";
import { ArrowLeftIcon, HackneyLogo } from "../Icons";
import { useRouter } from "next/router";

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

const Header = ({ children, subTitle, showPageHeader = true }) => {
  const router = useRouter();
  return (
    <>
      <HeaderNav />
      {showPageHeader &&
      <div className="page-header">
        <div onClick={() => router.back()}>
          <ArrowLeftIcon />
          Back
        </div>
        <div className="header-title">
          {subTitle !== undefined ? <h5>{subTitle}</h5> : null}
          <h3>
            <strong>{children}</strong>
          </h3>
        </div>
      </div>
      }

    </>
  );
};

export default Header;
