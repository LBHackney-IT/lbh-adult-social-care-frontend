import React from 'react';

export const Container = ({
  children,
  padding,
  color,
  tabIndex,
  background,
  width = 'auto',
  height,
  display,
  alignItems,
  alignSelf,
  onClick = () => {},
  flexDirection,
  flex,
  justifyContent,
  border,
  borderTop,
  borderBottom,
  borderRight,
  borderLeft,
  borderRadius,
  overflow,
  textOverflow,
  whiteSpace,
  maxWidth,
  minWidth,
  margin,
  cursor,
  title,
  gridTemplateColumns,
  columnGap,
  columnCount,
  textAlign,
  className = '',
}) => (
  <div
    title={title}
    onClick={onClick}
    tabIndex={tabIndex}
    onKeyPress={(e) => e.key === 'Enter' && onClick(e)}
    className={className}
    style={{
      padding,
      color,
      background,
      height,
      width,
      display,
      alignItems,
      alignSelf,
      flexDirection,
      flex,
      justifyContent,
      border,
      borderTop,
      borderBottom,
      borderLeft,
      borderRight,
      borderRadius,
      overflow,
      textOverflow,
      whiteSpace,
      maxWidth,
      minWidth,
      margin,
      gridTemplateColumns,
      columnGap,
      columnCount,
      textAlign,
      cursor,
    }}
  >
    {children}
  </div>
);
