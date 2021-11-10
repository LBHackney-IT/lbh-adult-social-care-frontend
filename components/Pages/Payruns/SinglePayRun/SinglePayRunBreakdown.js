import React from 'react';
import { getNumberWithCommas } from 'service';
import { Collapse, Container, Heading, HorizontalSeparator, Select, VerticalSeparator } from 'components';
import { format } from 'date-fns';

export const SinglePayRunBreakdown = ({ payRun }) => {
  const { invoiceItems } = payRun;

  return (
    <>
      {invoiceItems.map(
        (invoice) =>
          !invoice.isReclaim && (
            <>
              <HorizontalSeparator height="16px" />
              {invoice.name}
              <HorizontalSeparator height="8px" />
              <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr" >
                <Container>
                  {`${format(new Date(invoice.fromDate), 'dd/MM/yyy')} - ${format(
                    new Date(invoice.toDate),
                    'dd/MM/yyy'
                  )}`}
                </Container>
                <Container>£{invoice.cost}</Container>
                <Container>{`${invoice.quantity} (${invoice.period})`}</Container>
                <Container>£{getNumberWithCommas(invoice.totalCost)}</Container>
              </Container>
              <HorizontalSeparator height="16px" />
              <Container borderBottom="1px solid #DEE0E2" />
            </>
          )
      )}
      <HorizontalSeparator height="16px" />
      <Container display="grid" gridTemplateColumns="4fr 1fr">
        <Heading size="m">Total to pay</Heading>
        <Heading size="m">£{getNumberWithCommas(payRun.netTotal)}</Heading>
      </Container>
      <HorizontalSeparator height="16px" />
      <Container borderBottom="1px solid #DEE0E2" />
      <HorizontalSeparator height="16px" />
      <Collapse
        title={
          <>
            <Heading size="m">Hackney Reclaims</Heading>
            <VerticalSeparator width="20px" />
          </>
        }
      >
        <HorizontalSeparator height="16px" />
        <Container borderBottom="1px solid #DEE0E2" />
        {invoiceItems.map(
          (invoice) =>
            invoice.isReclaim && (
              <>
                <HorizontalSeparator height="16px" />
                {invoice.name}
                <HorizontalSeparator height="8px" />
                <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr">
                  <Container>
                    {`${format(new Date(invoice.fromDate), 'dd/MM/yyy')} - ${format(
                      new Date(invoice.toDate),
                      'dd/MM/yyy'
                    )}`}
                  </Container>
                  <Container>£{invoice.cost}</Container>
                  <Container>{`${invoice.quantity} (${invoice.period})`}</Container>
                  <Container>£{getNumberWithCommas(invoice.totalCost)}</Container>
                </Container>
                <HorizontalSeparator height="16px" />
                <Container borderBottom="1px solid #DEE0E2" />
              </>
            )
        )}
        <HorizontalSeparator height="16px" />
        <Container display="grid" gridTemplateColumns="4fr 1fr">
          <Heading size="m">Sub reclaimed by Hackney</Heading>
          <Heading size="m">£{getNumberWithCommas(payRun.netTotal)}</Heading>
        </Container>
      </Collapse>
    </>
  );
};
