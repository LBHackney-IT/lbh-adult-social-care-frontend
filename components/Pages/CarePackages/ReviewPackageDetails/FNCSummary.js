import React from 'react';
import { HorizontalSeparator } from '../../../HackneyDS';

const fundedNursingCareClaimCollector = {
  2: 'Hackney Council (gross/net)',
  1: 'Supplier (gross/net)',
};

export const FNCSummary = ({ containerId, assessmentFileName, claimCollector }) => {
  if (containerId !== 'funded-nursing-care') return null;

  return (
    <>
      <p>
        <span className="font-weight-bold">FNC assessment been carried out: </span>
        {assessmentFileName ? 'Yes' : 'No'}
      </p>
      <HorizontalSeparator height={8} />
      <p>
        <span className="font-weight-bold">Collected by: </span>
        {fundedNursingCareClaimCollector[claimCollector]}
      </p>
      <HorizontalSeparator height={8} />
      <p className="mb-3">
        <span className="font-weight-bold">FNC assessment: </span>
        <span className="link-button">View</span>
      </p>
    </>
  );
};