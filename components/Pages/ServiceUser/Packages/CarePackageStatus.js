import React from 'react';
import { Container } from 'components';

export const CarePackageStatus = ({ status }) => {
const color = status === 'Active' ? '#00664F' : '#525A5B';
  return (
    <Container color={color} border={`1px solid ${color}`} borderBottom={`1px solid ${color}`} padding="10px" borderRadius="5px">
      {status}
    </Container>
  );
};
