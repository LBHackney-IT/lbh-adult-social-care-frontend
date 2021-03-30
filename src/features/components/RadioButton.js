import { useState } from "react";
import BaseField from "./baseComponents/BaseField";

const RadioButton = ({
  label,
  name,
  trueText = "Yes",
  trueValue = "1",
  falseText = "No",
  falseValue = "0",
  trueIsChecked = true,
  onChange = () => {},
}) => {
  const [trueIsCheckedValue, setTrueIsChecked] = useState(trueIsChecked);

  const radioChange = (event) => {
    event.stopPropagation();
    onChange(!trueIsCheckedValue);
    setTrueIsChecked(!trueIsCheckedValue);
  };

  return (
    <BaseField label={label}>
      <label className="radio">
        <input
          type="radio"
          value={trueValue}
          name={name}
          onChange={radioChange}
          checked={trueIsCheckedValue}
        />
        {trueText}
      </label>
      <label className="radio">
        <input
          type="radio"
          value={falseValue}
          name={name}
          onChange={radioChange}
          checked={!trueIsCheckedValue}
        />
        {falseText}
      </label>
    </BaseField>
  );
};

export default RadioButton;
