import { currency } from '../../constants/strings';
import React from 'react';

const BrokerageTotalCost = ({ name, className, value }) => {
  const minusSign = value < 0 ? '-' : '';
  return (
    <p key={name} className={className || ''}>
      {`${name}`}
      {value && <span className="text-lbh-f01">{minusSign}{currency.euro}{Math.abs(value)}</span>}
    </p>
  );
}

export default BrokerageTotalCost;