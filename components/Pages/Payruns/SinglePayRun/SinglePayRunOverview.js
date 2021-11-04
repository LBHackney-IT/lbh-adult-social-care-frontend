import React from 'react';
import { getNumberWithCommas } from 'service';
import {
  Container,
  Heading,
  HorizontalSeparator,
  Select,
  VerticalSeparator,
} from 'components';

export const SinglePayRunOverview = ({ payRun }) => (
    <>
      <Container display="flex" alignItems="baseline">
        <Heading size="m">{payRun.serviceUserName}</Heading>
        <VerticalSeparator width="24px" />
        <Heading size="s">Invoice ID:</Heading>
        <VerticalSeparator width="5px" />
        {payRun.invoiceId}
      </Container>
      <HorizontalSeparator height="15px" />
      <Container display="flex" alignItems="flex-end" justifyContent="space-between">
        <Container>
          <Container display="flex" alignItems="center">
            <Heading size="s">Supplier:</Heading>
            <VerticalSeparator width="5px" />
            {payRun.supplierId}
          </Container>
          {payRun.supplierName}
        </Container>
        <Container>
          <Heading size="s">Package Type:</Heading>
          {payRun.packageType}
        </Container>
        <Container>
          <Heading size="s">Total Cost:</Heading>£{getNumberWithCommas(payRun.grossTotal)}
        </Container>
        <Select></Select>
      </Container>
    </>
  );
