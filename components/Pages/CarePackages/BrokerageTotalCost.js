import React from 'react';
import { currency } from 'constants/strings';
import { formatNumber, getNumberWithCommas } from 'service';

const BrokerageTotalCost = ({ name, className, value }) => {
  if(!name) return <></>;

  const minusSign = value < 0 ? '-' : '';
  return (
    <p className={className || ''}>
      {`${name}`}
      <span className="text-lbh-f01">{minusSign}{currency.euro}{getNumberWithCommas(formatNumber(value))}</span>
    </p>
  );
}

export default BrokerageTotalCost;