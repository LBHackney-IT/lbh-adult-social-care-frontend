import React from 'react';

export default function Tag({ children, color = '', className = ''}) {
  const outerClass = className ? ` ${className}` : '';
  const tagColorClass = color ? ` lbh-tag--${color}` : '';

  return (
    <span className={`lbh-tag govuk-tag${tagColorClass}${outerClass}`}>{children}</span>
  );
}