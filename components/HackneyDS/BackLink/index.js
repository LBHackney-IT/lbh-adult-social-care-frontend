import React from 'react';

export default function BackLink({ children, to }) {
  return (
    <a href={to} className="govuk-back-link lbh-back-link">
      {children}
    </a>
  );
}
