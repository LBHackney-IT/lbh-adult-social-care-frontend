import React from 'react';
import BrokerageTotalCost from '../BrokerageTotalCost';
import { Container } from '../../../HackneyDS';

export const Summary = ({ summary, isHide }) => (
  <Container className="review-package-details__summary">
    <h3 id="summary" className="font-weight-bold">
      Summary
    </h3>
    {summary.map(({ key, value, className: itemClassName, id, checkHide }) => {
      if (checkHide && isHide()) return null;

      return <BrokerageTotalCost key={id} value={value} name={key} className={itemClassName} />;
    })}
  </Container>
);