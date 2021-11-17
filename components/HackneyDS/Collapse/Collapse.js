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
  isNegativeRotationAnimation,
  IconComponent = SelectArrowTriangle,
  setExpanded,
}) => {
  const [localExpanded, setLocalExpanded] = useState(false);

  const mainExpanded = expanded !== undefined ? expanded : localExpanded;

  const mainSetExpanded = setExpanded !== undefined ? setExpanded : setLocalExpanded;

  const iconAnimationClass = ` ${isNegativeRotationAnimation ? 'icon-animation-rotation-negative' : 'icon-animation-rotation'}`;

  return (
    <Container className={className}>
      <Container
        width='fit-content'
        display='flex'
        alignItems='center'
        className='collapse__button-container'
        onClick={() => mainSetExpanded(prevState => !prevState)}
      >
        {title}
        <span className="collapse__button">
          {mainExpanded ? collapseText : expandText}
          <IconComponent className={`icon-transition${mainExpanded ? iconAnimationClass : ''}`} />
        </span>
      </Container>

      {mainExpanded && children}
    </Container>
  );
};

