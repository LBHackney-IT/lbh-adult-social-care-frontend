import React, { memo } from 'react';

const testOverviewData = [
  { value: 'Derek Ofoborh', label: 'Brokered by' },
  { value: '29.09.2021', label: 'Assigned on' },
  { value: 'Amecie Steadman', label: 'Approved by' },
  { value: '31.10.2021', label: 'Approved on' },
  { value: 'View', label: 'Care Plan' },
];

const HistoryOverview = () => (
  <div className="history__overview">
    <h3>Overview</h3>

    <div className="history__overview-list">
      {testOverviewData.map((item) => (
        <div key={item.label}>
          <h2>{item.label}</h2>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default memo(HistoryOverview);
