import React, { useMemo } from 'react';
import BrokerageTotalCost from '../BrokerageTotalCost';
import { Container } from '../../../HackneyDS';

export const Summary = ({ summaryData }) => {
  if (!summaryData?.costOfPlacement) return null;

  const summary = useMemo(() => [
    { key: 'Cost of placement (social care)', value: summaryData.costOfPlacement },
    { key: summaryData.fncPayment && 'Cost of placement (FNC funded)', value: summaryData.fncPayment },
    {
      key: 'Total cost of placement',
      value: summaryData.totalCostOfPlacement,
      className: 'brokerage__summary-cost',
    },
    { id: 'additionalWeeklyCost', key: 'Additional weekly cost', value: summaryData.additionalWeeklyCost },
    {
      key: summaryData.supplierReclaims?.fnc && 'FNC reclaimed by Supplier',
      value: summaryData.supplierReclaims?.fnc
    },
    {
      key: summaryData.supplierReclaims?.careCharge && 'Care charges reclaimed by Supplier',
      value: summaryData.supplierReclaims?.careCharge,
    },
    {
      key: 'Total weekly cost',
      value: summaryData.totalWeeklyCost,
      className: 'brokerage__summary-cost',
    },
    {
      key: summaryData.oneOffCost && 'One off cost',
      value: summaryData.oneOffCost,
    },
    {
      key: summaryData.oneOffCost && 'Total one of cost',
      value: summaryData.oneOffCost,
      className: 'brokerage__summary-cost',
    },

    {
      key: summaryData.hackneyReclaims?.fnc && 'FNC reclaimed by Hackney',
      value: summaryData.hackneyReclaims?.fnc,
    },
    {
      key: summaryData.hackneyReclaims?.careCharge && 'Care Charges collected from service user',
      value: summaryData.hackneyReclaims?.careCharge,
    },
    {
      key: summaryData.hackneyReclaims?.subTotal && 'Total reclaim',
      value: summaryData.hackneyReclaims?.subTotal,
      className: 'brokerage__summary-cost',
    },
  ], [summaryData]);

  return (
    <Container className="review-package-details__summary">
      <h3 id="summary" className="font-weight-bold">
        Summary
      </h3>
      {summary.map(({ key, value, className: itemClassName }) =>
        <BrokerageTotalCost
          costColorClass='lbh-color-black'
          key={key}
          value={value}
          name={key}
          className={itemClassName}
        />
      )}
    </Container>
  );
}