import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useBrokerView } from 'api';
import { BrokerPortalPage } from 'components';
import { getServiceUserPackagesRoute, SERVICE_USER_SEARCH_ROUTE, useServerSideProps } from 'routes/RouteConstants';

export const getServerSideProps = useServerSideProps();

const initialFilters = {
  status: '',
  dateFrom: null,
  dateTo: null,
  serviceUserName: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Broker Portal' }];

const BrokerPortal = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const { dateFrom, dateTo, status, serviceUserName } = filters;

  const params = useMemo(() => ({
    fromDate: dateFrom ? dateFrom.toJSON() : null,
    toDate: dateTo ? dateTo.toJSON() : null,
    serviceUserName,
    pageNumber,
    status
  }), [filters, pageNumber]);

  const { data, isLoading: brokerViewLoading } = useBrokerView({ params });

  const {
    packages = [],
    pagingMetaData = {
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
    },
  } = data;

  const goToBrokerPortalSearch = useCallback(() => {
    router.push(SERVICE_USER_SEARCH_ROUTE);
  }, []);

  const clearFilters = useCallback(() => setFilters(initialFilters), []);

  const handleRowClick = useCallback((rowInfo) => {
    router.push(getServiceUserPackagesRoute(rowInfo.serviceUserId));
  }, []);

  return (
    <BrokerPortalPage
      title="Broker Portal"
      breadcrumbs={breadcrumbs}
      searchTerm={serviceUserName}
      loading={brokerViewLoading}
      goToSearch={goToBrokerPortalSearch}
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

export default BrokerPortal;
