import React from 'react';

export default function Announcement({ title, children, className, isWarning }) {
  return (
    <section
      className={`lbh-announcement lbh-announcement--site${className && ` ${className}`}${
        isWarning && ' lbh-announcement--warning'
      }`}
    >
      <h3 className="lbh-announcement__title">{title}</h3>
      <div className="lbh-announcement__content">{children}</div>
    </section>
  );
}
