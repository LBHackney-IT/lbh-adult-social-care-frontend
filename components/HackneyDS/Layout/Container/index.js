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
      justifyContent
    }}>
    {children}
  </div>
);
