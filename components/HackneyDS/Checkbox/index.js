import React, { useState, useEffect } from 'react';

export default function Checkbox({
  children,
  small,
  disabled,
  id,
  name,
  value,
  checked = false,
  handler = () => {},
  className,
}) {
  const smallClassList = small ? ' govuk-checkboxes--small' : '';
  const outerClassName = className ? ` ${className}` : '';

  const [isChecked, setChecked] = useState(checked);

  useEffect(() => setChecked(checked), [checked]);
  useEffect(() => handler(isChecked), [isChecked]);

  return (
    <div className={`govuk-checkboxes__item${smallClassList}${outerClassName}`}>
      <input
        className="govuk-checkboxes__input"
        id={id}
        name={name}
        type="checkbox"
        value={value}
        disabled={disabled}
        checked={isChecked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
