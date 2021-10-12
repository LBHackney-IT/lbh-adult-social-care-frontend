import React from 'react';

export default function Link({ onClick = () => {}, children, href = '', className = '', noVisited = false }) {
  const noVisitedLinkClass = noVisited ? ' lbh-link--no-visited-state' : '';
  const outerClass = className ? ` ${className}` : '';
  return <a onClick={onClick} href={href} className={`lbh-link${noVisitedLinkClass}${outerClass}`}>{children}</a>;
}