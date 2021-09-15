import React, { useRef } from 'react';

export default function Input({
  label,
  id = 'lbh-input',
  name,
  type = 'text',
  hint,
  placeholder = '',
  className = '',
  error,
  value,
  handler,
}) {
  const dataProvider = useRef();
  const outerClassName = className ? ` ${className}` : '';

  return (
    <div className={`govuk-form-group lbh-form-group ${(error ?? '') && 'govuk-form-group--error'}${outerClassName}`}>
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
        ref={dataProvider}
        value={value}
        onChange={(e) => handler(e.target.value)}
      />
    </div>
  );
}
