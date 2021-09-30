import React from 'react';
import { currency } from '../../constants/strings';
import { Container } from '../HackneyDS';

const BrokerageBorderCost = ({ totalCostHeader, totalCost }) => {
  return (
    <Container className='brokerage__border-cost' display='flex'>
      <p>{totalCostHeader}</p>
      <p className='text-lbh-f01 font-weight-bold'>{currency.euro}{totalCost}</p>
    </Container>
  );
};

export default BrokerageBorderCost;