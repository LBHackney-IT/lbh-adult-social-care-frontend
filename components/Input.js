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
  classes = '',
  value = '',
  preSign = '',
  search,
  onBlur = () => {},
  error,
  setError,
  postSign = '',
  type = 'text',
}) => {
  const searchRef = useRef(null);
  const onChangeInput = (event) => {
    const {
      target: { value },
    } = event;
    event.preventDefault();
    let formattedValue = value;
    for(const sign of preSign) {
      formattedValue = formattedValue.replace(sign, '');
    }
    for(const sign of postSign) {
      formattedValue = formattedValue.replace(sign, '');
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
    <BaseField onClick={focusInput} classes={`${classes}`} label={label}>
      <div className={search ? ' custom-input__search' : ''}>
        <input
          onBlur={onBlur}
          className="custom-input input"
          placeholder={placeholder}
          onChange={onChangeInput}
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
