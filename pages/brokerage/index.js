import React, { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { useBrokerView } from 'api';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, Button, Container, Heading, HorizontalSeparator } from 'components';
import { getServiceUserPackagesRoute, SERVICE_USER_SEARCH_ROUTE } from 'routes/RouteConstants';
import Loading from 'components/Loading';
import { BrokerPortalFilters } from 'components/Pages/Brokerage/BrokerPortalFilters';
import { BrokerageTable } from 'components/Pages/Brokerage/BrokerageTable';
import AlternativePagination from 'components/AlternativePagination';
import { handleRoleBasedAccess } from '../api/handleRoleBasedAccess';
import { accessRoutes } from '../api/accessMatrix';

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

  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.BROKERAGE)) {
    return {
      redirect: {
        destination: '/401',
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

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Brokerage' }];

const Index = () => {
  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const [filters, setFilters] = useState(initialFilters);
  const { brokerId, dateTo, dateFrom, status, serviceUserName } = filters;

  const params = useMemo(
    () => ({
      fromDate: dateFrom ? dateFrom.toJSON() : null,
      toDate: dateTo ? dateTo.toJSON() : null,
      serviceUserName,
      pageNumber,
      status,
      brokerId,
    }),
    [filters, pageNumber]
  );

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

  const goToServiceUserSearch = useCallback(() => router.push(SERVICE_USER_SEARCH_ROUTE), []);

  return (
    <div className="broker-portal">
      <Loading isLoading={brokerViewLoading} />
      <Container background="#FAFAFA" padding="0 0 60px">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Container display="flex" justifyContent="space-between">
            <Heading size="xl">Brokerage</Heading>
            <Button onClick={goToServiceUserSearch} largeButton>
              Find a service user
            </Button>
          </Container>
          <HorizontalSeparator height="16px" />
          <BrokerPortalFilters title="Index" filters={filters} setFilters={setFilters} clearFilter={clearFilters} />
        </Container>
      </Container>

      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        {packages && <BrokerageTable searchTerm={serviceUserName} onRowClick={handleRowClick} data={packages} />}
        <HorizontalSeparator height="20px" />
        <AlternativePagination
          pageSize={pagingMetaData.pageSize}
          totalPages={pagingMetaData.totalPages}
          currentPage={pageNumber}
          totalCount={pagingMetaData.totalCount}
          changePagination={setPageNumber}
        />
      </Container>
    </div>
  );
};

export default Index;
