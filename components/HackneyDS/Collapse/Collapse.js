import React, { useState } from 'react';
import { Container } from '../Layout/Container';
import { SelectArrowTriangle } from '../../Icons';
import { VerticalSeparator } from '../Layout/VerticalSeparator';

export const Collapse = ({
  children,
  collapseText = 'Collapse',
  expandText = 'Expand',
  title,
  className = '',
  expanded,
  isButtonClickOnly,
  isNegativeRotationAnimation,
  IconComponent = SelectArrowTriangle,
  setExpanded,
  style = {},
  isExpanded = false,
}) => {
  const [localExpanded, setLocalExpanded] = useState(isExpanded);

  const mainExpanded = expanded !== undefined ? expanded : localExpanded;

  const mainSetExpanded = setExpanded !== undefined ? setExpanded : setLocalExpanded;

  const iconAnimationClass = ` ${
    isNegativeRotationAnimation ? 'icon-animation-rotation-negative' : 'icon-animation-rotation'
  }`;
  const isButtonClickOnlyClass = isButtonClickOnly ? ' trigger-only-button' : '';

  const changeCollapse = () => mainSetExpanded((prevState) => !prevState);

  return (
    <Container className={className} {...style}>
      <Container
        width="fit-content"
        display="flex"
        alignItems="center"
        className={`collapse__button-container${isButtonClickOnlyClass}`}
        onClick={() => !isButtonClickOnly && changeCollapse()}
      >
        {title}
        {title && <VerticalSeparator width={20} />}
        <span onClick={() => isButtonClickOnly && changeCollapse()} className="lbh-color-blue collapse__button">
          {mainExpanded ? collapseText : expandText}
          <IconComponent className={`icon-transition${mainExpanded ? iconAnimationClass : ''}`} />
        </span>
      </Container>

      {mainExpanded && children}
    </Container>
  );
};
