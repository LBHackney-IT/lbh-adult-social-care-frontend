import React from 'react';

export default function Checkbox ({
  label,
  onChangeValue,
  small,
  disabled,
  id,
  name,
  value,
  checked = false,
  handler = () => {}
}) {
  const smallClassList = small ? ' govuk-checkboxes--small' : '';

  return (
    <div className={`govuk-checkboxes__item ${smallClassList}`}>
      <input
        className="govuk-checkboxes__input"
        id={id}
        name={name}
        type="checkbox"
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={e => {
          if (onChangeValue) {
            return onChangeValue(e.target.value);
          }
          handler(e);
        }}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
}
