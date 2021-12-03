import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, Container, Heading, HorizontalSeparator, Loading } from 'components';
import { useRouter } from 'next/router';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { useInvoiceListView, getPayrunInsight } from 'api/SWR/payRuns';
import AlternativePagination from 'components/AlternativePagination';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';
import { InvoiceFilters } from 'components/Pages/Payruns/SinglePayRun/InvoiceFilters';
import { HighLevelInsight } from 'components/Pages/Payruns/HighLevelInsight';

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
  packageType: '',
  invoiceStatus: '',
  searchTerm: '',
  fromDate: null,
  toDate: null,
};

const SinglePayRun = () => {
  const router = useRouter();
  const { guid: payRunId } = router.query;
  const [loading, setLoading] = useState(false);
  const [payRunItems, setPayRunItems] = useState([]);
  const [pagingMetaData, setPagingMetaData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const clearFilters = useCallback(() => setFilters(initialFilters), []);
  const { packageType, invoiceStatus, searchTerm, fromDate, toDate } = filters;
  const params = useMemo(
    () => ({
      packageType,
      invoiceStatus,
      searchTerm,
      fromDate,
      toDate,
      pageNumber,
    }),
    [filters, pageNumber]
  );

  const { data: payRun, isLoading: invoiceLoading, mutate: update } = useInvoiceListView({ payRunId, params });
  const { payRunItems: payRunData } = payRun;

  const { data: insightData, isLoading: insightsIsLoading, mutate: updateInsight } = getPayrunInsight({ payRunId });

  useEffect(() => {
    if (payRunData) {
      setPayRunItems(payRunData.data);
      setPagingMetaData(payRunData.pagingMetaData);
    }
  }, [payRunData]);

  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Finance', href: FINANCE_ROUTE },
    { text: `Pay Run ${payRun?.payRunNumber}` },
  ];

  const updateData = () => {
    update();
    updateInsight();
  };

  const isLoading = invoiceLoading || insightsIsLoading || loading;

  return (
    <Container>
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Heading size="xl">Pay Run {payRun?.payRunNumber}</Heading>
          <HorizontalSeparator height="16px" />
          <InvoiceFilters filters={filters} setFilters={setFilters} clearFilter={clearFilters} />
        </Container>
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px">
        <Loading isLoading={isLoading || insightsIsLoading} />
        {payRunItems &&
          payRunItems.map((item, index) => (
            <>
              <PayRunItem
                payRunId={payRunId}
                searchTerm={searchTerm}
                updateData={updateData}
                item={item}
                index={index}
                update={[1, 2, 3, 4].includes(payRun?.payRunStatus)}
                setLoading={setLoading}
              />
              {index < payRunItems.length - 1 && <HorizontalSeparator height="32px" />}
            </>
          ))}
        <HorizontalSeparator height="32px" />
        {insightData && (
          <HighLevelInsight
            update={updateData}
            payRunId={payRunId}
            holdCount={insightData?.holdsCount}
            holdValue={insightData?.totalHeldAmount}
            difference={insightData?.totalDifferenceFromLastCycle}
            serviceUsers={insightData?.serviceUserCount}
            suppliers={insightData?.supplierCount}
            total={insightData?.totalInvoiceAmount}
            status={insightData?.payRunStatus}
            hasInvoices={!!payRunItems?.length}
            isCedarFileDownloaded={insightData?.isCedarFileDownloaded}
            insightDataLoading={insightsIsLoading}
          />
        )}
        <HorizontalSeparator height="32px" />
        <AlternativePagination
          totalPages={pagingMetaData.totalPages}
          totalCount={pagingMetaData.totalCount}
          pageSize={pagingMetaData.pageSize}
          currentPage={pageNumber}
          changePagination={setPageNumber}
        />
      </Container>
    </Container>
  );
};

export default SinglePayRun;
