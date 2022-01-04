import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser, formatNumberToCurrency } from 'service';
import { Breadcrumbs, Container, Heading, HorizontalSeparator, Loading, VerticalSeparator } from 'components';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { format } from 'date-fns';
import { usePaymentHistoryView } from 'api';
import AlternativePagination from 'components/AlternativePagination';
import { PaymentHistoryTable } from 'components/Pages/Payruns/PaymentHistory/PaymentHistoryTable';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes } from '../../api/accessMatrix';

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
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.CARE_PACKAGE_PAYMENT_HISTORY)) {
    return {
      redirect: {
        destination: '/404',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Finance', href: FINANCE_ROUTE },
];

const PaymentHistory = () => {
  const router = useRouter();
  const { guid: packageId } = router.query;
  const [pageNumber, setPageNumber] = useState(1);
  const params = useMemo(
    () => ({
      pageNumber,
    }),
    [pageNumber]
  );
  const { data, isLoading } = usePaymentHistoryView({ params, packageId });
  const [packagePayment, setPackagePayment] = useState();
  const [pagingMetaData, setPagingMetaData] = useState();
  const [paymentHistory, setPaymentHistory] = useState([]);
  useEffect(() => {
    if (data) {
      setPackagePayment(data.packagePayment);
      setPaymentHistory(data?.payments?.data);
      setPagingMetaData(data?.payments?.pagingMetaData);
    }
  }, [data]);

  return (
    <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px 60px">
      <HorizontalSeparator height="10px" />
      <Breadcrumbs values={breadcrumbs} />
      <HorizontalSeparator height="30px" />
      <Loading isLoading={isLoading} />
      {!isLoading && (
        <>
          <Container background="#FAFAFA" padding="24px 16px">
            {data && (
              <>
                <Heading size="m" color="#00664F">
                  {data.serviceUserName}
                </Heading>
                <HorizontalSeparator height="15px" />
                <Container display="grid" gridTemplateColumns="1fr 1fr">
                  <Container display="flex" alignItems="center">
                    <Heading size="s">Supplier: </Heading>
                    <VerticalSeparator width="5px" />
                    {data.supplierId}
                  </Container>
                  <Heading size="s">Package Type</Heading>
                  <p>{data.supplierName}</p>
                  <p>{data.packageTypeName}</p>
                </Container>
              </>
            )}
          </Container>
          <HorizontalSeparator height="30px" />
          <Container background="#FAFAFA" padding="30px 16px">
            {packagePayment && (
              <>
                <Heading size="l">Past Payments</Heading>
                <HorizontalSeparator height="10px" />
                <Container display="flex" alignItems="center">
                  Total paid up to {format(new Date(packagePayment.dateTo), 'dd/MM/yyy')}:
                  <VerticalSeparator width="10px" />
                  <Heading size="m" color="#00664F">
                    {formatNumberToCurrency(packagePayment.totalPaid)}
                  </Heading>
                </Container>
              </>
            )}
            <HorizontalSeparator height="20px" />
            {paymentHistory && <PaymentHistoryTable data={paymentHistory} />}
            <HorizontalSeparator height="30px" />
            {pagingMetaData && (
              <AlternativePagination
                totalPages={pagingMetaData?.totalPages}
                totalCount={pagingMetaData?.totalCount}
                pageSize={pagingMetaData?.pageSize}
                currentPage={pageNumber}
                changePagination={setPageNumber}
              />
            )}
          </Container>
        </>
      )}
    </Container>
  );
};

export default PaymentHistory;
