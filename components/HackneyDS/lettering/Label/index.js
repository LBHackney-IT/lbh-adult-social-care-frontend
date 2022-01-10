import React from 'react';

export default function Label({ children, className = '', htmlFor }) {
  const outerClass = className ? ` ${className}` : '';
  return (
    <label htmlFor={htmlFor} className={`govuk-label lbh-label${outerClass}`}>
      {children}
    </label>
  );
}
