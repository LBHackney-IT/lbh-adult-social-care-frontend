import React, { useEffect, useState } from 'react';
import useCarePackageApi from '../api/SWR/CarePackage/useCarePackageApi';
import withSession from '../lib/session';
import { getUserSession } from '../service/helpers';
import { BrokerageHubPage } from '../components/Brokerage/BrokerageHub';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };
  return { props: {} };
});

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

  return (
    <BrokerageHubPage
      findServiceUser={findServiceUser}
      filters={filters}
      clearFilter={clearFilter}
      setFilters={setFilters}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      statusOptions={statusOptions}
      items={packageData}
      paginationData={paginationData}
    />
  );
};

export default BrokerageHub;
