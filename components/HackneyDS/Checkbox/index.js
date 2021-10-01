import React, { useState, useEffect } from 'react';

export default function Checkbox({ children, small, disabled, id, name, value, checked = false, handler = () => {} }) {
  const smallClassList = small ? ' govuk-checkboxes--small' : '';

  return (
    <div className={`govuk-checkboxes__item ${smallClassList}`}>
      <input
        className="govuk-checkboxes__input"
        id={id}
        name={name}
        type='checkbox'
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={handler}
      />
      <label className="govuk-label govuk-checkboxes__label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
