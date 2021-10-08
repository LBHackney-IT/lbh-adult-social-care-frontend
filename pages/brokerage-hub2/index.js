import React from 'react';
import { BrokerageHub as BrokerageHubPage } from 'components/Brokerage/BrokerageHub';
import { useGetData } from 'api/SWR';

const BrokerageHub = () => {
  const [packageData, setPackageData] = React.useState([]);
  const [paginationData, setPaginationData] = React.useState({
    totalCount: 0,
    totalPages: 0,
    pageSize: 0,
  });
  const getBrokerageData = () => useGetData(`care-packages/broker-view`);
  const { data } = getBrokerageData();

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
      statusOptions={statusOptions}
      brokerOptions={brokerOptions}
      items={packageData}
      searchResults={paginationData}
    />
  );
};
export default BrokerageHub;