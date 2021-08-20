import React, { useRef } from 'react';

export default function Radio({
  children,
  checked,
  value,
  id = `lbh-radio ${Math.random()}`,
  name,
  inline,
  disabled,
  handler = () => {},
}) {
  const dataProvider = useRef();

  const inlineClassList = (inline ?? '') && ' govuk-radios--inline';

  return (
    <>
      {/* <div class="govuk-form-group lbh-form-group"> */}
      {/* <fieldset class="govuk-fieldset" aria-describedby="example-hint"> */}
      {/* <div class="govuk-radios lbh-radios"> */}
      <div className={`govuk-radios__item${inlineClassList}`}>
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
      {/* </div> */}
      {/* </fieldset> */}
      {/* </div> */}
    </>
  );
}
