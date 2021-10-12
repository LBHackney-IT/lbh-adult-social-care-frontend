import { currency } from '../../constants/strings';
import React from 'react';

const BrokerageTotalCost = ({ name, className, value }) => {
  if(!name) return <></>;

  const minusSign = value < 0 ? '-' : '';
  return (
    <p className={className || ''}>
      {`${name}`}
      <span className="text-lbh-f01">{minusSign}{currency.euro}{value ? Math.abs(value) : 0}</span>
    </p>
  );
}

export default BrokerageTotalCost;