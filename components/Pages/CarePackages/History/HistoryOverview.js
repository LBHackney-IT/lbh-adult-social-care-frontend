import { useRouter } from 'next/router';
import React, { memo, useMemo, useState } from 'react';
import { usePackageHistory } from 'api';
import { formatDate, useGetFile } from 'service';
import UrlFromFile from '../../../UrlFromFile';

const HistoryOverview = () => {
  const router = useRouter();
  const [file, setFile] = useState();
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

  const { isLoading: fileLoading } = useGetFile({
    fileId: socialWorkerCarePlanFileId,
    fileName: socialWorkerCarePlanFileName,
    setter: (newFile) => setFile(newFile),
  });

  const overviewData = useMemo(() => [
    { value: brokeredBy ?? '-', label: 'Brokered by' },
    { value: formatDate(assignedOn) ?? '-', label: 'Assigned on' },
    { value: approvedBy ?? '-', label: 'Approved by' },
    { value: formatDate(approvedOn) ?? '-', label: 'Approved on' },
    { value: file ? <UrlFromFile isLoading={fileLoading} file={file} showOnlyLink /> : '-', label: 'Care Plan' },
  ], [brokeredBy, assignedOn, file]);

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
