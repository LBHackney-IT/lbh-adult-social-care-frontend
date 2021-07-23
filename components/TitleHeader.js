import React from 'react';

const TitleHeader = ({ children, className }) => <div className={`title-header ${className ?? ''}`}>{children}</div>;

export default TitleHeader;
