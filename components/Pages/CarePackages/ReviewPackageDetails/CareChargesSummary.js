import React from 'react';
import { HorizontalSeparator } from '../../../HackneyDS';

const careChargesClaimCollector = {
  2: 'Hackney Council (gross)',
  1: 'Supplier (net)',
};

export const CareChargesSummary = ({ containerId, claimCollector, subTypeName, collectingReasonLabel }) => {
  const careChargeClaimCollector = careChargesClaimCollector?.[claimCollector];

  if (!(containerId === 'care-charges' && careChargeClaimCollector)) return null;


  return (
    <>
      <p>
        <span className="font-weight-bold">{subTypeName} (pre-assessement)</span>
      </p>
      <HorizontalSeparator height={8} />
      {careChargeClaimCollector && (
        <p>
          <span className="font-weight-bold">Collected by: </span>
          {careChargeClaimCollector}
        </p>
      )}
      <HorizontalSeparator height={8} />
      {collectingReasonLabel && (
        <>
          <p className="font-weight-bold">Why is Hackney collecting these care charges: </p>
          <p className="mb-3">{collectingReasonLabel}</p>
        </>
      )}
    </>
  )
}