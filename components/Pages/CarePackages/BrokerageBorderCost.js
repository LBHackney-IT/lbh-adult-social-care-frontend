import React from 'react';
import { currency } from 'constants/strings';
import { formatNumber, getNumberWithCommas } from 'service';
import { Container } from '../../HackneyDS';

const BrokerageBorderCost = ({ totalCostHeader, totalCost, className = '' }) => {
  const minusSign = totalCost < 0 ? '-' : '';

  return (
    <Container className={`brokerage__border-cost ${className}`} display='flex'>
      <p>{totalCostHeader}</p>
      <p className='lbh-color-dark-red font-weight-bold'>{minusSign}{currency.euro}{getNumberWithCommas(formatNumber(totalCost, { isAbsolute: true }))}</p>
    </Container>
  );
};

export default BrokerageBorderCost;