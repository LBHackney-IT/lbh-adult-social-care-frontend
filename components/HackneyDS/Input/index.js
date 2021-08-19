import React from 'react';

export default function Input({ id = 'lbh-input', name, type = 'text', label, hint, error }) {
  return (
    <div className={`govuk-form-group lbh-form-group ${error && 'govuk-form-group--error'}`}>
      {label && (
        <label className="govuk-label lbh-label" htmlFor={id}>
          {label}
        </label>
      )}
      {hint && <span className="govuk-hint lbh-hint">{hint}</span>}
      {error && (
        <span className="govuk-error-message lbh-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {error}
        </span>
      )}
      <input className={`govuk-input lbh-input ${error && 'govuk-input--error'}`} id={id} name={name} type={type} />
    </div>
  );
}
