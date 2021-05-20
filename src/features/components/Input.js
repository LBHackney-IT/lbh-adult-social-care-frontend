import React, { useRef } from "react";
import BaseField from "./baseComponents/BaseField";
import "./assets/input.scss";
import './assets/input.scss';
import {Button} from "./Button";
import {HackneySearch} from "./Icons";

const Input = ({
  label,
  placeholder = "",
  onChange = () => {},
  classes = "",
  value = "",
  preSign = "",
  search,
  postSign = "",
  type = "text",
}) => {
  const searchRef = useRef(null);
  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    event.preventDefault();
    const formattedValue = value.replace(preSign, "").replace(postSign, "");

    onChange(formattedValue);
  };

  const focusInput = () => {
    if(searchRef?.current) {
      searchRef.current.focus();
    }
  }

  return (
    <BaseField onClick={focusInput} classes={`${classes}${search ? ' custom-input__search' : ''}`} label={label}>
      <input
        className="custom-input input"
        placeholder={placeholder}
        onChange={onChangeInput}
        value={`${preSign}${value}${postSign}`}
        type={type}
        ref={searchRef}
      />
      {search &&
        <Button onClick={search} className='custom-input__search-button'>
          <HackneySearch />
        </Button>
      }
    </BaseField>
  );
};

export default Input;
