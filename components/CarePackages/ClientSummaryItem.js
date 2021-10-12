import React from 'react';

const ClientSummaryItem = ({ itemName, itemDetail }) => (
  <p className="client-summary__item">{itemName} <span suppressHydrationWarning>{itemDetail}</span></p>
);

export default ClientSummaryItem;
