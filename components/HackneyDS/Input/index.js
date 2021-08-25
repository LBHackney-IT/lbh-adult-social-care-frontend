import React, { useRef } from 'react';

export default function Input({
  label,
  id = 'lbh-input',
  name,
  type = 'text',
  hint,
  error,
  value,
  handler = () => {
    throw new Error('Handler function is not defined');
  },
}) {
  const dataProvider = useRef();

  return (
    <div className={`govuk-form-group lbh-form-group ${(error ?? '') && 'govuk-form-group--error'}`}>
      {label && (
        <label className="govuk-label lbh-label" htmlFor={id}>
          {label}
        </label>
      )}
      {hint && <span className="govuk-hint lbh-hint">{hint}</span>}
      {error && (
        <span className="govuk-error-message lbh-error-message">
          <span className="govuk-visually-hidden">{error}</span>
        </span>
      )}
      <input
        className={`govuk-input lbh-input ${(error ?? '') && 'govuk-input--error'}`}
        id={id}
        name={name}
        type={type}
        ref={dataProvider}
        value={value}
        onChange={() => handler(dataProvider.current.value)}
      />
    </div>
  );
}
