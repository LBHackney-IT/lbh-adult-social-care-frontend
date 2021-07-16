import React from 'react';
import { currency } from '../constants/strings';

const CostCard = ({ selected = false, title = 'TOTAL / WK', price = '1892', status = 'ESTIMATE' }) => (
  <div className={`cost-card total-container${selected ? ' cost-card_selected' : ''}`}>
    <p className="title">{title}</p>
    <p className="price">
      {currency.euro}
      {price}
    </p>
    <p className="status">{status}</p>
  </div>
);

export default CostCard;
