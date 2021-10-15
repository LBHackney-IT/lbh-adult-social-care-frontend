import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service/helpers';
import { getCorePackageRoute, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { BrokerPortalPage } from 'components/Pages/BrokerPortal';
import { createCoreCarePackage } from 'api/CarePackages/CarePackage';
import { addNotification } from 'reducers/notificationsReducer';

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

  const handleRowClick = (rowInfo) => {
    if (rowInfo) router.push({ pathname: getServiceUserPackagesRoute(rowInfo.serviceUserId), query: rowInfo });
  };

  const createNewPackage = () => {
    const dummyPackageToCreate = {
      serviceUserId: 'aee45700-af9b-4ab5-bb43-535adbdcfb84',
      hasRespiteCare: false,
      hasDischargePackage: false,
      packageScheduling: 1,
      primarySupportReasonId: 1,
      packageType: 2,
      hospitalAvoidance: false,
      isReEnablement: false,
      isS117Client: false,
    };

    createCoreCarePackage({ data: dummyPackageToCreate })
      .then(({ id }) => {
        // Dummy package created, go to package builder
        router.push(getCorePackageRoute(id));
        pushNotification('Package created.', 'success');
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  return (
    <BrokerPortalPage
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
