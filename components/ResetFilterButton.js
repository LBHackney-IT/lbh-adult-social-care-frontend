import React from 'react';
import { Button } from './HackneyDS';

const ResetFilterButton = ({
  filters,
  width = 80,
  height = 40,
  text = 'Clear',
  color = 'gray',
  onClearFilters
}) => {
  if (!Object.values(filters).some((item) => item)) return null;

  return (
    <Button
      outline
      secondary
      style={{ width, height }}
      color={color}
      className=" clear-filter-button"
      onClick={onClearFilters}
    >
      {text}
    </Button>
  );
};

export default ResetFilterButton;