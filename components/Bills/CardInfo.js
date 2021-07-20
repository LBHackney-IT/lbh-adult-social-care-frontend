import React from 'react';

const CardInfo = ({ children, classes = '', title = '' }) => (
  <div className={`card-info ${classes}`}>
    <p className="card-info__title">{title}</p>
    <div className="card-info__main">{children}</div>
  </div>
);

export default CardInfo;
