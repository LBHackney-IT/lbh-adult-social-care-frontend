import { Container } from '../HackneyDS';
import React from 'react';

const BrokerageContainerHeader = ({ title }) => (
  <Container className="brokerage__container-header brokerage__container">
    <p>Build a care package</p>
    <h2>{title}</h2>
  </Container>
);

export default BrokerageContainerHeader;