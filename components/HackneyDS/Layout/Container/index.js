import React from 'react';

export const Container = ({
  children,
  padding,
  background,
  width = 'auto',
  height,
  display,
  alignItems,
  onClick = () => {},
  flexDirection,
  flex,
  justifyContent,
  maxWidth,
  margin,
  className = '',
}) => (
  <div
    onClick={onClick}
    className={className}
    style={{
      padding,
      background,
      height,
      width,
      display,
      alignItems,
      flexDirection,
      flex,
      justifyContent,
      maxWidth,
      margin
    }}>
    {children}
  </div>
);
