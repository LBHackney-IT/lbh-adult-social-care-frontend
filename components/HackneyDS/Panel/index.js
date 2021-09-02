import React from 'react';

export const Panel = ({ title, children }) => (
  <div class="govuk-panel govuk-panel--confirmation lbh-panel">
    <h1 class="govuk-panel__title">{title}</h1>
    <div class="govuk-panel__body">{children}</div>
  </div>
);
