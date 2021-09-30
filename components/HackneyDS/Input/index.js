import React from 'react';

export const Input = ({
  label,
  id = 'lbh-input',
  name,
  type = 'text',
  hint,
  placeholder = '',
  error,
  ref,
  className,
  preSign = '',
  value,
  handler,
}) => {
  const outerClassName = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-form-group--error' : '';
  const signClass = preSign ? ' with-sign' : '';

  return (
    <div
      data-presign={preSign}
      className={`govuk-form-group lbh-form-group${errorClass}${signClass} ${outerClassName}`}
    >
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
}
