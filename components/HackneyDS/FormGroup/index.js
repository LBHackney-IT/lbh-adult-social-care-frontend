import React from 'react';
import { HorizontalSeparator } from '../index';

export default function FormGroup ({ children = [], label, hint, error, className = '' }) {
  const outerClassName = className ? ` ${className}` : '';
  const nodeList = Array.isArray(children) ? children : [children];
  const errorClassList = error ? ' govuk-form-group--error' : '';

  return (
    <div className={`govuk-form-group lbh-form-group${errorClassList}${outerClassName}`}>
      <fieldset className="govuk-fieldset lbh-fieldset">
        <label className="govuk-fieldset__legend">{label}</label>
        {hint && <span className="govuk-hint lbh-hint">{hint}</span>}
        {error && <span className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {error}
        </span>}
        {(hint || error || label) && <HorizontalSeparator height='10px' />}
        {nodeList}
      </fieldset>
    </div>
  );
}
