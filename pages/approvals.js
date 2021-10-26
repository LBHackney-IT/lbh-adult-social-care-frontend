import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useBrokerView } from 'api';
import { getLoggedInUser } from 'service';
import { getCarePackageApprovalRoute, SERVICE_USER_SEARCH_ROUTE } from 'routes/RouteConstants';
import { PackageApprovals } from 'components';

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
  approver: '',
  dateFrom: null,
  dateTo: null,
  packageType: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Approvals' }];

const Approvals = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const { dateFrom, dateTo, status, serviceUserName, packageType, approver } = filters;

  const params = useMemo(() => ({
    fromDate: dateFrom ? dateFrom.toJSON() : null,
    toDate: dateTo ? dateTo.toJSON() : null,
    serviceUserName,
    approver,
    packageType,
    pageNumber,
    status
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

  const goToBrokerPortalSearch = useCallback(() => {
    router.push(SERVICE_USER_SEARCH_ROUTE);
  }, []);

  const clearFilters = useCallback(() => setFilters(initialFilters), []);

  const handleRowClick = useCallback((rowInfo) => {
    router.push(getCarePackageApprovalRoute(rowInfo.packageId));
  }, []);

  return (
    <PackageApprovals
      title='Approvals'
      breadcrumbs={breadcrumbs}
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

export default Approvals;
