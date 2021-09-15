import React from 'react';
import { TooltipIcon } from '../Icons';
import { Tip } from '../HackneyDS';

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
        <Tip interactive content={<p>{tooltipText}</p>}>
          {tooltipText && <TooltipIcon tooltipText={tooltipText} />}
        </Tip>
      </label> : null}
      {children}
    </div>
  );
};

export default BaseField;
