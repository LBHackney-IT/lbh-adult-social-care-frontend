import React, { useEffect, useState } from 'react';
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
  const [initialFilters] = useState({
    status: '',
    dateFrom: null,
    dateTo: null,
    serviceUserId: '',
  });
  const [filters, setFilters] = useState({ ...initialFilters });
  const [apiFilters, setApiFilters] = useState({ ...initialFilters });
  const { data } = useCarePackageApi.brokerView({
    pageNumber,
    status: apiFilters.status,
    toDate: apiFilters.dateTo ? apiFilters.dateTo.toJSON() : null,
    fromDate: apiFilters.dateFrom ? apiFilters.dateFrom.toJSON() : null,
    serviceUserId: apiFilters.serviceUser?.id,
  });

  const clearFilter = () => {
    setFilters({ ...initialFilters });
    setApiFilters({ ...initialFilters });
  };

  const findServiceUser = () => setApiFilters(filters);

  useEffect(() => {
    if (data) {
      setPackageData(data.packages);
    }
  }, [data]);

  useEffect(() => {
    if (data.pagingMetaData) {
      setPaginationData({
        totalCount: data.pagingMetaData.totalCount,
        totalPages: data.pagingMetaData.totalPages,
        pageSize: data.pagingMetaData.pageSize,
      });
    }
  }, [data]);

  const statusOptions = [
    { text: 'All', value: '' },
    { text: 'New', value: '1' },
    { text: 'In Progress', value: '2' },
    { text: 'Submitted For Approval', value: '3' },
    { text: 'Approved', value: '4' },
    { text: 'Not Approved', value: '5' },
    { text: 'Ended', value: '6' },
    { text: 'Cancelled', value: '7' },

  ];
  const brokerOptions = [
    { text: 'Broker-1', value: 'broker-1' },
    { text: 'Broker-2', value: 'broker-2' },
  ];

  return (
    <BrokerageHubPage
      findServiceUser={findServiceUser}
      filters={filters}
      clearFilter={clearFilter}
      setFilters={setFilters}
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
