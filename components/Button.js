import React from 'react';
import Loading from './Loading'
// Get/build the passed class name
const getClassName = (className = '', linkBtn = false) => (linkBtn ? `link-button ${className}` : `button button-base ${className}`);

// Gets the inner content of a button for the given values
const getButtonContent = (Icon, text) => (
  <>
    <span className="button-icon" style={{ marginTop: '3px' }}>
      {Icon !== undefined ? <Icon /> : null}
    </span>
    {text}
  </>
);

const Button = ({ loading, onClick = () => {}, className, disabled = false, linkBtn = false, Icon, ...props }) => {
  const classNameValue = getClassName(className, linkBtn);
  const buttonContent = getButtonContent(Icon, props.children);

  return (
    <button className={classNameValue} onClick={onClick} disabled={disabled} type="button">
      {loading ? <Loading /> : buttonContent}
    </button>
  );
};

export { Button };
