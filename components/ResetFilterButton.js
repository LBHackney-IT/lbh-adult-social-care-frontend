import React from 'react';
import { Button } from './HackneyDS';

const ResetFilterButton = ({ filters, onClearFilters, text = 'Clear', color = 'gray' }) => {
  if (!Object.values(filters).some((item) => item)) return null;

  return (
    <Button outline secondary color={color} className="clear-filter-button" onClick={onClearFilters}>
      {text}
    </Button>
  );
};

export default ResetFilterButton;
