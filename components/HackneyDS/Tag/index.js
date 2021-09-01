import React from 'react';

export default function Tag({ children, green, gray, yellow, red, className = ''}) {
  let color = '';

  if(green) {
    color = 'green';
  } else if(yellow) {
    color = 'yellow';
  } else if(red) {
    color = 'red';
  } else if(gray) {
    color = 'gray';
  }

  const outerClass = className ? ` ${className}` : '';
  const tagColorClass = color ? ` lbh-tag--${color}` : '';

  return (
    <span className={`lbh-tag govuk-tag${tagColorClass}${outerClass}`}>{children}</span>
  );
}