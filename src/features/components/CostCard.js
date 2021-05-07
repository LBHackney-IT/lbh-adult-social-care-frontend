import {currency} from "../../constants/strings";
import React from "react";

const CostCard = ({ title = 'TOTAL / WK', price = '1892', status = 'ESTIMATE' }) => {
  return (
      <div className='cost-card total-container'>
        <p className='title'>{title}</p>
        <p className='price'>{currency.euro}{price}</p>
        <p className='status'>{status}</p>
      </div>
    );
};

export default CostCard;
