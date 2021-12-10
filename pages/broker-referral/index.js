import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useBrokerView } from 'api';
import { BrokerPortalPage } from 'components';
import {
  getServiceUserPackagesRoute,
  SERVICE_USER_MASTER_SEARCH_ROUTE
} from 'routes/RouteConstants';

const initialFilters = {
  status: '',
  dateFrom: null,
  dateTo: null,
  brokerId: '',
  serviceUserName: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Broker Referral' }];

const BrokerReferral = () => {
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

  const clearFilters = useCallback(() => setFilters(initialFilters), []);

  const handleRowClick = useCallback((rowInfo) => {
    router.push(getServiceUserPackagesRoute(rowInfo.serviceUserId));
  }, []);

  const goToBrokerReferralSearch = useCallback(() => {
    router.push(SERVICE_USER_MASTER_SEARCH_ROUTE);
  }, []);

  return (
    <BrokerPortalPage
      title="Broker Referral"
      breadcrumbs={breadcrumbs}
      loading={brokerViewLoading}
      goToSearch={goToBrokerReferralSearch}
      filters={filters}
      searchTerm={serviceUserName}
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

export default BrokerReferral;
