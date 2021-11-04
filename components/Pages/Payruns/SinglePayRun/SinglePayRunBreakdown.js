import React from 'react';
import { getNumberWithCommas } from 'service';
import { Container, Heading, HorizontalSeparator, Select, VerticalSeparator } from 'components';
import { format } from 'date-fns';

export const SinglePayRunBreakdown = ({ payRun }) => {
  const { invoiceItems } = payRun;

  return invoiceItems.map((invoice) => (
    <Container margin="0 0 0 16px">
            <Container display="flex" alignItems="baseline">
        <Heading size="s">Package ID</Heading>
        <VerticalSeparator width="10px" />
        {invoice.id}
      </Container>
      <HorizontalSeparator height="10px" />
      <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr">
        <Heading size="m">{invoice.name}</Heading>
        <Heading size="s">Weekly Cost</Heading>
        <Heading size="s">Quantity (Days)</Heading>
        <Heading size="s">Total</Heading>
      </Container>

      <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr">
        <Container>
          {`${format(new Date(invoice.fromDate), 'dd/MM/yyy')} - ${format(new Date(invoice.toDate), 'dd/MM/yyy')}`}
        </Container>
        <Container>
        £{invoice.cost}
        </Container>
        <Container>
        {`${invoice.quantity} (${invoice.period})`}
        </Container>
        <Container>
        £{getNumberWithCommas(invoice.totalCost)}
        </Container>
      </Container>
    </Container>
  ));
};
