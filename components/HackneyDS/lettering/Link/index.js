import React from 'react';

export default function Link({ children, href = '', className = '', noVisited = false }) {
  const noVisitedLinkClass = noVisited ? ' lbh-link--no-visited-state' : '';
  const outerClass = className ? ` ${className}` : '';
  return <a href={href} className={`lbh-link${noVisitedLinkClass}${outerClass}`}>{children}</a>;
}