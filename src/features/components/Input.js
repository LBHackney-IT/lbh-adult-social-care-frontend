import React from "react";
import BaseField from "./baseComponents/BaseField";
import './assets/input.scss';

const Input = ({
  label,
  placeholder = "",
  onChange = () => {},
  value = '',
  preSign = '',
  postSign = '',
  type = 'text',
}) => {

  const onChangeInput = (event) => {
    const {target: {value}} = event;
    event.preventDefault();
    const formattedValue = value.replace(preSign, '').replace(postSign, '');

    onChange(formattedValue);
  };

  return (
    <BaseField label={label}>
      <input
        placeholder={placeholder}
        onChange={onChangeInput}
        value={`${preSign}${value}${postSign}`}
        type={type}
      />
    </BaseField>
  );
};

export default Input;
