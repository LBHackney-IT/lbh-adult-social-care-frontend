import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, BrokerageHeader, Container, Heading, HorizontalSeparator, Loading } from 'components';
import { useRouter } from 'next/router';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { useInvoiceListView } from 'api/SWR/payRuns';
import AlternativePagination from 'components/AlternativePagination';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';
import { InvoiceFilters } from 'components/Pages/Payruns/SinglePayRun/InvoiceFilters';

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
    }),
    [filters, pageNumber]
  );

  const { data: payRun, isLoading } = useInvoiceListView({ payRunId, params });
  const { payRunItems: payRunData } = payRun;
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

  return (
    <Container>
      <BrokerageHeader />
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
        <Loading isLoading={isLoading} />
        {payRunItems &&
          payRunItems.map((item, index) => (
            <>
              <PayRunItem item={item} index={index} />
              {index < payRunItems.length - 1 && <HorizontalSeparator height="32px" />}
            </>
          ))}
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
