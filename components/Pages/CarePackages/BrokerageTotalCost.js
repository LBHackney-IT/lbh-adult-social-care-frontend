import React from 'react';
import { getNumberWithPreSign } from 'service';

const BrokerageTotalCost = ({ name, className, value, costColorClass = 'lbh-color-dark-red' }) => {
  if (!name) return null;

  return (
    <p className={className || ''}>
      {`${name}`}
      <span className={costColorClass}>{getNumberWithPreSign(value)}</span>
    </p>
  );
};

export default BrokerageTotalCost;
