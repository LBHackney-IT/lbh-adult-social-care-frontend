import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { usePackageHistory } from 'api';
import { formatDate } from 'service';

const HistoryOverview = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data } = usePackageHistory(packageId);
  const { brokeredBy, assignedOn, approvedBy, approvedOn } = data;

  const overviewData = [
    { value: brokeredBy ?? '-', label: 'Brokered by' },
    { value: formatDate(assignedOn) ?? '-', label: 'Assigned on' },
    { value: approvedBy ?? '-', label: 'Approved by' },
    { value: formatDate(approvedOn) ?? '-', label: 'Approved on' },
    { value: '-', label: 'Care Plan' },
  ];

  return (
    <div className="history__overview">
      <h3>Overview</h3>

      <div className="history__overview-list">
        {overviewData.map((item) => (
          <div key={item.label}>
            <h2>{item.label}</h2>
            <p>{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default memo(HistoryOverview);
