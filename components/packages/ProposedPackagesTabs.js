import React from 'react';
import { CaretDownIcon } from '../Icons';

const ProposedPackagesTab = ({
  changeTab,
  tab,
  tabs = [
    { text: 'Approver history', value: 'approvalHistory' },
    { text: 'Package details', value: 'packageDetails' },
  ],
}) => {
  return (
    <div className="proposed-packages__tabs">
      {tabs.map((item) => {
        return (
          <div
            key={item.value}
            onClick={() => changeTab(item.value)}
            className={`tab${tab === item.value ? ' active-tab' : ''}`}
          >
            <p>{item.text}</p>
            <CaretDownIcon />
          </div>
        );
      })}
      <div className='line' />
    </div>
  );
};

export default ProposedPackagesTab;
