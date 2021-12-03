import React from 'react';

const mainClass = 'lbh-announcement';

export default function Announcement({ title, children, className, isError }) {
  const isErrorClass = isError ? ` ${mainClass}--error` : '';
  return (
    <section className={`${mainClass} ${mainClass}--site${className ? ` ${className}` : ''}${isErrorClass}`}>
      <h3 className={`${mainClass}__title`}>{title}</h3>
      <div className={`${mainClass}__content`}>{children}</div>
    </section>
  );
}
