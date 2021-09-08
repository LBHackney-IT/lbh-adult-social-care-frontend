import React from 'react';

export default function Tag({ children, color, className = '' }) {
  // available colors = green, gray, yellow, red, blue
  const outerClass = className ? ` ${className}` : '';
  const tagColorClass = color ? ` lbh-tag--${color}` : '';

  return (
    <span className={`lbh-tag govuk-tag${tagColorClass}${outerClass}`}>{children}</span>
  );
}