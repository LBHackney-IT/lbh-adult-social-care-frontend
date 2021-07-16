import React from 'react';
import Dropdown from '../Dropdown';

const CareSelectDropdown = ({
  careTypes,
  selectedCareType,
  setSelectedCareType,
  label = 'Select approve-package',
  initialText,
  error,
  setError,
}) => (
  <Dropdown
    error={error}
    setError={setError}
    label={label}
    initialText={initialText}
    options={careTypes}
    selectedValue={selectedCareType}
    onOptionSelect={(option) => setSelectedCareType(option)}
  />
);

export default CareSelectDropdown;
