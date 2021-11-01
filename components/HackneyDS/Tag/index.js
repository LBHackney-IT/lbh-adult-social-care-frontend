import React from 'react';

export default function Tag({ children, color, outline, className = '' }) {
  // available colors = green, gray, yellow, red, blue
  const outerClass = className ? ` ${className}` : '';
  const outlineClass = outline ? ' outline' : '';
  const tagColorClass = color ? ` lbh-tag--${color}` : '';

  return (
    <span className={`lbh-tag govuk-tag${outlineClass}${tagColorClass}${outerClass}`}>{children}</span>
  );
}