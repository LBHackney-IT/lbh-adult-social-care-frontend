import React from 'react';

const CardInfo = ({ children, className = '', title = '' }) => (
  <div className={`card-info ${className}`}>
    <p className="card-info__title">{title}</p>
    <div className="card-info__main">{children}</div>
  </div>
);

export default CardInfo;
