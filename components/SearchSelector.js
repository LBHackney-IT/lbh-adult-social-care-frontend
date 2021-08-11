import React from 'react'
import SelectSearch from 'react-select-search/dist/cjs'
import Fuse from 'fuse.js'
import BaseField from './baseComponents/BaseField'

function fuzzySearch(options) {
  const fuse = new Fuse(options, {
    keys: ['name'],
    threshold: 0.3,
  });

  return (value) => {
    if (!value.length) {
      return options;
    }

    return fuse.search(value);
  };
}

const SearchSelector = ({ className = '', onOptionSelect = () => {}, options, label, value, placeholder }) => (
  <BaseField classes={`${className} dropdown-container`} label={label}>
    <SelectSearch
      options={options}
      value={value}
      search
      closeOnSelect
      renderOption={(optionItem, option, { selected }) => {
        const activeItemClass = selected ? ' dropdown-item-active' : '';
        const mainOption = option.item || option;
        return (
          <div
            className={`dropdown-item${activeItemClass}`}
            onMouseDown={(e) => {
              e.stopPropagation();
              onOptionSelect(mainOption);
              optionItem.onMouseDown(e);
            }}
          >
            {mainOption?.name || ''}
          </div>
        )
      }}
      emptyMessage={() => <p className='px-3'>Not found</p>}
      filterOptions={(selectorOptions) => fuzzySearch(selectorOptions)}
      placeholder={placeholder}
    />
  </BaseField>
)

export default SearchSelector