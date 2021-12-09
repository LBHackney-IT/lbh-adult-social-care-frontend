import React from 'react';

export const Heading = ({
  children,
  size = 'l',
  color,
  lineHeight,
}) => <h1 style={{ color, lineHeight }} className={`govuk-heading-${size}`}>{children}</h1>;
