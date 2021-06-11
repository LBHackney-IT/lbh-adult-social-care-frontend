import React from "react";
import { useState } from "react";
import BaseField from "./baseComponents/BaseField";

const yesNoValues = [
  { text: "Yes", value: true },
  { text: "No", value: false },
];

const RadioButton = ({
  label,
  options,
  selectedValue,
  inline = true,
  onChange = () => {},
}) => {
  const [radioValue, setRadioValue] = useState(selectedValue);
  const hasSelectedValue = radioValue !== undefined;

  const radioChange = (radioItemValue) => {
    onChange(radioItemValue);
    setRadioValue(radioItemValue);
  };

  return (
    <BaseField label={label}>
      <div className={"radio-cont" + (inline ? "" : " not-inline")}>
        {options.map((radioItem, index) => {
          return (
            <label
              key={radioItem.value}
              className={
                "radio-item" + (index !== options.length ? " is-first" : "")
              }
              onClick={() => radioChange(radioItem.value)}
            >
              <div
                className={
                  "radio-select-cont" +
                  (hasSelectedValue && radioValue === radioItem.value
                    ? " is-active"
                    : "")
                }
              >
                <div className="radio-item-selected"></div>
              </div>
              {radioItem.text}
            </label>
          );
        })}
      </div>
    </BaseField>
  );
};

export { yesNoValues };
export default RadioButton;
