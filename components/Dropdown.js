import React, {useEffect, useState } from "react";

import BaseField from "./baseComponents/BaseField";
import OutsideTrigger from "./OutsideTrigger";
import { CaretDownIcon } from "./Icons";
import ErrorField from "./ErrorField";

const Dropdown = ({
  label,
  options,
  selectedValue,
  onOptionSelect,
  className = "",
  initialText = "Select",
  includeInitialText = true,
  children,
  isUp = false,
  buttonStyle = {},
  error,
  setError,
  buttonClassName = "",
}) => {
  if (
    (options.length === 0 ||
      !options.some((option) => option.value === null)) &&
    !!initialText &&
    includeInitialText
  ) {
    options.unshift({ text: initialText, value: null });
  }

  if (!options.some((option) => option.value === selectedValue)) {
    selectedValue = null;
  }

  useEffect(() => {
    const initialSelectedOption =
      selectedValue !== undefined
        ? options.find((item) => item.value === selectedValue)
        : options[0];
    setSelectedOption(initialSelectedOption);
  }, [selectedValue]);

  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const onTriggerClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const onOptionClick = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    onOptionSelect(option.value);
    setError && setError();
    setIsActive(false);
  };

  return (
    <BaseField className={`${className} dropdown-container`} label={label}>
      <div
        data-selected-value={selectedOption?.value}
        className={
          `dropdown${  isActive ? " is-active" : ""  }${isUp ? " is-up" : ""}`
        }
      >
        <div
          className="dropdown-trigger"
          onClick={(event) => onTriggerClick(event)}
        >
          <button
            className={`button ${  buttonClassName}`}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style={buttonStyle}
          >
            {children !== undefined ? (
              children
            ) : (
              <>
                <span>{selectedOption?.text}</span>
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
            {options.map((optionItem) => (
                <div
                  key={optionItem.value}
                  className="dropdown-item"
                  onClick={(event) => onOptionClick(event, optionItem)}
                >
                  {optionItem.text}
                </div>
              ))}
          </div>
        </OutsideTrigger>
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default Dropdown;
