import React from 'react';
import { currency } from '../../constants/strings';

const PackageCostBox = ({
  boxClass = 'hackney-package-cost-light-yellow-box',
  title = '',
  cost = '',
  className = '',
  costType = '',
  sign = currency.euro,
}) => (
  <div className={`font-size-12px font-weight-bold ${boxClass} ${className}`}>
    <p className="hackney-text-green">{title}</p>
    <p className="font-size-19px item-cost">{`${sign}${cost}`}</p>
    <p className="hackney-text-green">{costType}</p>
  </div>
);

export default PackageCostBox;
