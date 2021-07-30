import React from 'react';
import Header from './Header';
import NavigationColumn from './NavigationColumn';

const Layout = ({ children, showNav = true, showBackButton, clientSummaryInfo }) => (
  <>
    <Header />
    <div className="pb-0 mb-0">
      <NavigationColumn showBackButton={showBackButton} clientSummaryInfo={clientSummaryInfo} />
      <div className={`column pb-0 mb-0 ${showNav ? 'main-content__with-nav' : ''}`}>{children}</div>
    </div>
  </>
);

export default Layout;
