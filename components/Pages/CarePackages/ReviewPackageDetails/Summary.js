import React, { useMemo } from 'react';
import BrokerageTotalCost from '../BrokerageTotalCost';
import { Container } from '../../../HackneyDS';

export const Summary = ({ isHide, summaryData }) => {
  if (!summaryData?.costOfPlacement) return null;

  const summary = useMemo(() => [
    { key: 'Cost of placement (social care)', value: summaryData.costOfPlacement },
    { key: summaryData.fncPayment && 'Cost of placement (FNC funded) ', value: summaryData.fncPayment },
    {
      key: 'Total cost of placement',
      value: summaryData.subTotalCost,
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
      key: summaryData.additionalOneOffCost && 'One off cost',
      value: summaryData.additionalOneOffCost,
    },
    {
      key: summaryData.additionalOneOffCost && 'Total one of cost',
      value: summaryData.additionalOneOffCost,
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
      key: summaryData.hackneyReclaimssubTotal && 'Total reclaim',
      value: summaryData.hackneyReclaimssubTotal,
      className: 'brokerage__summary-cost',
    },
  ], [summaryData]);

  return (
    <Container className="review-package-details__summary">
      <h3 id="summary" className="font-weight-bold">
        Summary
      </h3>
      {summary.map(({ key, value, className: itemClassName, checkHide }) => {
        if (checkHide && isHide()) return null;

        return <BrokerageTotalCost costColorClass='lbh-color-black' key={key} value={value} name={key} className={itemClassName} />;
      })}
    </Container>
  );
}