import React from 'react';

export const Container = ({
  children,
  padding,
  color,
  background,
  width = 'auto',
  height,
  display,
  alignItems,
  onClick = () => {},
  flexDirection,
  flex,
  justifyContent,
  border,
  borderBottom,
  borderRadius,
  maxWidth,
  minWidth,
  margin,
  cursor,
  gridTemplateColumns,
  textAlign,
  className = '',
}) => (
  <div
    onClick={onClick}
    className={className}
    style={{
      padding,
      color,
      background,
      height,
      width,
      display,
      alignItems,
      flexDirection,
      flex,
      justifyContent,
      border,
      borderBottom,
      borderRadius,
      maxWidth,
      minWidth,
      margin,
      gridTemplateColumns,
      textAlign,
      cursor,
    }}
  >
    {children}
  </div>
);
