import React from 'react';

export default function Label({ children, className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <span className={`govuk-label lbh-label${outerClass}`}>{children}</span>;
}