import React from "react";
import BaseField from "./baseComponents/BaseField";

const TextArea = ({
  rows = 3,
  label,
  placeholder = "",
  onChange = () => {},
  children,
}) => {
  const onTextAreaChange = (event) => {
    event.preventDefault();
    onChange(event.target.value);
  };

  return (
    <BaseField label={label}>
      <textarea
        rows={rows}
        placeholder={placeholder}
        onChange={onTextAreaChange}
      >
        {children !== undefined ? children : null}
      </textarea>
    </BaseField>
  );
};

export default TextArea;
