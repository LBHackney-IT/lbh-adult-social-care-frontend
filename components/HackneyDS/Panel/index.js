import React from 'react';

export const Panel = ({ title, children }) => (
  <div className="govuk-panel govuk-panel--confirmation lbh-panel">
    <h1 className="govuk-panel__title">{title}</h1>
    <div className="govuk-panel__body">{children}</div>
  </div>
);
