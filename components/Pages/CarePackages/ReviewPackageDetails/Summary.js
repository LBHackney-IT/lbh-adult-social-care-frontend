import React, { useMemo } from 'react';
import BrokerageTotalCost from '../BrokerageTotalCost';
import { Container } from '../../../HackneyDS';
import { uniqueID } from '../../../../service';

export const Summary = ({ summaryData }) => {
  if (!summaryData?.costOfPlacement) return null;

  const summary = useMemo(
    () => [
      { id: uniqueID(), key: 'Cost of placement (social care)', value: summaryData.activeCostOfPlacement },
      {
        id: uniqueID(),
        key: summaryData.fncPayment && 'Cost of placement (FNC funded)',
        value: summaryData.fncPayment,
      },
      {
        id: uniqueID(),
        key: 'Total cost of placement',
        value: summaryData.totalCostOfPlacement,
        className: 'brokerage__summary-cost',
      },
      { id: 'additionalWeeklyCost', key: 'Additional weekly cost', value: summaryData.additionalWeeklyCost },
      {
        id: uniqueID(),
        key: summaryData.supplierReclaims?.fnc && 'FNC reclaimed by Supplier',
        value: summaryData.supplierReclaims?.fnc,
      },
      {
        id: uniqueID(),
        key: summaryData.supplierReclaims?.careCharge && 'Care charges reclaimed by Supplier',
        value: summaryData.supplierReclaims?.careCharge,
      },
      {
        id: uniqueID(),
        key: 'Total weekly cost',
        value: summaryData.totalWeeklyCost,
        className: 'brokerage__summary-cost',
      },
      {
        id: uniqueID(),
        key: summaryData.oneOffCost && 'One off cost',
        value: summaryData.oneOffCost,
      },
      {
        id: uniqueID(),
        key: summaryData.oneOffCost && 'Total one of cost',
        value: summaryData.oneOffCost,
        className: 'brokerage__summary-cost',
      },

      {
        id: uniqueID(),
        key: summaryData.hackneyReclaims?.fnc && 'FNC reclaimed by Hackney',
        value: summaryData.hackneyReclaims?.fnc,
      },
      {
        id: uniqueID(),
        key: summaryData.hackneyReclaims?.careCharge && 'Care Charges collected from service user',
        value: summaryData.hackneyReclaims?.careCharge,
      },
      {
        id: uniqueID(),
        key: summaryData.hackneyReclaims?.subTotal && 'Total reclaim',
        value: summaryData.hackneyReclaims?.subTotal,
        className: 'brokerage__summary-cost',
      },
    ],
    [summaryData]
  );

  return (
    <Container className="review-package-details__summary">
      <h3 id="summary" className="font-weight-bold">
        Summary
      </h3>
      {summary.map(({ key, id, value, className: itemClassName }) => (
        <BrokerageTotalCost
          costColorClass="lbh-color-black"
          key={id}
          value={value}
          name={key}
          className={itemClassName}
        />
      ))}
    </Container>
  );
};
