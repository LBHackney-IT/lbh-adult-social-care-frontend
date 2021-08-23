import React from 'react';

export default function Button({ children, secondary, disabled, link, 'add-item': addItem }) {
  const secondaryClassList = (secondary ?? '') && ' govuk-secondary lbh-button--secondary';
  const disabledClassList = (disabled ?? '') && ' lbh-button--disabled govuk-button--disabled';
  const addItemClassList = (addItem ?? '') && ' lbh-button--add';
  const addItemIcon = (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M6.94 0L5 0V12H6.94V0Z" />
      <path d="M12 5H0V7H12V5Z" />
    </svg>
  );

  return link ? (
    <a
      href={disabled ? '' : link}
      role="button"
      draggable="false"
      className={`govuk-button lbh-button${secondaryClassList + disabledClassList}`}
      data-module="govuk-button"
    >
      {children}
    </a>
  ) : (
    <button
      type="button"
      className={`govuk-button lbh-button${secondaryClassList + disabledClassList + addItemClassList}`}
      data-module="govuk-button"
      aria-disabled={disabled}
      disabled={disabled}
    >
      {addItem && addItemIcon}
      {children}
    </button>
  );
}
