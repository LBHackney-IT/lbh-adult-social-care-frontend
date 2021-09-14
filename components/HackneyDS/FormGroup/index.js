import React from 'react';

export default function FormGroup({ children = [], title, hint, error }) {
  const nodeList = Array.isArray(children) ? children : [children];
  const errorClassList = error ? ' govuk-form-group--error' : '';

  return (
    <div className={`govuk-form-group lbh-form-group${errorClassList}`}>
      <fieldset className="govuk-fieldset lbh-fieldset">
        <legend className="govuk-fieldset__legend">{title}</legend>
        <span className="govuk-hint lbh-hint">{hint}</span>
        <span className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {error}
        </span>
        {nodeList}
      </fieldset>
    </div>
  );
}
