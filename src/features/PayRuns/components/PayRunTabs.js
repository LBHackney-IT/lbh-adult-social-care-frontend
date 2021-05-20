import React from "react";

const PayRunTabs = ({ tabs = [], tab, changeTab, classes = '' }) => {
  const onChangeTab = (tabName) => {
    changeTab(tabName);
  };

  return (
    <div className={`pay-runs__tabs ${classes}`}>
      {tabs.map(item => {
        const activeTab = tab === item.value;
        return (
          <div key={item.text} onClick={() => onChangeTab(item.value)}
            className={`pay-runs__tabs-tab${activeTab ? ' pay-runs__tabs-active-tab' : ' pay-runs__tabs-inactive-tab'}`}>
              <p>{item.text}</p>
          </div>
        )
      })}
    </div>
  );
};

export default PayRunTabs;
