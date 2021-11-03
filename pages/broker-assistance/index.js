import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useBrokerView } from 'api';
import { getLoggedInUser } from 'service';
import { BrokerPortalPage } from 'components';
import { getServiceUserPackagesRoute, SERVICE_USER_MASTER_SEARCH_ROUTE } from 'routes/RouteConstants';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const initialFilters = {
  status: '',
  dateFrom: null,
  dateTo: null,
  brokerId: '',
  serviceUserName: '',
};

const BrokerAssistance = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const { brokerId, dateTo, dateFrom, status, serviceUserName } = filters;

  const params = useMemo(() => ({
    fromDate: dateFrom ? dateFrom.toJSON() : null,
    toDate: dateTo ? dateTo.toJSON() : null,
    serviceUserName,
    pageNumber,
    status,
    brokerId,
  }), [filters, pageNumber])

  const { data, isLoading: brokerViewLoading } = useBrokerView({ params });

  const {
    packages = [],
    pagingMetaData = {
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
    },
  } = data;

  const clearFilters = useCallback(() => setFilters(initialFilters), []);

  const handleRowClick = useCallback((rowInfo) => {
    router.push(getServiceUserPackagesRoute(rowInfo.serviceUserId));
  }, []);

  const goToBrokerAssistanceSearch = useCallback(() => {
    router.push(SERVICE_USER_MASTER_SEARCH_ROUTE);
  }, []);

  return (
    <BrokerPortalPage
      title='Broker Assistance'
      loading={brokerViewLoading}
      goToSearch={goToBrokerAssistanceSearch}
      filters={filters}
      clearFilter={clearFilters}
      setFilters={setFilters}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      items={packages}
      paginationData={pagingMetaData}
      onRowClick={handleRowClick}
    />
  );
};

export default BrokerAssistance;
