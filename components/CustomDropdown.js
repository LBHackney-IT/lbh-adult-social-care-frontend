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
  const localOptions = options.slice();

  const [isActive, setIsActive] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});

  const onTriggerClick = (event) => {
    event.stopPropagation();
    setIsActive(!isActive);
  };

  const onOptionClick = (event, option) => {
    event.stopPropagation();
    onOptionSelect(option);
    setError && setError();
    setIsActive(false);
  };

  useEffect(() => {
    setSelectedOption(selectedValue || {});
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
                <span>{selectedValue ? selectedOption[fields.text] : initialText}</span>
                <span className="icon">
                  <CaretDownIcon />
                </span>
              </>
            )}
          </button>
        </div>
        <OutsideTrigger onClick={() => setIsActive(false)} className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {localOptions.map((optionItem) => (
              <div
                key={optionItem[fields.value]}
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
