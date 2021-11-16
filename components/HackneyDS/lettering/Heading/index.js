import React from 'react';

export const Heading = ({ children, size = 'l', color }) => <h1 style={{color}} className={`govuk-heading-${size}`}>{children}</h1>;
