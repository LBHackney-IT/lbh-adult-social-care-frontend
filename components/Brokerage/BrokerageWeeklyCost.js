import React, { useState } from 'react';
import { Container } from '../HackneyDS';
import { SelectArrowTriangle } from '../Icons';
import BrokeragePackageDates from './BrokeragePackageDates';

const BrokerageWeeklyCostComponent = ({
  title,
}) => {
  const [expanded, setExpanded] = useState(false);

  const [packageDates, setPackageDates] = useState({
    dateFrom: null,
    dateTo: null,
  });

  return (
    <Container>
      <h2>
        {title}
        <span className='text-blue' onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Collapse' : 'Expand'}
          <SelectArrowTriangle />
        </span>
      </h2>
      <BrokeragePackageDates />
    </Container>
  )
}