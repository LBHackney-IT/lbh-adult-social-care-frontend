import React from 'react';

export const Input = ({
  label,
  id = 'lbh-input',
  name,
  type = 'text',
  step,
  hint,
  placeholder = '',
  error,
  ref,
  className,
  preSign = '',
  value,
  onBlur,
  handler,
  onChangeValue,
  required,
  disabled,
  flex,
}) => {
  const outerClassName = className ? ` ${className}` : '';
  const errorClass = error ? ' govuk-form-group--error' : '';
  const signClass = preSign ? ' with-sign' : '';
  const flexClass = flex ? ' with-flex' : '';
  const onChange = (e) => {
    if (onChangeValue) {
      return onChangeValue(e.target.value);
    }
    return handler(e);
  };

  return (
    <div className={`govuk-form-group lbh-form-group${errorClass}${signClass}${flexClass} ${outerClassName}`}>
      {label && (
        <label className={`govuk-label lbh-label input__label ${required ? 'text-required-after' : ''}`} htmlFor={id}>
          {label}
        </label>
      )}
      {hint && <span className="govuk-hint lbh-hint input__hint">{hint}</span>}
      {error && <span className="govuk-error-message lbh-error-message">{error}</span>}
      <div className={`input-container${flexClass}`} data-presign={preSign}>
        <input
          onBlur={onBlur}
          className={`govuk-input lbh-input ${(error ?? '') && 'govuk-input--error'}`}
          id={id}
          placeholder={placeholder}
          name={name}
          type={type}
          step={step}
          ref={ref}
          value={value}
          onChange={onChange}
          disabled={disabled}
          onWheel={(e) => e.target.blur()}
        />
      </div>
    </div>
  );
};
