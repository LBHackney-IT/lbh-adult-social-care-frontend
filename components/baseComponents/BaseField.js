import React from "react";
import "../assets/field.scss";

const BaseField = ({ onClick = () => {}, classes = '', label, noInputStyle = false, children }) => {
  const hasLabel = label !== undefined;
  let className = "control field-container" + (hasLabel ? " has-label" : "");

  if (noInputStyle) {
    className += " no-input-style";
  }

  return (
    <div onClick={onClick} className={`${className} ${classes}`}>
      {hasLabel ? <label>{label}</label> : null}
      {children}
    </div>
  );
};

export default BaseField;
