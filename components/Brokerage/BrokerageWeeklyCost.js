import React, { useState } from 'react';
import { Container, Input } from '../HackneyDS';
import { SelectArrowTriangle } from '../Icons';
import BrokeragePackageDates from './BrokeragePackageDates';
import { currency } from '../../constants/strings';
import BrokerageTotalCost from './BrokerageTotalCost';

const BrokerageWeeklyCostComponent = ({
  title,
  dates,
  setDates,
  isOngoing,
  supplierWeeklyCost,
  setSupplierWeeklyCost,
  setIsOngoing,
  totalCostName,
  totalCostClassName,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Container className='brokerage__weekly-cost'>
      <h2>
        {title}
        <span className="text-blue" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
          <SelectArrowTriangle/>
        </span>
      </h2>
      <BrokeragePackageDates
        dates={dates}
        setDates={setDates}
        label='Dates'
        isOngoing={isOngoing}
        setIsOngoing={setIsOngoing}
      />
      <Input
        id="supplier-weekly-cost"
        preSign={currency.euro}
        label="Weekly Cost"
        value={supplierWeeklyCost}
        onChangeValue={setSupplierWeeklyCost}
      />
      <p className='text-green'>Add additional weekly need</p>
      <BrokerageTotalCost
        name={totalCostName}
        className={totalCostClassName}
        value={supplierWeeklyCost}
      />
    </Container>
  );
};