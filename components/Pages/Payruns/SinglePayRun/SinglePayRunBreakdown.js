import React from 'react';
import { formatNumberToCurrency } from 'service';
import { Collapse, Container, Heading, HorizontalSeparator } from 'components';
import { format } from 'date-fns';

export const SinglePayRunBreakdown = ({ payRun, totalPayTitle = 'Total to pay' }) => {
  const { invoiceItems } = payRun;
  return (
    <>
      {invoiceItems &&
        invoiceItems?.map(
          (invoice) =>
            !invoice.isReclaim && (
              <React.Fragment key={invoice.id}>
                <HorizontalSeparator height="16px" />
                {invoice.name}
                <HorizontalSeparator height="8px" />
                <Container display="grid" gridTemplateColumns="2fr 1fr 1.5fr 1fr">
                  <Container>
                    {`${format(new Date(invoice.fromDate), 'dd/MM/yyy')} - ${format(
                      new Date(invoice.toDate),
                      'dd/MM/yyy'
                    )}`}
                  </Container>
                  <Container>{formatNumberToCurrency(invoice.cost)}</Container>
                  <Container>{`${invoice.quantity} (${invoice.period})`}</Container>
                  <Container textAlign="right">{formatNumberToCurrency(invoice.totalCost)}</Container>
                </Container>
                <HorizontalSeparator height="16px" />
                <Container borderBottom="1px solid #DEE0E2" />
              </React.Fragment>
            )
        )}
      <HorizontalSeparator height="16px" />
      <Container display="grid" gridTemplateColumns="4fr 1fr">
        <Heading size="m">{totalPayTitle}</Heading>
        <Container textAlign="right">
          <Heading size="m">{formatNumberToCurrency(payRun.grossTotal)}</Heading>
        </Container>
      </Container>
      <HorizontalSeparator height="16px" />
      <Container borderBottom="1px solid #DEE0E2" />
      <HorizontalSeparator height="16px" />
      <Collapse title={<Heading size="m">Reclaims</Heading>}>
        <HorizontalSeparator height="16px" />
        <Container borderBottom="1px solid #DEE0E2" />
        {invoiceItems?.map(
          (invoice) =>
            invoice.isReclaim && (
              <React.Fragment key={invoice.id}>
                <HorizontalSeparator height="16px" />
                {invoice.name}
                <HorizontalSeparator height="8px" />
                <Container display="grid" gridTemplateColumns="2fr 1fr 1.5fr 1fr">
                  <Container>
                    {`${format(new Date(invoice.fromDate), 'dd/MM/yyy')} - ${format(
                      new Date(invoice.toDate),
                      'dd/MM/yyy'
                    )}`}
                  </Container>
                  <Container>£{invoice.cost}</Container>
                  <Container>{`${invoice.quantity} (${invoice.period})`}</Container>
                  <Container textAlign="right">{formatNumberToCurrency(invoice.totalCost)}</Container>
                </Container>
                <HorizontalSeparator height="16px" />
                <Container borderBottom="1px solid #DEE0E2" />
              </React.Fragment>
            )
        )}
        <HorizontalSeparator height="16px" />
        <Container display="grid" gridTemplateColumns="4fr 1fr">
          <Heading size="m">Sub reclaimed by Hackney</Heading>
          <Container textAlign="right">
            <Heading size="m">{formatNumberToCurrency(payRun.hackneyReclaimsTotal)}</Heading>
          </Container>
        </Container>
        <HorizontalSeparator height="16px" />
        <Container borderBottom="1px solid #DEE0E2" />
        <HorizontalSeparator height="16px" />
        <Container display="grid" gridTemplateColumns="4fr 1fr">
          <Heading size="m">Sub reclaimed by Supplier</Heading>
          <Container textAlign="right">
            <Heading size="m">{formatNumberToCurrency(payRun.supplierReclaimsTotal)}</Heading>
          </Container>
        </Container>
      </Collapse>
    </>
  );
};
