import React from 'react';

export const Container = ({
  children,
  padding,
  background,
  width = 'auto',
  height,
  display,
  alignItems,
  flexDirection,
  flex,
  className = '',
  justifyContent,
}) => (
  <div className={className} style={{ padding, height, background, width, display, alignItems, flexDirection, flex, justifyContent }}>{children}</div>
);
