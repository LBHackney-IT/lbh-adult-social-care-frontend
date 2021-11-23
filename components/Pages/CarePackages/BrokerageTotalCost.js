import React from 'react';
import { currency } from 'constants/strings';

const BrokerageTotalCost = ({ name, className, value }) => {
  if(!name) return <></>;

  const minusSign = value < 0 ? '-' : '';
  return (
    <p className={className || ''}>
      {`${name}`}
      <span className="lbh-color-dark-red font-weight-bold">{minusSign}{currency.euro}{value ? Math.abs(value).toFixed(2) : 0}</span>
    </p>
  );
}

export default BrokerageTotalCost;