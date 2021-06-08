import React from "react";
import Dropdown from "../Dropdown";

const CareSelectDropdown = ({
  careTypes,
  selectedCareType,
  setSelectedCareType,
  label = 'Select package',
  initialText,
}) => {
  return (
    <Dropdown
      label={label}
      initialText={initialText}
      options={careTypes}
      selectedValue={selectedCareType}
      onOptionSelect={(option) => setSelectedCareType(option)}
    />
  );
};

export default CareSelectDropdown;
