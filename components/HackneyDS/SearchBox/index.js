import React, { useRef } from 'react';
import { ErrorMessage, Hint, Label } from '../index';
import { CrossIcon, SearchIcon } from '../icons';

export default function SearchBox ({
  label = 'Search',
  id = 'search',
  name = 'search',
  hint,
  error,
  className = '',
  value,
  placeholder = 'Search...',
  handler,
  onChangeValue,
  clear,
  search,
  searchIcon = <SearchIcon/>,
  clearIcon = <CrossIcon/>,
}) {
  const dataProvider = useRef();
  const outerClassName = className ? ` ${className}` : '';

  const buttonHandler = () => {
    if (clear && value) {
      clear();
    } else {
      search();
    }
  };

  const onChange = (e) => {
    if (onChangeValue) {
      return onChangeValue(e.target.value);
    }
    handler(e);
  };

  return (
    <div className={`govuk-form-group lbh-form-group lbh-search-box${outerClassName}`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="lbh-search-box__container">
        <input
          className="govuk-input lbh-input"
          id={id}
          value={value}
          name={name}
          onChange={onChange}
          ref={dataProvider}
          type="search"
          placeholder={placeholder}
        />
        <div onClick={buttonHandler} className="lbh-search-box__action">
          <span className="govuk-visually-hidden">{value ? 'Clear search' : 'Search'}</span>
          {value && clear ? clearIcon : searchIcon}
        </div>
      </div>
    </div>
  );
}
