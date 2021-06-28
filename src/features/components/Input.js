import React, { useRef } from "react";
import BaseField from "./baseComponents/BaseField";
import './assets/input.scss';
import {Button} from "./Button";
import {HackneySearch} from "./Icons";
import ErrorField from "./ErrorField";

const Input = ({
  label,
  placeholder = "",
  onChange = () => {},
  onClick,
  classes = '',
  value = '',
  preSign = '',
  search,
  error,
  setError,
  postSign = '',
  type = 'text',
}) => {
  const searchRef = useRef(null);
  const onChangeInput = (event) => {
    const {target: {value}} = event;
    event.preventDefault();
    const formattedValue = value.replace(preSign, '').replace(postSign, '');

    setError && setError();
    onChange(formattedValue);
  };

  const focusInput = (e) => {
    if(searchRef?.current) {
      searchRef.current.focus();
    }
    return onClick && onClick(e);
  };

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
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default Input;
