import { useRouter } from 'next/router';
import React, { memo, useMemo } from 'react';
import { getDocumentRequest, usePackageHistory } from 'api';
import { formatDate } from 'service';
import ViewDocument from '../../../ViewDocument';

const HistoryOverview = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data } = usePackageHistory(packageId);
  const {
    brokeredBy,
    assignedOn,
    approvedBy,
    approvedOn,
    socialWorkerCarePlanFileName,
    socialWorkerCarePlanFileId
  } = data;

  const hasFile = socialWorkerCarePlanFileId && socialWorkerCarePlanFileName;

  const overviewData = useMemo(() => [
    { value: brokeredBy ?? '-', label: 'Brokered by' },
    { value: formatDate(assignedOn) ?? '-', label: 'Assigned on' },
    { value: approvedBy ?? '-', label: 'Approved by' },
    { value: formatDate(approvedOn) ?? '-', label: 'Approved on' },
    {
      value: hasFile ? (
        <ViewDocument
          noFile={!(hasFile)}
          downloadFileName="Care Plan"
          getDocumentRequest={() => getDocumentRequest(socialWorkerCarePlanFileId)}
        />
      ) : '-', label: 'Care Plan'
    },
  ], [brokeredBy, assignedOn, hasFile]);

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
