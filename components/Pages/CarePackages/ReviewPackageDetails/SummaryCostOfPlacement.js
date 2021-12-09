import React from 'react';
import { currency } from 'constants/strings';

export const SummaryCostOfPlacement = ({ costOfPlacement }) => {
  if (!costOfPlacement) return null;

  return (
    <p className="brokerage__cost-of-placement">
      Cost of placement
      <span className="lbh-color-dark-red font-weight-bold">
                          {currency.euro}
        {costOfPlacement.toFixed(2)}
                        </span>
    </p>
  );
};