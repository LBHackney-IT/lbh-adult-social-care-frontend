import React from 'react';
import { Container } from '../Layout/Container';
import { VerticalSeparator } from '../Layout/VerticalSeparator';
import { HorizontalSeparator } from '../Layout/HorizontalSeparator';

export default function FormGroup({
  children = [],
  label,
  required,
  disabled,
  hint,
  error,
  className = '',
  smallLabel = false,
  inlineLabel = false,
}) {
  const outerClassName = className ? ` ${className}` : '';
  const nodeList = Array.isArray(children) ? children : [children];
  const errorClassList = error ? ' govuk-form-group--error' : '';
  const disabledClass = disabled ? ' disabled' : '';
  const labelSize = smallLabel ? ' small-label' : '';
  return (
    <div className={`govuk-form-group lbh-form-group${errorClassList}${outerClassName}${disabledClass}`}>
      <fieldset className="govuk-fieldset lbh-fieldset">
        {label && !inlineLabel && (
          <>
            <label className={`govuk-fieldset__legend${required ? ' text-required-after' : ''} ${labelSize}`}>
              {label}
            </label>
            <HorizontalSeparator />
          </>
        )}
        {hint && (
          <>
            <span className="govuk-hint lbh-hint">{hint}</span>
            <HorizontalSeparator />
          </>
        )}
        {error && (
          <span className="govuk-error-message">
            <span className="govuk-visually-hidden">Error:</span>
            {error}
          </span>
        )}
        {(hint || error || (label && !smallLabel)) && <HorizontalSeparator height="20px" />}
        {inlineLabel && label ? (
          <Container display="flex" alignItems="center">
            <label className={`govuk-fieldset__legend${required ? ' text-required-after' : ''} ${labelSize}`}>
              {label}
            </label>
            <VerticalSeparator width="8px" />
            {nodeList}
          </Container>
        ) : (
          nodeList
        )}
      </fieldset>
    </div>
  );
}
