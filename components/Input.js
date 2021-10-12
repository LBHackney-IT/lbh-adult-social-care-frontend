import React, { useRef } from 'react';
import BaseField from './baseComponents/BaseField';
import { Button } from './Button';
import { HackneySearch } from './Icons';
import ErrorField from './ErrorField';

const Input = ({
  label,
  placeholder = '',
  onChange = () => {},
  onClick,
  className = '',
  value = '',
  preSign = '',
  search,
  onBlur = () => {},
  error,
  maxLength,
  setError,
  postSign = '',
  type = 'text',
}) => {
  const searchRef = useRef(null);
  const onChangeInput = (event) => {
    const { target: { value } } = event;
    event.preventDefault();
    let formattedValue = value;
    for(const sign of preSign) {
      formattedValue = formattedValue.replace(sign, '');
    }
    const formattedAfterPreSign = formattedValue;
    for(const sign of postSign) {
      formattedValue = formattedValue.replace(sign, '');
    }

    if(preSign && postSign && formattedAfterPreSign === formattedValue) {
      formattedValue = formattedValue.slice(0, -1);
    }

    setError && setError();
    onChange(formattedValue);
  };

  const focusInput = (e) => {
    if (searchRef?.current) {
      searchRef.current.focus();
    }
    return onClick && onClick(e);
  };

  return (
    <BaseField onClick={focusInput} className={`${className}`} label={label}>
      <div className={search ? ' custom-input__search' : ''}>
        <input
          onBlur={onBlur}
          className="custom-input input"
          placeholder={placeholder}
          onChange={onChangeInput}
          maxLength={maxLength}
          value={`${preSign}${value}${postSign}`}
          type={type}
          ref={searchRef}
        />
        {search && (
          <Button onClick={search} className="custom-input__search-button">
            <HackneySearch />
          </Button>
        )}
      </div>
      {error && <ErrorField text={error} />}
    </BaseField>
  );
};

export default Input;
