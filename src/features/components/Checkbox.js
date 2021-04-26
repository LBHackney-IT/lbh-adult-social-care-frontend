import { useState } from "react";
import "./assets/checkbox.scss";
import { CheckIcon } from "./Icons";

const Checkbox = ({ children, checked = false, onChange = () => {} }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onCheckedChange = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <label className="checkbox" onClick={onCheckedChange}>
      <div className="checkbox-check">{checked ? <CheckIcon /> : null}</div>
      {children !== undefined ? children : null}
    </label>
  );
};

export default Checkbox;
