import React from 'react';
import { formatNumberToCurrency } from 'service';
import { Container, Heading } from 'components';

export const FundingPerWeek = ({ total }) => (
  <Container
    borderTop="1px solid #bfc1c3"
    borderBottom="1px solid #bfc1c3"
    display="flex"
    flexDirection="column"
    justifyContent="stretch"
  >
    <Container
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px solid #bfc1c3"
      padding="30px 0"
    >
      <Heading size="l">Funding per week</Heading>
      <Heading size="l">{formatNumberToCurrency(total)}</Heading>
    </Container>
  </Container>
);
