import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import withSession from 'lib/session';
import { getLoggedInUser, getNumberWithCommas } from 'service';
import { Breadcrumbs, Container, Heading, HorizontalSeparator, Loading, Table, VerticalSeparator } from 'components';
import { FINANCE_ROUTE } from 'routes/RouteConstants';
import { format } from 'date-fns';
import { usePaymentHistoryView } from 'api';
import AlternativePagination from 'components/AlternativePagination';

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

const PaymentHistory = () => {
  const router = useRouter();
  const { carePackageId } = router.query;
  const { data, isLoading } = usePaymentHistoryView({ carePackageId });

  const [packagePayment, setPackagePayment] = useState();
  const [paymentHistory, setPaymentHistory] = useState([]);

  useEffect(() => {
    if (data) {
      setPackagePayment(data.packagePayment);
      setPaymentHistory(data?.payments?.data);
    }
  }, [data]);
  const breadcrumbs = [
    { text: 'Home', href: '/' },
    { text: 'Finance', href: FINANCE_ROUTE },
  ];

  const columns = [
    {
      Header: 'Period',
      accessor: 'periodTo',
      Cell: ({
        value,
        row: {
          original: { periodFrom },
        },
      }) => <> {`${format(new Date(periodFrom), 'dd/MM/yyy')} - ${format(new Date(value), 'dd/MM/yyy')}`}</>,
    },
    {
      Header: 'Invoice ID',
      accessor: 'invoiceId',
    },
    {
      Header: 'Paid',
      accessor: 'amountPaid',
      Cell: ({ value }) => `£${getNumberWithCommas(value)}`,
    },
  ];
  return (
    <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px 60px">
      <HorizontalSeparator height="10px" />
      <Breadcrumbs values={breadcrumbs} />
      <HorizontalSeparator height="30px" />
      <Loading isLoading={isLoading} />
      <Container background="#FAFAFA" padding="24px 16px">
        {data && (
          <>
            <Heading size="m">{data.serviceUserName}</Heading>
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
              Total paid up to {format(new Date(packagePayment.dateTo), 'dd/MM/yyy')}
              <VerticalSeparator width="10px" />
              <Heading size="m">£{getNumberWithCommas(packagePayment.totalPaid)}</Heading>
            </Container>
          </>
        )}
        <HorizontalSeparator height="20px" />
        {paymentHistory && <Table columns={columns} data={paymentHistory} />}
        <HorizontalSeparator height="30px" />
        <AlternativePagination
          totalPages={3}
          totalCount={30}
          pageSize={10}
          currentPage={1}
          changePagination={() => {}}
        />
      </Container>
    </Container>
  );
};

export default PaymentHistory;
