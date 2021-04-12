import Dropdown from "../../components/Dropdown";

const CareSelectDropdown = ({
  careTypes,
  selectedCareType,
  setSelectedCareType,
}) => {
  return (
    <Dropdown
      label="Select package"
      options={careTypes}
      selectedValue={selectedCareType}
      onOptionSelect={(option) => setSelectedCareType(option)}
    />
  );
};

export default CareSelectDropdown;
