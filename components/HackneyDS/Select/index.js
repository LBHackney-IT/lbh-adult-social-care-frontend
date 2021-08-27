import React from 'react';

export default function Select({
  onChange = () => {},
  value = { text: '', value: '' },
  className = '',
  disabledOptions = [],
  options = [],
}) {
  const outerClass = className ? ` ${className}` : '';
  return (
    <div className={`govuk-form-group lbh-form-group${outerClass}`}>
      <select onChange={onChange} className="govuk-select lbh-select">
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
    </div>
  )
}