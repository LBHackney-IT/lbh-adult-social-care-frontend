import React, { useEffect, useState } from 'react';
import BaseField from './baseComponents/BaseField';
import { CaretDownIcon } from './Icons';
import ErrorField from './ErrorField';

const Dropdown = ({
  label,
  options,
  selectedValue,
  onOptionSelect,
  className = '',
  initialText = 'Select',
  children,
  isUp = false,
  buttonStyle = {},
  error,
  setError,
  buttonClassName = '',
}) => {

  if (!options.some((option) => option.value === selectedValue)) {
    selectedValue = null;
  }

  useEffect(() => {
    const initialSelectedOption =
      selectedValue !== undefined ? options.find((item) => item.value === selectedValue) : options[0];
    setSelectedOption(initialSelectedOption);
  }, [selectedValue]);

  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const onTriggerClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const onOptionClick = (event, option) => {
    console.log(option);
    event.stopPropagation();
    setSelectedOption(option);
    onOptionSelect(option.value);
    setError && setError();
    setIsActive(false);
  };

  return (
    <BaseField classes={`${className} dropdown-container`} label={label}>
      <div
        tabIndex="0"
        onBlur={() => setIsActive(false)}
        data-selected-value={selectedOption?.value}
        className={`dropdown${isActive ? ' is-active' : ''}${isUp ? ' is-up' : ''}`}
      >
        <div className="dropdown-trigger" onClick={(event) => onTriggerClick(event)}>
          <div
            className={`button ${buttonClassName}`}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style={buttonStyle}
          >
            {children !== undefined ? (
              children
            ) : (
              <>
                <span>{selectedOption?.text ?? initialText}</span>
                <span className="icon">
                  <CaretDownIcon />
                </span>
              </>
            )}
          </div>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {options.map((optionItem) => {
              const activeItemClass = optionItem.value === selectedValue ? ' dropdown-item-active' : '';
              return (
                <div
                  key={optionItem.value}
                  className={`dropdown-item${activeItemClass}`}
                  onClick={(event) => onOptionClick(event, optionItem)}
                >
                  {optionItem.text}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default Dropdown;
