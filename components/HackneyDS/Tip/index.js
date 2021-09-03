import React from "react";
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

export default function Tip({
  content,
  children,
  light = false,
  transparent = false,
  position = 'bottom',
  hideOnClick = false,
  trigger = 'mouseenter',
  interactive = false,
  className = '',
  arrow = true,
}) {
  let theme = 'dark';
  if(light) theme = 'light';
  if(transparent) theme = 'transparent';

  return (
    <Tooltip
      arrow={arrow}
      theme={theme}
      interactive={interactive}
      trigger={trigger}
      position={position}
      hideOnClick={hideOnClick}
      html={content}
      className={className}
    >
      {children}
    </Tooltip>
  );
}