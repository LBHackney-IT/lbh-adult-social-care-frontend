import React, { useState } from 'react';
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
  onChange = () => {},
}) => {
  const [radioValue, setRadioValue] = useState(selectedValue);
  const hasSelectedValue =
    radioValue !== undefined && options.find((option) => option.value === selectedValue) !== undefined;

  // let hasSelectedValue = radioValue !== undefined;

  const radioChange = (radioItemValue) => {
    if (isFunction(setError)) setError();
    onChange(radioItemValue);
    setRadioValue(radioItemValue);
  };

  return (
    <BaseField label={label} classes={className}>
      <div className={`radio-cont${inline ? '' : ' not-inline'}`}>
        {options.map((radioItem, index) => (
          <>
            {radioItem.header && radioItem.header}
            <label
              key={radioItem.value}
              className={`radio-item${index !== options.length ? ' is-first' : ''}`}
              onClick={() => radioChange(radioItem.value)}
            >
              <div
                className={`radio-select-cont${hasSelectedValue && radioValue === radioItem.value ? ' is-active' : ''}`}
              >
                <div className="radio-item-selected" />
              </div>
              <p className='radio-item__text'>{radioItem.text}</p>
            </label>
          </>
        ))}
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export { yesNoValues };
export default RadioButton;
