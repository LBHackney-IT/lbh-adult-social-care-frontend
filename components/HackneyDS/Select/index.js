import React, { useState } from 'react';
import { SelectArrowTriangle } from '../../Icons';

export default function Select({
  onChange = () => {},
  onChangeValue,
  value = { text: '', value: '' },
  className = '',
  disabledOptions = [],
  disabledEmptyComponent = false,
  options = [],
  emptyElement = { text: 'Select one', value: null },
  id = 'select-id',
  error,
  IconComponent = <SelectArrowTriangle />,
}) {
  const outerClass = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-select--error' : '';
  const errorDescribedBy = error ? { 'aria-describedby': ' govuk-select--error' } : {};
  const [isDisabled, setDisabled] = useState(false);
  return (
    <div className="select-container">
      <select
        id={id}
        {...errorDescribedBy}
        onChange={(e) => {
          if (emptyElement && e.target.value !== emptyElement.value && disabledEmptyComponent) setDisabled(true);
          if (onChangeValue) {
            return onChangeValue(e.target.value);
          }
          return onChange(e);
        }}
        value={value}
        className={`govuk-select lbh-select${outerClass}${errorClass}`}
      >
        {emptyElement && (
          <option disabled={isDisabled} value={emptyElement.value}>
            {emptyElement.text}
          </option>
        )}
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
