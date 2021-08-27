import React from 'react';
import { TooltipIcon } from '../Icons';
import ReactTooltipNextJs from '../ReactTooltipNextJs';

const BaseField = ({ onClick = () => {}, tooltipText = '', classes = '', label, noInputStyle = false, children }) => {
  const hasLabel = label !== undefined;
  let className = `control field-container${hasLabel ? ' has-label' : ''}`;

  if (noInputStyle) {
    className += ' no-input-style';
  }

  return (
    <div onClick={onClick} className={`${className} ${classes}`}>
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
