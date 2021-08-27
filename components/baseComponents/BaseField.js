import React from 'react';
import ReactTooltip from 'react-tooltip';
import { TooltipIcon } from '../Icons';

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
      <ReactTooltip backgroundColor='#525A5B' wrapper='span' id={tooltipText} />
    </div>
  );
};

export default BaseField;
