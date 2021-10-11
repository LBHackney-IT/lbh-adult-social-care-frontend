import React from 'react';
import { HorizontalSeparator } from '../index';

export default function FormGroup ({
  children = [],
  label,
  required,
  hint,
  error,
  className = ''
}) {
  const outerClassName = className ? ` ${className}` : '';
  const nodeList = Array.isArray(children) ? children : [children];
  const errorClassList = error ? ' govuk-form-group--error' : '';

  return (
    <div className={`govuk-form-group lbh-form-group${errorClassList}${outerClassName}`}>
      <fieldset className="govuk-fieldset lbh-fieldset">
        {label &&
        <>
          <label className={`govuk-fieldset__legend${required ? ' text-required-after' : ''}`}>{label}</label>
          <HorizontalSeparator/>
        </>
        }
        {hint && <>
          <span className="govuk-hint lbh-hint">{hint}</span>
          <HorizontalSeparator/>
        </>}
        {error && <span className="govuk-error-message">
          <span className="govuk-visually-hidden">Error:</span>
          {error}
        </span>}
        {(hint || error || label) && <HorizontalSeparator height="10px"/>}
        {nodeList}
      </fieldset>
    </div>
  );
}
