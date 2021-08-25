import React from 'react';
import { TooltipIcon } from '../Icons'

const BaseField = ({ onClick = () => {}, tooltipText = '', classes = '', label, noInputStyle = false, children }) => {
  const hasLabel = label !== undefined;
  let className = `control field-container${hasLabel ? ' has-label' : ''}`;

  if (noInputStyle) {
    className += ' no-input-style';
  }

  return (
    <div onClick={onClick} className={`${className} ${classes}`}>
      {hasLabel ? <label className="text-bold">
        {label}
        {tooltipText && <TooltipIcon tooltipText={tooltipText} />}
      </label> : null}
      {children}
    </div>
  );
};

export default BaseField;
