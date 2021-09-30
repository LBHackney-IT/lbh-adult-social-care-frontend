import React from 'react';
import { SelectArrowTriangle } from '../../Icons';

export default function Select({
  onChange = () => {},
  value = { text: '', value: '' },
  className = '',
  disabledOptions = [],
  options = [],
  error,
  IconComponent = <SelectArrowTriangle />,
}) {
  const outerClass = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-select--error' : '';
  const errorDescribedBy = error ? { 'aria-describedby': ' govuk-select--error' } : {};
  return (
    <div className='select-container'>
      <select {...errorDescribedBy} onChange={onChange} defaultValue={value} className={`govuk-select lbh-select${outerClass}${errorClass}`}>
        {options.map(option => {
          const isDisabledOption = disabledOptions.some(disabledOption => (
            disabledOption === option.value
          ));

          return (
            <option
              disabled={isDisabledOption}
              key={option.text}
              value={option.value}
            >
              {option.text}
            </option>
          )
        })}
      </select>
      {IconComponent && <div className='select-icon'>{IconComponent}</div>}
    </div>
  )
}