import React from 'react';

export default function Label({ text = '', className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <span className={`govuk-label lbh-label${outerClass}`}>{text}</span>;
}