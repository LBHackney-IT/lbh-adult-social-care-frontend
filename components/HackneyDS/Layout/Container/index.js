import React from 'react';

export const Container = ({
  children,
  padding,
  background,
  width = 'auto',
  display,
  alignItems,
  onClick = () => {},
  flexDirection,
  flex,
  justifyContent,
  className = '',
}) => (
  <div onClick={onClick} className={className} style={{ padding, background, width, display, alignItems, flexDirection, flex, justifyContent }}>{children}</div>
);
