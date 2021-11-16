import React, { useState } from 'react';
import {
  Collapse,
  Container,
  Heading,
  HoldPaymentDialog,
  HorizontalSeparator,
  Link,
  VerticalSeparator,
} from 'components';
import { SinglePayRunOverview } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunOverview';
import { SinglePayRunBreakdown } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunBreakdown';
import { useRouter } from 'next/router';
import { getCarePackageReviewRoute, getPaymentHistoryRoute } from 'routes/RouteConstants';

export const PayRunItem = ({ searchTerm, payRunId, item, update, totalPayTitle }) => {
  if (!item) return null;

  const [invoiceId, setInvoiceId] = useState('');

  const router = useRouter();
  const handleClick = (e) => {
    e.preventDefault();
    router.push(getCarePackageReviewRoute(item.carePackageId));
  };

  const handlePastPaymentsClick = (e) => {
    e.preventDefault();
    router.push(getPaymentHistoryRoute(item.carePackageId));
  };

  return (
    <>
      <Container background="#FAFAFA" padding="24px 16px">
        <SinglePayRunOverview
          payRunId={payRunId}
          update={update}
          searchTerm={searchTerm}
          setInvoiceId={setInvoiceId}
          payRun={item}
        />
        <HorizontalSeparator height="15px" />
        <Collapse>
          <HorizontalSeparator height="40px" />
          <Container margin="0 0 0 16px">
            <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr">
              <Heading size="m">{item.packageType}</Heading>
              <Heading size="s">Weekly Cost</Heading>
              <Heading size="s">Quantity (Days)</Heading>
              <Container textAlign="right">
                <Heading size="s">Total</Heading>
              </Container>
            </Container>
            <HorizontalSeparator height="10px" />
            <Container display="flex" alignItems="baseline">
              <Heading size="s">Package ID</Heading>
              <VerticalSeparator width="10px" />
              {item.carePackageId}
            </Container>
            <SinglePayRunBreakdown totalPayTitle={totalPayTitle} payRun={item} />
            <HorizontalSeparator height="16px" />
            <Container borderBottom="1px solid #DEE0E2" />
            <HorizontalSeparator height="10px" />
            <Container display="grid" gridTemplateColumns="4fr 1fr">
              <Container display="flex">
                {payRunId && (
                  <Link onClick={(e) => handleClick(e)} noVisited>
                    View package summary
                  </Link>
                )}
                {payRunId && <VerticalSeparator width="32px" />}
                Assigned broker: {item.assignedBrokerName.toString()}
              </Container>
              {payRunId && (
                <Link onClick={(e) => handlePastPaymentsClick(e)} noVisited>
                  Past payments
                </Link>
              )}
            </Container>
          </Container>
        </Collapse>
      </Container>
      {payRunId && (
        <HoldPaymentDialog
          invoiceId={invoiceId}
          payRunId={payRunId}
          isOpen={invoiceId}
          update={update}
          setIsOpened={() => setInvoiceId('')}
        />
      )}
    </>
  );
};
