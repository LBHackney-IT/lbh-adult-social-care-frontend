import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service/helpers';
import { getCorePackageRoute } from 'routes/RouteConstants';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { BrokerPortalPage } from 'components/Pages/BrokerPortal';

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
  serviceUser: null,
};

const BrokerPortal = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const { serviceUser, dateTo, dateFrom, status } = filters;

  const { data } = useCarePackageApi.brokerView({
    fromDate: dateFrom ? dateFrom.toJSON() : null,
    toDate: dateTo ? dateTo.toJSON() : null,
    serviceUserId: serviceUser?.id,
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

  const onRowClick = useCallback(({ packageId }) => {
    router.push(getCorePackageRoute(packageId));
  }, []);

  return (
    <BrokerPortalPage
      filters={filters}
      clearFilter={clearFilters}
      setFilters={setFilters}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      items={packages}
      paginationData={pagingMetaData}
      onRowClick={onRowClick}
    />
  );
};

export default BrokerPortal;
