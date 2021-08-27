import React from 'react';

export default function Select({
  onChange = () => {},
  value = { text: '', value: '' },
  className = '',
  disabledOptions = [],
  options = [],
  error,
}) {
  const outerClass = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-select--error' : '';
  const errorDescribedBy = error ? { 'aria-describedby': ' govuk-select--error' } : {};
  return (
    <select {...errorDescribedBy} onChange={onChange} className={`govuk-select lbh-select${outerClass}${errorClass}`}>
      {options.map(option => {
        const isDisabledOption = disabledOptions.some(disabledOption => (
          disabledOption === option.value
        ));

        return (
          <option
            disabled={isDisabledOption}
            selected={value.value === option.value}
            key={option.text}
            value={option.value}
          >
            {option.text}
          </option>
        )
      })}
    </select>
  )
}