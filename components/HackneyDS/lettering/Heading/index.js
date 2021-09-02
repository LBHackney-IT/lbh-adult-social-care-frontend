import React from 'react';

export const Heading = ({ children, size = 'l' }) => <h1 className={`govuk-heading-${size}`}>{children}</h1>;
