import React from 'react';

export const Input = ({
  label,
  placeholder,
  id = 'lbh-input',
  name,
  type = 'text',
  hint,
  error,
  ref,
  value,
  handler = () => {
    throw new Error('Handler function is not defined');
  },
}) => (
    <div className={`govuk-form-group lbh-form-group ${(error ?? '') && 'govuk-form-group--error'}`}>
      {label && (
        <label className="govuk-label lbh-label" htmlFor={id}>
          {label}
        </label>
      )}
      {hint && <span className="govuk-hint lbh-hint">{hint}</span>}
      {error && <span className="govuk-error-message lbh-error-message">{error}</span>}
      <input
        className={`govuk-input lbh-input ${(error ?? '') && 'govuk-input--error'}`}
        id={id}
        placeholder={placeholder}
        name={name}
        type={type}
        ref={ref}
        value={value}
        onChange={(e) => handler(e.target.value)}
      />
    </div>
);
