import React, { useState } from 'react';
import { Container } from '../Layout/Container';
import { SelectArrowTriangle } from '../../Icons';

export const Collapse = ({
  children,
  collapseText = 'Collapse',
  expandText = 'Expand',
  title,
  className = '',
  expanded,
  triggerOnlyButton,
  isNegativeRotationAnimation,
  IconComponent = SelectArrowTriangle,
  setExpanded,
  style = {},
}) => {
  const [localExpanded, setLocalExpanded] = useState(false);

  const mainExpanded = expanded !== undefined ? expanded : localExpanded;

  const mainSetExpanded = setExpanded !== undefined ? setExpanded : setLocalExpanded;

  const iconAnimationClass = ` ${isNegativeRotationAnimation ? 'icon-animation-rotation-negative' : 'icon-animation-rotation'}`;
  const triggerOnlyButtonClass = triggerOnlyButton ? ' trigger-only-button' : '';

  const changeCollapse = () => mainSetExpanded(prevState => !prevState);

  return (
    <Container className={className} {...style}>
      <Container
        width="fit-content"
        display="flex"
        alignItems="center"
        className={`collapse__button-container${triggerOnlyButtonClass}`}
        onClick={() => !triggerOnlyButton && changeCollapse()}
      >
        {title}
        <span onClick={() => triggerOnlyButton && changeCollapse()} className="text-blue collapse__button">
          {mainExpanded ? collapseText : expandText}
          <IconComponent className={`icon-transition${mainExpanded ? iconAnimationClass : ''}`} />
        </span>
      </Container>

      {mainExpanded && children}
    </Container>
  );
};

