import { useRouter } from 'next/router';
import React, { memo, useEffect, useState } from 'react';
import { usePackageHistory } from 'api';
import { formatDate } from 'service';
import { Timeline } from 'components';

const HistoryList = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data } = usePackageHistory(packageId);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (data && data.history) {
      const x = [];
      data.history.forEach((element) => {
        x.push({
          header: {
            text: `${formatDate(element.dateCreated)} - ${element.description}`,
            rewriteClass: 'govuk-heading-m',
          },
          innerElements: [
            { text: element?.requestMoreInformation, rewriteClass: 'lbh-body-s' },
            { text: `by ${element.creatorName}`, rewriteClass: 'lbh-body-s' },
          ],
        });
      });
      setHistory(x);
    }
  }, [data]);

  return <div className="history__list">{history && <Timeline timelines={history} />}</div>;
};

export default memo(HistoryList);
