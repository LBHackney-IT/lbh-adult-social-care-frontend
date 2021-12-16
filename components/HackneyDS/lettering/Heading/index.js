import React from 'react';

export const Heading = ({
  children,
  size = 'l',
  color,
  lineHeight,
  fontWeight,
}) => <h1 style={{ color, lineHeight, fontWeight }} className={`govuk-heading-${size}`}>{children}</h1>;
