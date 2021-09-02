import React from 'react';
import { Label } from '../index';

export default function RadioItem({
  label = '',
  className = '',
  value,
  name = "radioItem",
  id = "radioItem",
  checked = false,
  disabled = false,
  labelHeading,
  handle,
  hint,
}) {
  const outerClass = className ? ` ${className}` : '';

  return (
    <div className={`govuk-radios__item${outerClass}`}>
      <input
        className="govuk-radios__input"
        id={id}
        name={name}
        type="radio"
        onChange={e => handle(e.target.value)}
        value={value}
        checked={checked}
        disabled={disabled}
        aria-describedby={hint}
      />
      <Label htmlFor={id} className='govuk-radios__label'>
        {labelHeading && <span className='govuk-heading-s govuk-!-margin-bottom-1'>
          {labelHeading}
        </span>}
        {label}
      </Label>
      {hint && <span id={hint} className="govuk-hint govuk-radios__hint">
        {hint}
      </span>}
    </div>
  );
}
