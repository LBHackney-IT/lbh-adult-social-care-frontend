import React from 'react';

const PaymentsTabs = ({ tabs = [], tab, changeTab, className = '' }) => {
  const onChangeTab = (tabName) => {
    changeTab(tabName);
  };

  return (
    <div className={`payments__tabs ${className}`}>
      {tabs.map((item) => {
        const activeTab = tab === item.value;
        return (
          <div
            key={item.text}
            onClick={() => onChangeTab(item.value)}
            className={`payments__tabs-tab${activeTab ? ' payments__tabs-active-tab' : ' payments__tabs-inactive-tab'}`}
          >
            <p>{item.text}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentsTabs;
