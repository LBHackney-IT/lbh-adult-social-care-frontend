import React from 'react';

export const Heading = ({children, size }) => {
  return <h1 className={`govuk-heading-${size || 'l'}`}>{children}</h1>;
};
