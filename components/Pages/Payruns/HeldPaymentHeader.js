import React from 'react';
import { Container, Heading } from 'components';
import { getNumberWithCommas } from 'service';
import { format } from 'date-fns';

export const HeldPaymentHeader = ({ payRun }) => {
  const { payRunInvoice } = payRun;
  return (
    <Container display="grid" gridTemplateColumns="1.5fr 2fr 1fr 2fr 1fr 1fr" columnCount={5} columnGap="24px">
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Payrun ID</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Supplier</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Created</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Type</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Paid</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Held</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRun.payRunId}>
        {payRun.payRunId}...
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRunInvoice.supplierName}>
        {payRunInvoice.supplierName}
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRun.dateCreated}>
        {format(new Date(payRun.dateCreated), 'dd/MM/yy')}
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRunInvoice.packageType}>
        {payRunInvoice.packageType}
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRunInvoice.grossTotal}>
        £{getNumberWithCommas(payRunInvoice.grossTotal)}
      </Container>
      <Container
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="noWrap"
        title={payRunInvoice.hackneyReclaimsTotal}
      >
        £{getNumberWithCommas(payRunInvoice.hackneyReclaimsTotal)}
      </Container>
    </Container>
  );
};
