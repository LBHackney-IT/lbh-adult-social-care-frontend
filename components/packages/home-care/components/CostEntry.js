import React from 'react';
import EuroInput from '../../../EuroInput';
import { currency } from '../../../../constants/strings';

const HomeCareCostEntry = ({ label, quantity, value = 0, onChange = () => {} }) => {
  const valueOutput = value > 0 ? `${quantity * value}` : '';

  return (
    <div className="elements-row">
      <div>{label}</div>
      <div>
        <EuroInput onChange={onChange} value={value} />
      </div>
      {quantity && <div>{quantity}</div>}
      {quantity && <div>
        {currency.euro}
        {valueOutput}
      </div>}
    </div>
  );
};

export default HomeCareCostEntry;
