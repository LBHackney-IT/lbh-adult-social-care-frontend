import { useState } from "react";
import "./assets/dropdown.scss";
import BaseField from "./baseComponents/BaseField";
import OutsideTrigger from "./OutsideTrigger";
import { CaretDownIcon } from "./Icons";

const Dropdown = ({ label, options, selectedValue, onOptionSelect }) => {
  const initialSelectedOption =
    selectedValue !== undefined
      ? options.find((item) => item.value === selectedValue)
      : options[0];

  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const onTriggerClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const onOptionClick = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    onOptionSelect(option.value);
  };

  return (
    <OutsideTrigger onClick={() => setIsActive(false)}>
      <BaseField label={label}>
        <div
          data-selected-value={selectedOption.value}
          className={"dropdown" + (isActive ? " is-active" : "")}
        >
          <div
            className="dropdown-trigger"
            onClick={(event) => onTriggerClick(event)}
          >
            <button
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
            >
              <span>{selectedOption.text}</span>
              <span className="icon">
                <CaretDownIcon />
              </span>
            </button>
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {options.map((optionItem) => {
                return (
                  <div
                    key={optionItem.value}
                    className="dropdown-item"
                    onClick={(event) => onOptionClick(event, optionItem)}
                  >
                    {optionItem.text}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </BaseField>
    </OutsideTrigger>
  );
};

export default Dropdown;
