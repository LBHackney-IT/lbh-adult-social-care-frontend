import React from 'react';

export default function Button({
  children,
  secondary,
  clearClass,
  disabled,
  link,
  rel,
  target,
  className,
  addItem,
  type='button',
  handler = () => {},
}) {
  const outerClassName = className ? ` ${className}` : '';
  const secondaryClassList = secondary ? ' govuk-secondary lbh-button--secondary' : '';
  const disabledClassList = disabled ? ' lbh-button--disabled govuk-button--disabled' : '';
  const mainClass = clearClass ? '' : 'govuk-button lbh-button';
  const addItemClassList = addItem ? ' lbh-button--add' : '';
  const calculateClassNames = `${outerClassName}${secondaryClassList}${disabledClassList}${addItemClassList}`;
  const addItemIcon = (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M6.94 0L5 0V12H6.94V0Z" />
      <path d="M12 5H0V7H12V5Z" />
    </svg>
  );
  return link ? (
    <a
      rel={rel}
      target={target}
      onClick={(e) => disabled && e.preventDefault()}
      href={link}
      role="button"
      draggable="false"
      className={`${mainClass}${secondaryClassList + disabledClassList}`}
      data-module="govuk-button"
    >
      {children}
    </a>
  ) : (
    <button
      type={type}
      className={`${mainClass}${calculateClassNames}`}
      data-module="govuk-button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={handler}
    >
      {addItem && addItemIcon}
      {children}
    </button>
  );
}
