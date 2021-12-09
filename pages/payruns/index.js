import React, { useCallback, useMemo, useState } from 'react';
import { Breadcrumbs, Button, Container, Heading, HorizontalSeparator, Loading, Tab, Tabs } from 'components';
import { PayrunFilters } from 'components/Pages/Payruns/PayrunFilters';
import AlternativePagination from 'components/AlternativePagination';
import { PayrunList } from 'components/Pages/Payruns/PayrunList';
import { useHeldPaymentsView, usePayrunView } from 'api/SWR/payRuns';
import { HeldPaymentsList } from 'components/Pages/Payruns/HeldPaymentsList';
import CreatePayRunModal from 'components/Pages/Payruns/CreatePayRunModal/CreatePayRunModal';
import { useServerSideProps } from 'routes/RouteConstants';

export const getServerSideProps = useServerSideProps();

const initialFilters = {
  searchTerm: '',
  dateFrom: null,
  dateTo: null,
  payRunType: '',
  payRunStatus: '',
};

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Finance' }];
const tabs = ['Pay Runs', 'Held Payments', 'Awaiting Approval', 'Approved'];

const Payruns = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [heldPageNumber, setHeldPageNumber] = useState(1);
  const [tabView, setTabView] = useState(tabs[0]);
  const [isOpenedModal, setIsOpenedModal] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const clearFilters = useCallback(() => setFilters(initialFilters), []);
  const { searchTerm, dateTo, dateFrom, payRunType, payRunStatus } = filters;
  const params = useMemo(
    () => ({
      dateTo,
      dateFrom,
      searchTerm,
      pageNumber,
      heldPageNumber,
      payRunType,
      payRunStatus:
      // eslint-disable-next-line no-nested-ternary
        tabView === 'Awaiting Approval' ? 'WaitingForApproval' : tabView === 'Approved' ? 'Approved' : payRunStatus,
    }),
    [filters, pageNumber, heldPageNumber, tabView]
  );
  const { data, isLoading, mutate: update } = usePayrunView({ params });
  const { data: hData, isLoading: isHeldLoading, mutate: updateHeldData } = useHeldPaymentsView({ params });

  const {
    data: payrunData,
    pagingMetaData = {
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
    },
  } = data;

  const {
    data: heldData,
    pagingMetaData: heldPagingMetaData = {
      totalCount: 0,
      totalPages: 0,
      pageSize: 0,
    },
  } = hData;

  const updateAllPayruns = () => {
    update();
    updateHeldData();
  };
  return (
    <Container>
      <CreatePayRunModal isOpen={isOpenedModal} onClose={() => setIsOpenedModal(false)} update={update} />
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
          <PayrunFilters filters={filters} setFilters={setFilters} clearFilter={clearFilters} tabView={tabView} />
        </Container>
      </Container>
      <HorizontalSeparator height="30px" />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        <Tabs tabs={tabs} callback={(index) => setTabView(tabs[index])}>
          <Tab>
            <Loading className="loading" isLoading={isLoading} />
            <PayrunList searchTerm={searchTerm} data={payrunData} />
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
            <Loading className="loading" isLoading={isHeldLoading} />
            <HeldPaymentsList data={heldData} searchTerm={searchTerm} update={updateAllPayruns} />
            <HorizontalSeparator height="30px" />
            {pageNumber && (
              <AlternativePagination
                totalPages={heldPagingMetaData.totalPages}
                totalCount={heldPagingMetaData.totalCount}
                pageSize={heldPagingMetaData.pageSize}
                currentPage={heldPageNumber}
                changePagination={setHeldPageNumber}
              />
            )}
          </Tab>
          <Tab>
            <Loading className="loading" isLoading={isLoading} />
            <PayrunList searchTerm={searchTerm} data={payrunData} />
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
            <PayrunList searchTerm={searchTerm} data={payrunData} />
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
