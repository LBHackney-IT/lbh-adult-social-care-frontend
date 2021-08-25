import React from 'react';

export default function LinkButton({ children, secondary, disabled, link }) {
  const secondaryClassList = secondary ? ' govuk-secondary lbh-button--secondary' : '';
  const disabledClassList = disabled ? ' lbh-button--disabled govuk-button--disabled' : '';

  return (
    <a
      onClick={(e) => disabled && e.preventDefault()}
      href={link}
      role="button"
      draggable="false"
      className={`govuk-button lbh-button${secondaryClassList + disabledClassList}`}
      data-module="govuk-button"
    >
      {children}
    </a>
  );
}
