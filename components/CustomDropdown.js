import React, { useEffect, useState } from 'react';

import BaseField from './baseComponents/BaseField';
import OutsideTrigger from './OutsideTrigger';
import { CaretDownIcon } from './Icons';
import ErrorField from './ErrorField';

const CustomDropDown = ({
  label,
  options,
  selectedValue,
  onOptionSelect,
  className = '',
  initialText = 'Select',
  children,
  isUp = false,
  fields = {
    text: 'text',
    value: 'value',
  },
  buttonStyle = {},
  error,
  setError,
  buttonClassName = '',
}) => {
  if (initialText) {
    options.unshift({
      [fields.value]: null,
      [fields.text]: initialText,
    });
  }

  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const onTriggerClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const onOptionClick = (event, option) => {
    event.stopPropagation();
    setSelectedOption(option);
    onOptionSelect(option);
    setError && setError();
    setIsActive(false);
  };

  useEffect(() => {
    const initialSelectedOption =
      options.find((item) => item[fields.value] === selectedValue || item[fields.text] === selectedValue) || options[0];
    setSelectedOption(initialSelectedOption);
  }, [selectedValue]);

  return (
    <BaseField classes={`${className} dropdown-container`} label={label}>
      <div className={`dropdown${isActive ? ' is-active' : ''}${isUp ? ' is-up' : ''}`}>
        <div className="dropdown-trigger" onClick={(event) => onTriggerClick(event)}>
          <button
            className={`button ${buttonClassName}`}
            aria-haspopup="true"
            aria-controls="dropdown-menu"
            style={buttonStyle}
          >
            {children !== undefined ? (
              children
            ) : (
              <>
                <span>{selectedOption[fields.text]}</span>
                <span className="icon">
                  <CaretDownIcon />
                </span>
              </>
            )}
          </button>
        </div>
        <OutsideTrigger onClick={() => setIsActive(false)} className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {options.map((optionItem) => (
              <div
                key={optionItem[fields.text]}
                className="dropdown-item"
                onClick={(event) => onOptionClick(event, optionItem)}
              >
                {optionItem[fields.text]}
              </div>
            ))}
          </div>
        </OutsideTrigger>
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default CustomDropDown;
