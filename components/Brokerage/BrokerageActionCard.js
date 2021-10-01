import { Container } from '../HackneyDS';
import React from 'react';

const BrokerageActionCard = ({ cardInfo, setSelectedItem, actionsComponent, className = '' }) => {
  const { name, id, address } = cardInfo;
  return (
    <Container className={`brokerage__action-card ${className}`}>
      <p className="brokerage__action-card-name">{name} <span>{id}</span></p>
      <p className="brokerage__action-card-address">{address}</p>
      {actionsComponent ? actionsComponent :
        <p onClick={() => setSelectedItem(cardInfo)} className="link-button hackney-btn-green">Select</p>
      }
    </Container>
  );
};

export default BrokerageActionCard;