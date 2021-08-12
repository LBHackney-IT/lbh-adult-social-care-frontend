import React, { useState } from 'react';
import BaseField from './baseComponents/BaseField';
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

  return (
    <BaseField classes={`${className} dropdown-container`} label={label}>
      <div tabIndex="0" onBlur={() => setIsActive(false)} className={`dropdown${isActive ? ' is-active' : ''}${isUp ? ' is-up' : ''}`}>
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
                <span>{selectedValue ? selectedValue[fields.text] : initialText}</span>
                <span className="icon">
                  <CaretDownIcon />
                </span>
              </>
            )}
          </div>
        </div>
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {localOptions.map((optionItem) => {
              const activeItemClass = optionItem[fields.value] === selectedValue[fields.value] ? ' dropdown-item-active' : '';
              return (
                <div
                  key={optionItem[fields.value]}
                  className={`dropdown-item${activeItemClass}`}
                  onClick={(event) => onOptionClick(event, optionItem)}
                >
                  {optionItem[fields.text]}
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

export default CustomDropDown;
