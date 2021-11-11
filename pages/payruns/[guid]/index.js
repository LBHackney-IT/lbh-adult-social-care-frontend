import React, { useCallback, useEffect, useMemo, useState } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { Breadcrumbs, Container, Heading, HorizontalSeparator, Loading } from 'components';
import { useRouter } from 'next/router';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { PayrunFilters } from 'components/Pages/Payruns/PayrunFilters';
import { getSinglePayrun } from 'api/SWR/payRuns';
import AlternativePagination from 'components/AlternativePagination';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';

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

const SinglePayRun = () => {
  const router = useRouter();
  const { guid: payRunId } = router.query;
  const { data: payRun, isLoading } = getSinglePayrun({ payRunId });
  const { payRunItems: payRunData } = payRun;
  const [payRunItems, setPayRunItems] = useState([]);
  const [pagingMetaData, setPagingMetaData] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState(initialFilters);
  const clearFilters = useCallback(() => setFilters(initialFilters), []);
  const { invoiceId, dateTo, dateFrom, payRunType, payRunStatus } = filters;
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
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
          <HorizontalSeparator height="10px" />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height="30px" />
          <Heading size="xl">Pay Run {payRun?.payRunNumber}</Heading>
          <HorizontalSeparator height="16px" />
          <PayrunFilters filters={{}} setFilters={{}} clearFilter={{}} />
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
