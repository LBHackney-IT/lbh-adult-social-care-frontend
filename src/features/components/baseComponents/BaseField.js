import "../assets/field.scss";

const BaseField = ({ label, noInputStyle = false, children }) => {
  const hasLabel = label !== undefined;
  let className = "control field-container" + (hasLabel ? " has-label" : "");

  if (noInputStyle) {
    className += " no-input-style";
  }

  return (
    <div className={className}>
      {hasLabel ? <label>{label}</label> : null}
      {children}
    </div>
  );
};

export default BaseField;
