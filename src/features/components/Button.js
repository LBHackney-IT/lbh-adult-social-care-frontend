import { NavLink } from "react-router-dom";
import "./assets/button.scss";

// Get/build the passed class name
const getClassName = (className = "") => {
  return `button button-base ${className}`;
};

// Gets the inner content of a button for the given values
const getButtonContent = (Icon, text) => {
  return (
    <>
      <span className="button-icon" style={{ marginTop: "3px" }}>
        {Icon !== undefined ? <Icon /> : null}
      </span>
      {text}
    </>
  );
};

const Button = ({
  onClick = () => {},
  className,
  disabled = false,
  Icon,
  ...props
}) => {
  const classNameValue = getClassName(className);
  const buttonContent = getButtonContent(Icon, props.children);

  return (
    <button className={classNameValue} onClick={onClick} disabled={disabled}>
      {buttonContent}
    </button>
  );
};

const NavLinkButton = ({ toRoute, className, Icon, ...props }) => {
  const classNameValue = getClassName(className);
  const buttonContent = getButtonContent(Icon, props.children);
  return (
    <>
      <NavLink to={toRoute} className={classNameValue}>
        {buttonContent}
      </NavLink>
    </>
  );
};

export { Button, NavLinkButton };
