import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { getCarePackageApprovalRoute, SERVICE_USER_SEARCH_ROUTE } from 'routes/RouteConstants';
import { PackageApprovals } from 'components';
import { useSelector } from 'react-redux';
import { useApprovals } from 'api';
import { selectApproversSearch } from '../reducers/approversReducer';

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
  approverId: '',
  dateFrom: null,
  dateTo: null,
  packageType: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Approvals' }];

const Approvals = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);
  const [searchBy, setSearchBy] = useState('default-filters');

  const [filters, setFilters] = useState(initialFilters);
  const { dateFrom, dateTo, status, serviceUserName, packageType, approverId } = filters;
  const { firstName, lastName, hackneyId, dateOfBirth, postcode } = useSelector(selectApproversSearch);

  const params = useMemo(() => {
    if (searchBy === 'default-filters') {
      return {
        fromDate: dateFrom ? dateFrom.toJSON() : null,
        toDate: dateTo ? dateTo.toJSON() : null,
        serviceUserName,
        approverId,
        packageType,
        pageNumber,
        status
      }
    }
    if (searchBy === 'service-user') {
      return {
        pageNumber,
        firstName,
        lastName,
        hackneyId,
        dateOfBirth: dateOfBirth ? dateOfBirth.toJSON() : null,
        postcode,
      }
    }
    return {};
  }, [filters, pageNumber, searchBy]);

  const { data, isLoading: approvalsLoading } = useApprovals({ params, shouldFetch: searchBy });

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
      setSearchBy={setSearchBy}
      title='Approvals'
      breadcrumbs={breadcrumbs}
      loading={approvalsLoading}
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
