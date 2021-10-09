import { Container } from '../HackneyDS';
import React from 'react';

const BrokerageSupplierCard = ({ cardInfo, setSelectedItem, actionsComponent, className = '' }) => {
  return (
    <Container className={`brokerage__supplier-card ${className}`}>
      <p className="brokerage__supplier-card-name">{cardInfo?.supplierName} <span>{cardInfo?.id}</span></p>
      <p className="brokerage__supplier-card-address">{cardInfo?.address}</p>
      {actionsComponent ? actionsComponent :
        <p onClick={() => setSelectedItem(cardInfo)} className="link-button hackney-btn-green">Select</p>
      }
    </Container>
  );
};

export default BrokerageSupplierCard;