import React from 'react';

export const Container = ({
  children,
  padding,
  background,
  width = 'auto',
  display,
  alignItems,
  flexDirection,
  flex,
  justifyContent,
}) => (
  <div style={{ padding, background, width, display, alignItems, flexDirection, flex, justifyContent }}>{children}</div>
);
