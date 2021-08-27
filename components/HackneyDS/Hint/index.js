import React from 'react';

export default function Hint({ text = '', className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <span className={`govuk-hint lbh-hint${outerClass}`}>{text}</span>;
}