import "../assets/field.scss";

const BaseField = ({ classes = '', label, noInputStyle = false, children }) => {
  const hasLabel = label !== undefined;
  let className = "control field-container" + (hasLabel ? " has-label" : "");

  if (noInputStyle) {
    className += " no-input-style";
  }

  return (
    <div className={`${className} ${classes}`}>
      {hasLabel ? <label>{label}</label> : null}
      {children}
    </div>
  );
};

export default BaseField;
