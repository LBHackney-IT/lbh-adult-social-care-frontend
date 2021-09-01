import React from 'react';

export default function Hint({ children, className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <span className={`govuk-hint lbh-hint${outerClass}`}>{children}</span>;
}