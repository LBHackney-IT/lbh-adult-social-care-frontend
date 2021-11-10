import React from 'react';
import { Collapse, Container, Heading, HorizontalSeparator, Link, VerticalSeparator } from 'components';
import { SinglePayRunOverview } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunOverview';
import { SinglePayRunBreakdown } from 'components/Pages/Payruns/SinglePayRun/SinglePayRunBreakdown';

export const PayRunItem = ({ item }) => (
  <Container background="#FAFAFA" padding="24px 16px">
    <SinglePayRunOverview payRun={item} />
    <HorizontalSeparator height="15px" />
    <Collapse>
      <HorizontalSeparator height="40px" />
      <Container margin="0 0 0 16px">
        <Container display="grid" gridTemplateColumns="2fr 1fr 1fr 1fr">
          <Heading size="m">{item.packageType}</Heading>
          <Heading size="s">Weekly Cost</Heading>
          <Heading size="s">Quantity (Days)</Heading>
          <Heading size="s">Total</Heading>
        </Container>
        <HorizontalSeparator height="10px" />
        <Container display="flex" alignItems="baseline">
          <Heading size="s">Package ID</Heading>
          <VerticalSeparator width="10px" />
          {item.carePackageId}
        </Container>
        <SinglePayRunBreakdown payRun={item} />
        <HorizontalSeparator height="16px" />
        <Container borderBottom="1px solid #DEE0E2" />
        <HorizontalSeparator height="10px" />
        <Container display="grid" gridTemplateColumns="4fr 1fr">
          <Container display="flex">
            <Link noVisited>View package summary</Link>
            <VerticalSeparator width="32px" />
            Assigned broker: {item.assignedBrokerName}
          </Container>
          <Link noVisited>Past payments</Link>
        </Container>
      </Container>
    </Collapse>
  </Container>
);
