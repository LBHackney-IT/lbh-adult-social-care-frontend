import React from 'react';

export default function ErrorMessage({ children, className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <span className={`govuk-error-message lbh-error-message${outerClass}`}>{children}</span>;
}
