import React from 'react';
import { getNumberWithPreSign } from 'service';

export const SummaryCostOfPlacement = ({ costOfPlacement }) => {
  if (!costOfPlacement) return null;

  return (
    <p className="brokerage__cost-of-placement">
      Cost of placement
      <span className="lbh-color-dark-red font-weight-bold">
        {getNumberWithPreSign(costOfPlacement)}
      </span>
    </p>
  );
};