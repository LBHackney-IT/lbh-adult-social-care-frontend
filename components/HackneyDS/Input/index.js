import React, { useRef } from 'react';

export default function Input({
  children,
  id = 'lbh-input',
  name,
  type = 'text',
  error,
  value,
  handler = () => {
    throw new Error('Handler function is not defined');
  },
}) {
  const dataProvider = useRef();

  return (
    <div className={`govuk-form-group lbh-form-group ${(error ?? '') && 'govuk-form-group--error'}`}>
      {children && (
        <label className="govuk-label lbh-label" htmlFor={id}>
          {children}
        </label>
      )}
      {error && (
        <span className="govuk-error-message lbh-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {error}
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
