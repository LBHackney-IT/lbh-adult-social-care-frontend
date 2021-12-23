import React from 'react';
import { Button } from './HackneyDS';

const ResetFilterButton = ({ filters, width = 70, height = 40, onClearFilters, text = 'Clear', color = 'gray' }) => {
  if (!Object.values(filters).some((item) => item)) return null;

  return (
    <Button style={{ width, height }} outline secondary color={color} className="clear-filter-button" onClick={onClearFilters}>
      {text}
    </Button>
  );
};

export default ResetFilterButton;