import React from 'react';
import { TooltipIcon } from '../Icons';
import ReactTooltipNextJs from '../ReactTooltipNextJs';

const BaseField = ({
  onClick = () => {},
  tooltipText = '',
  className = '',
  label,
  noInputStyle = false,
  children
}) => {
  const hasLabel = label !== undefined;
  let innerClassName = `control field-container${hasLabel ? ' has-label' : ''}`;

  if (noInputStyle) {
    innerClassName += ' no-input-style';
  }

  return (
    <div onClick={onClick} className={`${innerClassName} ${className}`}>
      {hasLabel ? <label className="text-bold">
        <label>{label}</label>
        {tooltipText && <TooltipIcon tooltipText={tooltipText} />}
      </label> : null}
      {children}
      <ReactTooltipNextJs backgroundColor='#525A5B' id={tooltipText} />
    </div>
  );
};

export default BaseField;
