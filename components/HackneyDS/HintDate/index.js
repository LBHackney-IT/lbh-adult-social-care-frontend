import React from 'react';
import { getEnGBFormattedDate } from '../../../api';
import Hint from '../lettering/Hint';

export const HintDate = ({ dateFrom, dateTo, className = '' }) => {
  if (!dateFrom) return null;

  const outerClassName = className ? ` ${className}` : '';

  return (
    <Hint className={`hint-date${outerClassName}`}>
      {getEnGBFormattedDate(dateFrom)}{dateTo ? ` - ${getEnGBFormattedDate(dateTo)}` : ''}
    </Hint>
  )
};