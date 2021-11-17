import React, { useMemo } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { DynamicBreadcrumbs, Container, HorizontalSeparator, Loading, Heading, Hint } from 'components';
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

const InvoiceDetailPage = () => {
  const router = useRouter();
  const { guid: payRunId, id: invoiceId } = router.query;
  const { data: invoice, isLoading } = usePayRunInvoice(payRunId, invoiceId);

  const breadcrumbs = useMemo(() => [{ text: `Pay Run ${payRunId}`}], [payRunId]);

  return (
    <Container className="invoice-detail">
      <DynamicBreadcrumbs additionalBreadcrumbs={breadcrumbs} />
      <Loading isLoading={isLoading} />
      <Container className="default-container invoice-detail__main-container">
        <Heading size='xl'>Pay run period</Heading>
        <HorizontalSeparator height={9} />
        <Hint className='hint-date'>
          {getEnGBFormattedDate(invoice.startDate)}{invoice.endDate ? ` - ${getEnGBFormattedDate(invoice.endDate)}` : ''}
        </Hint>
        <HorizontalSeparator height={24} />
        <PayRunItem totalPayTitle="Total paid" item={invoice?.invoice} />
        <HorizontalSeparator height="32px" />
      </Container>
    </Container>
  );
};

export default InvoiceDetailPage;