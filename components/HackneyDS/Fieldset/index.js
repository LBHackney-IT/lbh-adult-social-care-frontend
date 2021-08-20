import React from 'react';

export default function Fieldset({ children, error }) {
  return (
    <div className={`govuk-form-group lbh-form-group${(error ?? '') && ' govuk-form-group--error'}`}>
      <fieldset className="govuk-fieldset">
        {error && (
          <span id="example-error" className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span> {error}
          </span>
        )}
        {children}
      </fieldset>
    </div>
  );
}
