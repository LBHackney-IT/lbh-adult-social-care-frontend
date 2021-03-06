import React, { useRef } from 'react';
import Hint from '../lettering/Hint';
import Label from '../lettering/Label';
import ErrorMessage from '../lettering/ErrorMessage';
import { CrossIcon, SearchIcon } from '../../Icons';
import { isFunction } from '../../../api';

export default function SearchBox({
  label = '',
  id = 'search',
  name = 'search',
  hint,
  error,
  className = '',
  value = '',
  placeholder = 'Search...',
  handler,
  onChangeValue,
  clear,
  search,
  required,
  searchIcon = <SearchIcon />,
  clearIcon = <CrossIcon />,
}) {
  const dataProvider = useRef();
  const outerClassName = className ? ` ${className}` : '';

  const buttonHandler = () => {
    if (clear && value) {
      clear();
      return;
    }

    if (isFunction(search)) search();
  };

  const onChange = (e) => {
    if (onChangeValue) {
      return onChangeValue(e.target.value);
    }
    return handler(e);
  };

  const onEnterPress = (e) => {
    if (e.key === 'Enter' && search) {
      e.preventDefault();
      search?.();
    }
  };

  return (
    <div className={`govuk-form-group lbh-form-group lbh-search-box${outerClassName}`}>
      {label && (
        <Label htmlFor={id} className={required ? 'text-required-after' : ''}>
          {label}
        </Label>
      )}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="lbh-search-box__container">
        <input
          className="govuk-input lbh-input"
          id={id}
          value={value || ''}
          name={name}
          onChange={onChange}
          onKeyPress={(e) => onEnterPress(e)}
          ref={dataProvider}
          type="search"
          placeholder={placeholder}
        />
        <div role="presentation" onClick={buttonHandler} className="lbh-search-box__action">
          {searchIcon && <span className="govuk-visually-hidden">{value ? 'Clear master-search' : 'Search'}</span>}
          {value && clear ? clearIcon : searchIcon}
        </div>
      </div>
    </div>
  );
}
