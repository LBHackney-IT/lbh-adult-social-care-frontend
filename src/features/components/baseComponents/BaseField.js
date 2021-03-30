import "../assets/field.scss";

const BaseField = ({ label, children }) => {
  const hasLabel = label !== undefined;
  const className = "control field-container" + (hasLabel ? " has-label" : "");

  return (
    <div className={className}>
      {hasLabel ? <label>{label}</label> : null}
      {children}
    </div>
  );
};

export default BaseField;
