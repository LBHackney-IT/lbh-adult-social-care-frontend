import React from 'react';
import FormGroup from '../FormGroup';
import RadioItem from '../RadioItem';
import { ErrorMessage, HorizontalSeparator, Label } from '../index';

export default function RadioGroup({
  className = '',
  items = [],
  value,
  inline = false,
  label,
  error,
  handle,
  name,
  hint,
  small,
}) {
  const outerClassName = className ? ` ${className}` : '';
  const inlineClassName = inline ? ' govuk-radios--inline' : '';
  const smallRadioGroupClass = small ? ' govuk-radios--small' : '';

  return (
    <FormGroup label={label} error={error} className={outerClassName} hint={hint}>
      <div className={`govuk-radios lbh-radios${outerClassName}${inlineClassName}${smallRadioGroupClass}`}>
        {items.map((item) => {
          const { condition } = item;
          const errorClass = condition?.error ? ' govuk-input--error' : '';

          if (item.divider) {
            return (
              <div key={item.id} className="govuk-radios__divider">
                {item.divider}
              </div>
            );
          }
          return (
            <React.Fragment key={item.id}>
              <RadioItem
                value={item.id}
                labelHeading={item.labelHeading}
                className={item.className}
                handle={() => handle(item.id)}
                id={item.id}
                hint={item.hint}
                label={item.label}
                name={name}
                checked={value === item.id}
                disabled={item.disabled}
              />
              {condition && (
                <div className="govuk-radios__conditional govuk-radios__conditional--hidden">
                  {condition.label && <Label htmlFor={condition.id}>{condition.label}</Label>}
                  {condition.error && <ErrorMessage>{condition.error}</ErrorMessage>}
                  <HorizontalSeparator height="10px" />
                  <input
                    className={`govuk-input govuk-!-width-one-third${errorClass}`}
                    name={condition.id}
                    value={condition.value}
                    onChange={(e) => condition.handle(e.target.value)}
                    type={condition.type}
                    id={condition.id}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </FormGroup>
  );
}
