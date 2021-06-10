import React from "react";
import Header from "./Header";
import NavigationColumn from "./NavigationColumn";

const Layout = ({ headerTitle, subTitle, children }) => {
  return (
    <>
      <Header subTitle={subTitle}>{headerTitle}</Header>
      <div className="columns pb-0 mb-0">
        <div className="column pb-0 mb-0 nav-column">
          <NavigationColumn />
        </div>
        <div className="column pb-0 mb-0">
          {/*<div className="container pr-3">{children}</div>*/}
          <div className="pr-3">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
