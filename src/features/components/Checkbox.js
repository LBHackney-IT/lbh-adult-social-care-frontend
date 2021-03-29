import { useState } from "react";

const Checkbox = ({ id, children, checked = false, onChange = () => {} }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const onCheckedChange = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <label className="checkbox">
      <input
        id={id}
        type="checkbox"
        checked={isChecked}
        onChange={onCheckedChange}
      />
      {children}
    </label>
  );
};

export default Checkbox;
