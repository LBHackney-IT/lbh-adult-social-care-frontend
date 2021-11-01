import React from 'react';

export default function Tag({ children, color, outline, noBackground, className = '' }) {
  // available colors = green, gray, yellow, red, blue
  const outerClass = className ? ` ${className}` : '';
  const outlineClass = outline ? ' outline' : '';
  const tagColorClass = color ? ` lbh-tag--${color}` : '';
  const noBackgroundClass = noBackground ? ' no-background' : '';

  return (
    <span className={`lbh-tag govuk-tag${outlineClass}${tagColorClass}${outerClass}${noBackgroundClass}`}>{children}</span>
  );
}