import React, { useState } from 'react';
import { SelectArrowTriangle } from '../../Icons';

const Select = (props) => {
  const {
    onChange = () => {},
    onChangeValue,
    value = { text: '', value: '' },
    className = '',
    disabledOptions = [],
    disabledEmptyComponent = false,
    options = [],
    emptyElement = { text: 'Select one', value: '' },
    id = 'select-id',
    error,
    style = {},
    IconComponent = <SelectArrowTriangle />,
    disabled,
  } = props;
  const outerClass = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-select--error' : '';
  const errorDescribedBy = error ? { 'aria-describedby': ' govuk-select--error' } : {};
  const [isEmptyElementDisabled, setEmptyElementDisabled] = useState(disabledEmptyComponent && emptyElement?.text);
  return (
    <div className="select-container">
      <select
        style={style}
        id={id}
        {...errorDescribedBy}
        onChange={(e) => {
          if (emptyElement && e.target.value !== emptyElement.value && disabledEmptyComponent)
            setEmptyElementDisabled(true);
          if (onChangeValue) return onChangeValue(e.target.value);
          return onChange(e);
        }}
        value={value}
        className={`govuk-select lbh-select${outerClass}${errorClass}`}
        disabled={disabled}
      >
        {emptyElement && (
          <option disabled={isEmptyElementDisabled} value={emptyElement.value}>
            {emptyElement.text}
          </option>
        )}

        {options.map((option) => {
          const isDisabledOption = disabledOptions.some((disabledOption) => disabledOption === option.value);

          return (
            <option disabled={isDisabledOption} key={`${option.text}${option.value}`} value={option.value}>
              {option.text}
            </option>
          );
        })}
      </select>

      {IconComponent && <div className="select-icon">{IconComponent}</div>}
    </div>
  );
};

export default Select;
