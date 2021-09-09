import React, { useRef } from 'react';
import { ErrorMessage, Hint, Label } from '../index';
import { CrossIcon, SearchIcon } from '../icons';

export default function SearchBox({
  label = 'Search',
  id = 'search',
  name = 'search',
  hint,
  error,
  className = '',
  value,
  placeholder = 'Search...',
  handler,
  clear,
  search,
  searchIcon = <SearchIcon />,
  clearIcon = <CrossIcon />,
}) {
  const dataProvider = useRef();
  const outerClassName = className ? ` ${className}` : '';

  const buttonHandler = () => {
    if(clear && value) {
      clear();
    } else {
      search();
    }
  }

  return (
    <div className={`govuk-form-group lbh-form-group lbh-search-box${outerClassName}`}>
      {label && <Label htmlFor={id}>{label}</Label>}
      {hint && <Hint>{hint}</Hint>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className='lbh-search-box__container'>
        <input
          className="govuk-input lbh-input govuk-input--width-10"
          id={id}
          value={value}
          name={name}
          onChange={(e) => handler(e.target.value)}
          ref={dataProvider}
          type="search"
          placeholder={placeholder}
        />
        <button onClick={buttonHandler} className="lbh-search-box__action">
          <span className="govuk-visually-hidden">{value ? 'Clear search' : 'Search'}</span>
          {value && clear ? clearIcon : searchIcon}
        </button>
      </div>
    </div>
  );
}
