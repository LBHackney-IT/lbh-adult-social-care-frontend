import React from "react";
import { Tooltip } from 'react-tippy';
import 'react-tippy/dist/tippy.css';

export const Tip = ({
  content,
  children,
  interactive = false,
}) => (
  <Tooltip
    arrow
    theme='light'
    interactive={interactive}
    trigger='mouseenter'
    position='bottom'
    html={content}
  >
    {children}
  </Tooltip>
);