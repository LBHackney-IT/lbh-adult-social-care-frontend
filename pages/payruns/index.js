import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, Button, Container, Heading, HorizontalSeparator, Loading, Tab, Tabs } from 'components';
import { PayrunFilters } from 'components/Pages/Payruns/PayrunFilters';
import AlternativePagination from 'components/AlternativePagination';
import { PayrunList } from 'components/Pages/Payruns/PayrunList';
import { usePayrunView } from 'api/SWR/payRuns';
import CreateDraftPayRun from '../../components/Pages/Finance/CreateDraftPayRun';

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
  payRunId: '',
  dateFrom: null,
  dateTo: null,
  payRunType: '',
  payRunStatus: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Finance' }];
const tabs = ['Pay Runs', 'Held Payments'];

const Payruns = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const clearFilters = useCallback(() => setFilters(initialFilters), []);
  const { payRunId, dateTo, dateFrom, payRunType, payRunStatus } = filters;
  const params = useMemo(
    () => ({
      dateTo,
      dateFrom,
      payRunId,
      pageNumber,
      payRunType,
      payRunStatus,
    }),
    [filters, pageNumber]
  );
  const { data, isLoading } = usePayrunView({ params });

  const {
    data: payrunData,
    pagingMetaData = {
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
    },
  } = data;

  return (
    <Container>
      <CreateDraftPayRun isOpened={isOpenedModal} setIsOpened={setIsOpenedModal} />
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Container display="flex" justifyContent="space-between">
            <Heading size="xl">Pay Runs</Heading>
            <Button onClick={() => setIsOpenedModal(true)} largeButton>
              New pay run
            </Button>
          </Container>
          <HorizontalSeparator height="16px" />
          <PayrunFilters filters={filters} setFilters={setFilters} clearFilter={clearFilters} />
        </Container>
      </Container>
      <HorizontalSeparator height="30px" />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        <Tabs tabs={tabs}>
          <Tab>
            <Loading className="loading" isLoading={isLoading} />
            <PayrunList searchTerm={payRunId} data={payrunData} />
            <HorizontalSeparator height="30px" />
            {pageNumber && (
              <AlternativePagination
                totalPages={pagingMetaData.totalPages}
                totalCount={pagingMetaData.totalCount}
                pageSize={pagingMetaData.pageSize}
                currentPage={pageNumber}
                changePagination={setPageNumber}
              />
            )}
          </Tab>
          <Tab>
            <Loading className="loading" isLoading={isLoading} />
            <PayrunList searchTerm={payRunId} data={payrunData} />
            <HorizontalSeparator height="30px" />
            {pageNumber && (
              <AlternativePagination
                totalPages={pagingMetaData.totalPages}
                totalCount={pagingMetaData.totalCount}
                pageSize={pagingMetaData.pageSize}
                currentPage={pageNumber}
                changePagination={setPageNumber}
              />
            )}
          </Tab>
        </Tabs>
      </Container>
    </Container>
  );
};

export default Payruns;
