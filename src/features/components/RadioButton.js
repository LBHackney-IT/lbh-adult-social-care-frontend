import { useState } from "react";
import BaseField from "./baseComponents/BaseField";
import "./assets/radioButton.scss";

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

  const radioChange = (checked) => {
    onChange(checked);
    setTrueIsChecked(checked);
  };

  return (
    <BaseField label={label}>
      <div className="radio-cont">
        <label
          className="radio-item is-first"
          onClick={() => radioChange(true)}
        >
          <div
            className={
              "radio-select-cont" + (trueIsCheckedValue ? " is-active" : "")
            }
          >
            <div className="radio-item-selected"></div>
          </div>
          {trueText}
        </label>
        <label className="radio-item" onClick={() => radioChange(false)}>
          <div
            className={
              "radio-select-cont" + (trueIsCheckedValue ? "" : " is-active")
            }
          >
            <div className="radio-item-selected"></div>
          </div>
          {falseText}
        </label>
      </div>
    </BaseField>
  );
};

export default RadioButton;
