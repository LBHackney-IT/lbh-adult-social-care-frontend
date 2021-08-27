import React from 'react';

export default function ErrorMessage({ text = '', className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <span className={`govuk-error-message${outerClass}`}>{text}</span>;
}