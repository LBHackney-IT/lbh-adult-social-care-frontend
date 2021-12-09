import React from 'react';
import { Container } from '../../../HackneyDS';
import BrokerageBorderCost from '../BrokerageBorderCost';

export const SummaryTotalCostInfo = ({ totalCostInfo }) => {
  if (!totalCostInfo) return null;

  return (
    <Container
      className={totalCostInfo?.supplier && totalCostInfo?.hackney ? 'single-border-cost' : ''}
    >
      {!!totalCostInfo?.hackney && (
        <BrokerageBorderCost
          totalCost={totalCostInfo?.hackney.toFixed(2)}
          totalCostHeader="Total (Gross)"
        />
      )}
      {!!totalCostInfo?.supplier && (
        <BrokerageBorderCost
          totalCost={totalCostInfo?.supplier.toFixed(2)}
          totalCostHeader="Total (Net Off)"
        />
      )}
    </Container>
  );
};