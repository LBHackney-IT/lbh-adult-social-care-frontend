import { useRouter } from 'next/router';
import React, { memo } from 'react';
import { usePackageHistory } from 'api';
import { formatDate } from 'service';

const HistoryList = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data } = usePackageHistory(packageId);

  return (
    <div className="history__list">
      {data.history?.map((item) => (
        <div key={item.id}>
          <p>{formatDate(item.dateCreated)}</p>

          <div>
            <span>{item.creatorName}</span>
            <span className="history__list-dot">•</span>
            <span>{item.description}</span>
          </div>

          {item.requestMoreInformation && <span>{item.requestMoreInformation}</span>}
        </div>
      ))}
    </div>
  );
};

export default memo(HistoryList);
