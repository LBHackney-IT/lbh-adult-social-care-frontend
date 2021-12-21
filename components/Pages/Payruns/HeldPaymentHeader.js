import React from 'react';
import { Container, Heading } from 'components';
import { formatNumberToCurrency } from 'service';
import { getHighlightedSearchQuery } from 'service/getHighlightedSearchQuery';

export const HeldPaymentHeader = ({ payRun, searchTerm }) => {
  const { payRunInvoice } = payRun;
  const handleId = () => getHighlightedSearchQuery(payRun.payRunNumber, searchTerm);
  return (
    <Container display="grid" gridTemplateColumns="1.5fr 1.5fr 2fr 1fr 1fr" columnCount={5} columnGap="24px">
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Payrun Number</Heading>
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap">
        <Heading size="s">Supplier</Heading>
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
        {handleId()}
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRunInvoice.supplierName}>
        {payRunInvoice.supplierName}
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRunInvoice.packageType}>
        {payRunInvoice.packageType}
      </Container>
      <Container overflow="hidden" textOverflow="ellipsis" whiteSpace="noWrap" title={payRunInvoice.grossTotal}>
        {formatNumberToCurrency(payRunInvoice.grossTotal)}
      </Container>
      <Container
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="noWrap"
        title={payRunInvoice.hackneyReclaimsTotal}
      >
        {formatNumberToCurrency(payRunInvoice.hackneyReclaimsTotal)}
      </Container>
    </Container>
  );
};
