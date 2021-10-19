import React from 'react';
import Loading from '../../Loading';
import { Container } from '../index';

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
  onClick = () => {},
  LoadingComponent = Loading,
  isLoading,
  type='button',
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
      aria-disabled={disabled}
      onClick={(e) => disabled && e.preventDefault()}
      href={link}
      role="button"
      draggable="false"
      className={`${mainClass}${secondaryClassList + disabledClassList}`}
      data-module="govuk-button"
    >
      {isLoading && <LoadingComponent className='loading-absolute-centered' isLoading={isLoading} />}
      <Container className={isLoading ? 'hide' : ''}>{children}</Container>
    </a>
  ) : (
    <button
      type={type}
      className={`${mainClass}${calculateClassNames}`}
      data-module="govuk-button"
      aria-disabled={disabled}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <LoadingComponent className='loading-absolute-centered' isLoading={isLoading} />}
      {addItem && addItemIcon}
      <Container className={isLoading ? 'hide' : ''}>{children}</Container>
    </button>
  );
}
