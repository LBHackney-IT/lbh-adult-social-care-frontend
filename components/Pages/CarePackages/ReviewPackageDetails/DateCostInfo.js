import React from 'react';
import { formatDate } from 'service';
import { currency, dateStringFormats } from 'constants/strings';
import { Container } from '../../../HackneyDS';

export const DateCostInfo = ({ cost, startDate, endDate }) => (
  <Container className="review-package-details__items-date" display="flex" justifyContent="space-between">
    <p>
      {formatDate(startDate, dateStringFormats.dayMonthYearSlash)}
      {endDate && ` - `}
      {endDate && formatDate(endDate, dateStringFormats.dayMonthYearSlash)}
    </p>
    {cost && (
      <p className="lbh-color-dark-red">
        {cost < 0 ? '-' : ''}
        {currency.euro}
        {cost ? Math.abs(cost).toFixed(2) : 0}
      </p>
    )}
  </Container>
);