import React from 'react';
import { TooltipIcon } from './Icons';
import Tip from './HackneyDS/Tip';

const BaseField = ({
  style,
  onClick = () => {},
  tooltipText = '',
  className = '',
  label,
  noInputStyle = false,
  children,
}) => {
  const hasLabel = label !== undefined;
  let innerClassName = `control field-container${hasLabel ? ' has-label' : ''}`;

  if (noInputStyle) {
    innerClassName += ' no-input-style';
  }

  return (
    <div style={style} onClick={onClick} className={`${innerClassName} ${className}`}>
      {hasLabel ? (
        <label className="text-bold">
          <label>{label}</label>
          <Tip interactive content={<p>{tooltipText}</p>}>
            {tooltipText && <TooltipIcon tooltipText={tooltipText} />}
          </Tip>
        </label>
      ) : null}
      {children}
    </div>
  );
};

export default BaseField;
