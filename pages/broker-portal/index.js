import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useCarePackageApi } from 'api';
import { getLoggedInUser } from 'service';
import { BrokerPortalPage } from 'components';
import { getServiceUserPackagesRoute } from 'routes/RouteConstants';

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
  broker: null,
  serviceUserName: '',
};

const BrokerPortal = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const { broker, dateTo, dateFrom, status, serviceUserName } = filters;

  const { data, isLoading: brokerViewLoading } = useCarePackageApi.brokerView({
    fromDate: dateFrom ? dateFrom.toJSON() : null,
    toDate: dateTo ? dateTo.toJSON() : null,
    brokerId: broker?.id,
    serviceUserName,
    pageNumber,
    status,
  });

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
    router.push({
      pathname: getServiceUserPackagesRoute(rowInfo.packageId),
      query: {
        // todo: should be removed once endpoint for getting package info will contain this data
        packageStatus: rowInfo.packageStatus,
        dateAssigned: rowInfo.dateAssigned,
      },
    });
  }, []);

  return (
    <BrokerPortalPage
      loading={brokerViewLoading}
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