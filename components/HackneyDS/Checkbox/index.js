import React from 'react';

const Checkbox = React.forwardRef(({
  label,
  onChangeValue,
  small,
  disabled,
  id,
  name,
  value,
  handler = () => {},
  className,
}, ref) => {
  const smallClassList = small ? ' govuk-checkboxes--small' : '';
  const outerClassName = className ? ` ${className}` : '';

  return (
    <div className={`govuk-checkboxes__item${smallClassList}${outerClassName}`}>
      <input
        className="govuk-checkboxes__input"
        id={id}
        ref={ref}
        name={name}
        type="checkbox"
        value={value}
        disabled={disabled}
        checked={value}
        onChange={e => {
          if (onChangeValue) {
            return onChangeValue(e.target.checked);
          }
          handler(e);
        }}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
});

export default Checkbox;
