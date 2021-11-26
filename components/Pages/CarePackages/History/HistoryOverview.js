import { useRouter } from 'next/router';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useDocument, usePackageHistory } from 'api';
import { formatDate } from 'service';
import UrlFromFile from '../../../UrlFromFile';

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

  const { data: href } = useDocument(socialWorkerCarePlanFileName && socialWorkerCarePlanFileId);

  const [file, setFile] = useState();

  useEffect(() => {
    if (href) {
      setFile(href);
    }
  }, [])

  const overviewData = useMemo(() => [
    { value: brokeredBy ?? '-', label: 'Brokered by' },
    { value: formatDate(assignedOn) ?? '-', label: 'Assigned on' },
    { value: approvedBy ?? '-', label: 'Approved by' },
    { value: formatDate(approvedOn) ?? '-', label: 'Approved on' },
    { value: file ? <UrlFromFile file={file} showOnlyLink /> : '-', label: 'Care Plan' },
  ], [brokeredBy, assignedOn]);

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
