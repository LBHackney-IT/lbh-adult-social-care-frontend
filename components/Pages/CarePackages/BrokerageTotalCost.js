import React from 'react';
import { currency } from 'constants/strings';
import { formatNumber, getNumberWithCommas } from 'service';

const BrokerageTotalCost = ({ name, className, value }) => {
  if(!name) return <></>;

  const minusSign = value < 0 ? '-' : '';
  return (
    <p className={className || ''}>
      {`${name}`}
      <span className="lbh-color-dark-red">{minusSign}{currency.euro}{getNumberWithCommas(formatNumber(value, { isAbsolute: true }))}</span>
    </p>
  );
}

export default BrokerageTotalCost;