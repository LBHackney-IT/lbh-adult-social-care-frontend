import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import {
  getCarePackageApprovalRoute,
  getCarePackageReviewRoute,
  SERVICE_USER_SEARCH_ROUTE,
} from 'routes/RouteConstants';
import { PackageApprovals } from 'components';
import { useApprovals } from 'api';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from './api/handleRoleBasedAccess';
import { accessRoutes, userRoles } from './api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.APPROVALS)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const initialFilters = {
  status: '',
  approverId: '',
  dateFrom: null,
  dateTo: null,
  packageType: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
  postcode: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Approvals' }];

const Approvals = ({ roles }) => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const {
    dateFrom,
    dateTo,
    status,
    serviceUserName,
    packageType,
    approverId,
    dateOfBirth,
    postcode,
    lastName,
    hackneyId,
    firstName,
  } = filters;

  const params = useMemo(
    () => ({
      fromDate: dateFrom ? dateFrom.toJSON() : null,
      toDate: dateTo ? dateTo.toJSON() : null,
      serviceUserName,
      approverId,
      packageType,
      pageNumber,
      packageStatus: status,
      firstName,
      lastName,
      hackneyId,
      dateOfBirth: dateOfBirth ? dateOfBirth.toJSON() : null,
      postcode,
    }),
    [filters, pageNumber]
  );

  const { data, isLoading: approvalsLoading } = useApprovals({ params });

  const {
    data: approvals = [],
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
    if (roles.includes(userRoles.ROLE_BROKERAGE_APPROVER)) {
      router.push(getCarePackageApprovalRoute(rowInfo.id));
    } else {
      router.push(getCarePackageReviewRoute(rowInfo.id));
    }
  }, []);

  return (
    <>
      <NewHeader roles={roles ?? []} />
      <PackageApprovals
        title="Approvals"
        breadcrumbs={breadcrumbs}
        loading={approvalsLoading}
        searchTerm={serviceUserName}
        goToSearch={goToBrokerPortalSearch}
        filters={filters}
        clearFilter={clearFilters}
        setFilters={setFilters}
        pageNumber={pageNumber}
        setPageNumber={setPageNumber}
        items={approvals}
        paginationData={pagingMetaData}
        onRowClick={handleRowClick}
      />
    </>
  );
};

export default Approvals;
