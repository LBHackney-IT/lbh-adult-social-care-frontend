import React from 'react';

export default function WarningText({ children, className }) {
  const outerClassName = className ? ` ${className}` : '';
  return (
    <div className={`govuk-warning-text lbh-warning-text${outerClassName}`}>
      <span className="govuk-warning-text__icon" aria-hidden="true">
        !
      </span>
      <strong className="govuk-warning-text__text">
        <span className="govuk-warning-text__assistive">Warning</span>
        {children}
      </strong>
    </div>
  );
}
