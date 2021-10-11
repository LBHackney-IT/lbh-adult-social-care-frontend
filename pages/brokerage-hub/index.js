import React, { useState } from 'react';
import { BrokerageHub as BrokerageHubPage } from 'components/Brokerage/BrokerageHub';
import useCarePackageApi from '../../api/SWR/CarePackage/useCarePackageApi';

const BrokerageHub = () => {
  const [packageData, setPackageData] = React.useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [paginationData, setPaginationData] = React.useState({
    totalCount: 0,
    totalPages: 0,
    pageSize: 0,
  });
  const { data } = useCarePackageApi.brokerView({ pageNumber });

  React.useEffect(() => {
    if (data) {
      setPackageData(data.packages);
    }
  }, [data]);

  React.useEffect(() => {
    if (data.pagingMetaData) {
      setPaginationData({
        totalCount: data.pagingMetaData.totalCount,
        totalPages: data.pagingMetaData.totalPages,
        pageSize: data.pagingMetaData.pageSize,
      });
    }
  }, [data]);

  const statusOptions = [
    { text: 'Status-1', value: 'status-1' },
    { text: 'Status-2', value: 'status-2' },
  ];
  const brokerOptions = [
    { text: 'Broker-1', value: 'broker-1' },
    { text: 'Broker-2', value: 'broker-2' },
  ];

  return (
    <BrokerageHubPage
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      statusOptions={statusOptions}
      brokerOptions={brokerOptions}
      items={packageData}
      paginationData={paginationData}
    />
  );
};
export default BrokerageHub;
