import React from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { CarePackageBreadcrumbs, Container, HorizontalSeparator, Loading } from 'components';
import { getEnGBFormattedDate, usePayRunInvoice } from 'api';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';
import { useRouter } from 'next/router';

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

const dateFrom = new Date();
const dateTo = new Date(dateFrom.getTime() + 999999999);

const InvoiceDetailPage = () => {
  const router = useRouter();
  const { guid: payRunId, id: invoiceId } = router.query;
  const { data: invoice, isLoading } = usePayRunInvoice(payRunId, invoiceId);

  const goBack = () => router.back();

  return (
    <Container className="invoice-detail">
      <CarePackageBreadcrumbs />
      <Loading isLoading={isLoading} />
      <Container className="default-container invoice-detail__main-container">
        <p onClick={goBack} className="link-button green">Back</p>
        <HorizontalSeparator height={50} />
        <h3 className="invoice-detail--title">Pay run period</h3>
        <p
          className="invoice-detail--sub-title">{getEnGBFormattedDate(dateFrom)}{dateTo ? ` - ${getEnGBFormattedDate(dateTo)}` : ''}</p>
        <HorizontalSeparator height={24} />
        <PayRunItem totalPayTitle="Total paid" item={invoice?.invoice} />
        <HorizontalSeparator height="32px" />
      </Container>
    </Container>
  );
};

export default InvoiceDetailPage;