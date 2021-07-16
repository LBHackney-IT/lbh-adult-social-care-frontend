import React from 'react';

const DashboardTabs = ({ tabs = [], tab, changeTab, classes = '' }) => {
  const onChangeTab = (tabName) => {
    changeTab(tabName);
  };

  return (
    <div className={`dashboard__tabs ${classes}`}>
      {tabs.map((item) => {
        const activeTab = tab === item.value;
        return (
          <div
            key={item.text}
            onClick={() => onChangeTab(item.value)}
            className={`${item.className || ''} dashboard__tabs-tab${
              activeTab ? ' dashboard__tabs-active-tab' : ' dashboard__tabs-inactive-tab'
            }`}
            role="presentation"
          >
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardTabs;
