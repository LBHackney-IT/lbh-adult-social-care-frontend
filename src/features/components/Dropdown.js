import { useState } from "react";
import "./assets/dropdown.scss";
import BaseField from "./baseComponents/BaseField";
import OutsideTrigger from "./OutsideTrigger";
import { CaretDownIcon } from "./Icons";

const Dropdown = ({
  label,
  options,
  selectedValue,
  onOptionSelect,
  initialText = 'Select',
  children,
  isUp = false,
  buttonStyle = {},
  buttonClassName = "",
}) => {
  if(options.length === 0 || !options.some(option => option.value === null)){
    options.unshift({ text: initialText, value: null });
  }

  if(!options.some(option => option.value === selectedValue)){
    selectedValue = null;
  }

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
    setIsActive(false);
  };

  return (
    <BaseField label={label}>
      <div
        data-selected-value={selectedOption.value}
        className={
          "dropdown" + (isActive ? " is-active" : "") + (isUp ? " is-up" : "")
        }
      >
        <div
          className="dropdown-trigger"
          onClick={(event) => onTriggerClick(event)}
        >
          <button
            className={"button " + buttonClassName}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style={buttonStyle}
          >
            {children !== undefined ? (
              children
            ) : (
              <>
                <span>{selectedOption.text}</span>
                <span className="icon">
                  <CaretDownIcon />
                </span>
              </>
            )}
          </button>
        </div>
        <OutsideTrigger
          onClick={() => setIsActive(false)}
          className="dropdown-menu"
          id="dropdown-menu"
          role="menu"
        >
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
        </OutsideTrigger>
      </div>
    </BaseField>
  );
};

export default Dropdown;
