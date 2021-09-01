import React from 'react';
import BaseField from './baseComponents/BaseField';
import ErrorField from './ErrorField';
import { isFunction } from '../api/Utils/FuncUtils';

const yesNoValues = [
  { text: 'Yes', value: true },
  { text: 'No', value: false },
];

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
  const hasSelectedValue =
    selectedValue !== undefined && options.find((option) => option.value === selectedValue) !== undefined;

  const radioChange = (radioItemValue) => {
    if (isFunction(setError)) setError();
    onChange(radioItemValue);
  };

  const innerClass = `radio-button ${className}`;

  return (
    <BaseField tooltipText={tooltipText} label={label} classes={innerClass}>
      <div className={`radio-cont${inline ? '' : ' not-inline'}`}>
        {options.map((radioItem, index) => {
          return (
            <React.Fragment key={`${radioItem.value}${label}${radioItem.text}`}>
              {radioItem.header && radioItem.header}
              <label
                className={`radio-item${index !== options.length ? ' is-first' : ''}`}
                onClick={() => radioChange(radioItem.value)}
              >
                <div
                  className={`radio-select-cont${hasSelectedValue && selectedValue === radioItem.value ? ' is-active' : ''}`}
                >
                  <div className="radio-item-selected" />
                </div>
                <p className='radio-item__text'>{radioItem.text}</p>
              </label>
            </React.Fragment>
          )
        })}
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export { yesNoValues };
export default RadioButton;
