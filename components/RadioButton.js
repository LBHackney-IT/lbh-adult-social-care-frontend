import React from 'react';
import BaseField from './BaseField';
import ErrorField from './ErrorField';
import { isFunction } from '../api';

const RadioButton = ({
  label,
  options,
  selectedValue,
  error,
  className = '',
  setError,
  inline = true,
  tooltipText = '',
  onChange = () => {},
}) => {
  const radioChange = (radioItemValue) => {
    if (isFunction(setError)) setError();
    onChange(radioItemValue);
  };

  const innerClass = `radio-button ${className}`;

  return (
    <BaseField tooltipText={tooltipText} label={label} className={innerClass}>
      <div className={`radio-cont${inline ? '' : ' not-inline'}`}>
        {options.map((radioItem, index) => (
          <React.Fragment key={`${radioItem.value}${label}${radioItem.text}`}>
            {radioItem.header && radioItem.header}
            <label
              className={`radio-item${index !== options.length ? ' is-first' : ''}`}
              onClick={() => radioChange(radioItem.value)}
            >
              <div className={`radio-select-cont${selectedValue === radioItem.value ? ' is-active' : ''}`}>
                <div className="radio-item-selected" />
              </div>
              <p className="radio-item__text">{radioItem.text}</p>
            </label>
          </React.Fragment>
        ))}
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default RadioButton;
