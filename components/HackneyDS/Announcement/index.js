import React from 'react';

const mainClass = 'lbh-announcement';

export default function Announcement({ title, children, isWarning, className = '', isError }) {
  const isWarningClass = isWarning ? ` ${mainClass}--warning` : '';
  const isErrorClass = isError ? ` ${mainClass}--error` : '';
  const themeClass = isErrorClass || isWarningClass || '';
  return (
    <section className={`${mainClass} ${mainClass}--site${className && ` ${className}`}${themeClass}`}>
      <h3 className={`${mainClass}__title`}>{title}</h3>
      <div className={`${mainClass}__content`}>{children}</div>
    </section>
  );
}
