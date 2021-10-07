import { Container } from '../HackneyDS';
import React from 'react';

const BrokerageSupplierCard = ({ cardInfo, setSelectedItem, actionsComponent, className = '' }) => {
  const { name, id, address } = cardInfo;
  return (
    <Container className={`brokerage__supplier-card ${className}`}>
      <p className="brokerage__supplier-card-name">{name} <span>{id}</span></p>
      <p className="brokerage__supplier-card-address">{address}</p>
      {actionsComponent ? actionsComponent :
        <p onClick={() => setSelectedItem(cardInfo)} className="link-button hackney-btn-green">Select</p>
      }
    </Container>
  );
};

export default BrokerageSupplierCard;