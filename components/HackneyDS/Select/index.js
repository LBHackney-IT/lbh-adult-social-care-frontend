import React, { useEffect } from 'react';
import { SelectArrowTriangle } from '../../Icons';

export default function Select ({
  onChange = () => {},
  onChangeValue,
  value = { text: '', value: '' },
  className = '',
  disabledOptions = [],
  options = [],
  id = 'select-id',
  error,
  IconComponent = <SelectArrowTriangle/>,
}) {
  const outerClass = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-select--error' : '';
  const errorDescribedBy = error ? { 'aria-describedby': ' govuk-select--error' } : {};

  useEffect(() => {
    if (options && onChangeValue) {
      onChangeValue(options[0].value);
    }
  }, [options]);

  return (
    <div className="select-container">
      <select
        id={id}
        {...errorDescribedBy}
        onChange={(e) => {
          if (onChangeValue) {
            return onChangeValue(e.target.value);
          }
          onChange(e);
        }}
        value={value}
        className={`govuk-select lbh-select${outerClass}${errorClass}`}
      >
        {options.map((option) => {
          const isDisabledOption = disabledOptions.some((disabledOption) => disabledOption === option.value);

          return (
            <option disabled={isDisabledOption} key={option.text} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>
      {IconComponent && <div className="select-icon">{IconComponent}</div>}
    </div>
  );
}
