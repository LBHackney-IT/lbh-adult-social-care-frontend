import React from 'react';

export default function Link({ text = '', href = '', className = '' }) {
  const outerClass = className ? ` ${className}` : '';
  return <a href={href} className={`lbh-link${outerClass}`}>{text}</a>;
}