import React from 'react';
import { currency } from '../../constants/strings';
import { Container } from '../HackneyDS';

const BrokerageBorderCost = ({ totalCostHeader, totalCost }) => {
  const minusSign = totalCost < 0 ? '-' : '';

  return (
    <Container className='brokerage__border-cost' display='flex'>
      <p>{totalCostHeader}</p>
      <p className='text-lbh-f01 font-weight-bold'>{minusSign}{currency.euro}{totalCost ? Math.abs(totalCost).toFixed(2) : 0}</p>
    </Container>
  );
};

export default BrokerageBorderCost;