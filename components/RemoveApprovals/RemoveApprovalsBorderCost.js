import React from 'react';
import { currency } from '../../constants/strings';
import { Container } from '../HackneyDS/Layout/Container';

const RemoveApprovalsBorderCost = ({ totalCostHeader, totalCost }) => {
  return (
    <Container className='remove-approvals__border-cost' display='flex'>
      <p>{totalCostHeader}</p>
      <p className='text-lbh-f01 font-weight-bold'>{currency.euro}{totalCost}</p>
    </Container>
  );
};

export default RemoveApprovalsBorderCost;