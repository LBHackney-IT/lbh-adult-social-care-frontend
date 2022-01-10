import React, { useMemo } from 'react';
import withSession from 'lib/session';
import { getLoggedInUser } from 'service';
import { DynamicBreadcrumbs, Container, HorizontalSeparator, Loading, Heading, Hint } from 'components';
import { getEnGBFormattedDate, usePayRunInvoice } from 'api';
import { PayRunItem } from 'components/Pages/Payruns/SinglePayRun/PayRunItem';
import { useRouter } from 'next/router';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../../api/handleRoleBasedAccess';
import { accessRoutes } from '../../../api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.PAYRUNS_GUID_INVOICE_ID)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const InvoiceDetailPage = ({ roles }) => {
  const router = useRouter();
  const { guid: payRunId, id: invoiceId } = router.query;
  const { data: invoice, isLoading } = usePayRunInvoice(payRunId, invoiceId);
  const breadcrumbs = useMemo(() => [{ text: `Pay Run ${invoice?.payRunNumber ?? payRunId}` }], [payRunId, invoice]);

  return (
    <>
      <NewHeader roles={roles ?? []} />
      <Container className="invoice-detail">
        <DynamicBreadcrumbs additionalBreadcrumbs={breadcrumbs} />
        <Loading isLoading={isLoading} />
        <Container className="default-container invoice-detail__main-container">
          <Heading size="xl">Pay run period</Heading>
          <HorizontalSeparator height={9} />
          <Hint className="hint-date">
            {getEnGBFormattedDate(invoice.startDate)}
            {invoice.endDate ? ` - ${getEnGBFormattedDate(invoice.endDate)}` : ''}
          </Hint>
          <HorizontalSeparator height={24} />
          <PayRunItem totalPayTitle="Total paid" item={invoice?.invoice} />
          <HorizontalSeparator height="32px" />
        </Container>
      </Container>
    </>
  );
};

export default InvoiceDetailPage;
