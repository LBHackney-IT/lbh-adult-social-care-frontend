import React from "react";
import { useState } from "react";
import BaseField from "./baseComponents/BaseField";
import ErrorField from "./ErrorField";

const yesNoValues = [
  { text: "Yes", value: true },
  { text: "No", value: false },
];

const RadioButton = ({
  label,
  options,
  selectedValue,
  error,
  className = '',
  setError,
  inline = true,
  onChange = () => {},
}) => {
  const [radioValue, setRadioValue] = useState(selectedValue);
  const hasSelectedValue = radioValue !== undefined;

  const radioChange = (radioItemValue) => {
    setError && setError();
    onChange(radioItemValue);
    setRadioValue(radioItemValue);
  };

  return (
    <BaseField label={label} classes={className}>
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
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export { yesNoValues };
export default RadioButton;
