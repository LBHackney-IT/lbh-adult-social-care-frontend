import React from 'react';
import Header from './Header';
import NavigationColumn from './NavigationColumn';
import NavClientSummary from '../NavClientSummary'

const Layout = ({ children, showNav = true, showBackButton, clientSummaryInfo }) => (
  <>
    <Header />
    <div className="pb-0 mb-0">
      <NavigationColumn showBackButton={showBackButton} clientSummaryInfo={clientSummaryInfo} />
      <div className={`column pb-0 mb-0 ${showNav ? 'main-content__with-nav' : ''}`}>
        {clientSummaryInfo && <NavClientSummary className='mobile-client-summary' showBackButton={showBackButton} {...clientSummaryInfo} />}
        {children}
      </div>
    </div>
  </>
);

export default Layout;
