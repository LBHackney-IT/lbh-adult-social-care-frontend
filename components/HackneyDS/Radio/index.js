import React, { useRef } from 'react';

export default function Radio({
  children,
  checked,
  value,
  id = `lbh-radio ${Math.random()}`,
  name,
  inline,
  disabled,
  small,
  handler = () => {},
}) {
  const dataProvider = useRef();
  const inlineClassList = inline ? ' govuk-radios--inline' : '';
  const smallClassList = small ? ' govuk-radios--small' : ''
  return (
    <>
      <div className={`govuk-radios__item${inlineClassList + smallClassList}`} >
        <input
          className="govuk-radios__input"
          id={id}
          name={name}
          type="radio"
          value={value}
          disabled={disabled}
          checked={checked}
          ref={dataProvider}
          onChange={() => handler(dataProvider.current.checked, value)}
        />
        <label className="govuk-label govuk-radios__label" htmlFor={id}>
          {children}
        </label>
      </div>
    </>
  );
}
