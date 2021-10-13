import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import withSession from 'lib/session';
import { getUserSession } from 'service/helpers';
import { BrokerPortalPage } from 'components/Brokerage/BrokerPortal';
import { createCoreCarePackage } from 'api/CarePackages/CarePackage';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { getCorePackageRoute } from 'routes/RouteConstants';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };
  return { props: {} };
});

const BrokerPortal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
  const [apiFilters, setApiFilters] = useState({ ...initialFilters });
  const { data } = useCarePackageApi.brokerView({
    pageNumber,
    status: apiFilters.status,
    toDate: apiFilters.dateTo ? apiFilters.dateTo.toJSON() : null,
    fromDate: apiFilters.dateFrom ? apiFilters.dateFrom.toJSON() : null,
    serviceUserId: apiFilters.serviceUser?.id,
  });

  const clearFilter = () => {
    setApiFilters({ ...initialFilters });
  };

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

  const handleRowClick = ({ serviceUserId, packageId }) => {
    router.push({
      pathname: getCorePackageRoute(serviceUserId),
      query: { packageId },
    });
  };

  // const findServiceUser = () => setApiFilters(filters);
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
      .then(({ id, serviceUserId }) => {
        // Dummy package created, go to package builder
        router.push({
          pathname: getCorePackageRoute(serviceUserId),
          query: { packageId: id },
        });
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
      createNewPackage={createNewPackage}
      filters={apiFilters}
      clearFilter={clearFilter}
      setFilters={setApiFilters}
      pageNumber={pageNumber}
      setPageNumber={setPageNumber}
      statusOptions={statusOptions}
      items={packageData}
      paginationData={paginationData}
      onRowClick={handleRowClick}
    />
  );
};

export default BrokerPortal;
