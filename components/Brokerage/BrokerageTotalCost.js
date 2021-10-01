import { currency } from '../../constants/strings';
import React from 'react';

const BrokerageTotalCost = ({ name, className, value }) => (
  <p key={name} className={className || ''}>
    {`${name}`}
    <span className="text-lbh-f01">{currency.euro}{value}</span>
  </p>
);

export default BrokerageTotalCost;