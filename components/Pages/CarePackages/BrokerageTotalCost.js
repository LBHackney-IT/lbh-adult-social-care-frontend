import React from 'react';
import { getNumberWithPreSign } from 'service';

const BrokerageTotalCost = ({ name, className, value }) => {
  if(!name) return <></>;

  return (
    <p className={className || ''}>
      {`${name}`}
      <span className="lbh-color-dark-red">{getNumberWithPreSign(value)}</span>
    </p>
  );
}

export default BrokerageTotalCost;