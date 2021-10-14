import React from 'react';
import { Container } from '../../HackneyDS';

const BrokerageSupplierCard = ({ cardInfo, setSelectedItem, actionsComponent, className = '' }) => (
  <Container className={`brokerage__supplier-card ${className}`}>
    <p className="brokerage__supplier-card-name">
      {cardInfo?.supplierName} <span>{cardInfo?.id}</span>
    </p>
    <p className="brokerage__supplier-card-address">{cardInfo?.address}</p>
    {actionsComponent || (
      <p role="presentation" onClick={() => setSelectedItem(cardInfo)} className="link-button hackney-btn-green">
        Select
      </p>
    )}
  </Container>
);

export default BrokerageSupplierCard;
