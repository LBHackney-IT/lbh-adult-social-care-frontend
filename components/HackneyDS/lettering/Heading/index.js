import React from 'react';

export const Heading = ({
  children,
  size = 'l',
  color,
  fontWeight,
}) => <h1 style={{ color, fontWeight }} className={`govuk-heading-${size}`}>{children}</h1>;
