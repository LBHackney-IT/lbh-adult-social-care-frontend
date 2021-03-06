import React from 'react';
import Loading from '../../Loading';
import { Container } from '../Layout/Container';

export default function Button({
  children,
  secondary,
  clearClass,
  disabled,
  download,
  link,
  rel,
  color,
  target,
  className,
  style = {},
  outline,
  borderRadius = 4,
  addItem,
  largeButton,
  onClick = () => {},
  LoadingComponent = Loading,
  isLoading,
  type = 'button',
}) {
  const outerClassName = className ? ` ${className}` : '';
  const outlineClass = outline ? ' outline' : '';
  const secondaryColorClass = color ? ` secondary-${color}` : ' govuk-secondary lbh-button--secondary';
  const secondaryClassList = secondary ? secondaryColorClass : '';
  const disabledClassList = disabled || isLoading ? ' lbh-button--disabled govuk-button--disabled' : '';
  const mainClass = clearClass ? '' : 'govuk-button lbh-button';
  const addItemClassList = addItem ? ' lbh-button--add' : '';
  const largeButtonClass = largeButton ? ' large-button' : '';
  const allClasses = `${outlineClass}${secondaryClassList}${outerClassName}${disabledClassList}${addItemClassList}${largeButtonClass}`;
  const addItemIcon = (
    <svg width="12" height="12" viewBox="0 0 12 12">
      <path d="M6.94 0L5 0V12H6.94V0Z" />
      <path d="M12 5H0V7H12V5Z" />
    </svg>
  );
  return link ? (
    <a
      download={download}
      rel={rel}
      target={target}
      aria-disabled={disabled}
      onClick={(e) => {
        if (disabled) return e.preventDefault();

        onClick?.(e);
      }}
      href={link}
      role="button"
      style={{ borderRadius, ...style }}
      draggable="false"
      className={`${mainClass}${allClasses}`}
      data-module="govuk-button"
    >
      {isLoading && <LoadingComponent className="loading-absolute-centered" isLoading={isLoading} />}
      <Container className={isLoading ? 'hide' : ''}>{children}</Container>
    </a>
  ) : (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      style={{ borderRadius, ...style }}
      className={`${mainClass}${allClasses}`}
      data-module="govuk-button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <LoadingComponent className="loading-absolute-centered" isLoading={isLoading} />}
      {addItem && addItemIcon}
      <Container className={isLoading ? 'hide' : ''}>{children}</Container>
    </button>
  );
}
