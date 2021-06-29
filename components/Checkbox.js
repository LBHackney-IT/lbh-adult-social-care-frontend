import React, { useState } from "react";
import { CheckIcon } from "./Icons";
import ErrorField from "./ErrorField";

const Checkbox = ({ children, checked = false, error, setError, onChange = () => {} }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onCheckedChange = (event) => {
    onChange(!isChecked, event);
    setError && setError();
    setIsChecked(!isChecked);
  };

  return (
    <label className="checkbox" onClick={onCheckedChange}>
      <div className="checkbox-check">{checked ? <CheckIcon /> : null}</div>
      {children !== undefined ? children : null}
      {error && <ErrorField text={error} />}
    </label>
  );
};

export default Checkbox;
