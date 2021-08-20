import AsyncSelect from 'react-select/async';
import React from 'react';

function getMonogram(label, length) {
  const monogram = label.match(/\b(\w)/g);
  monogram.length = length;
  return (
    <span className="custom-autocomplete-monogram">
      <span className="custom-autocomplete-monogram__value">{monogram}</span>
    </span>
  );
}

function customOptionElement({ label, value, selectOption }) {
  return (
    <div onClick={() => selectOption(value)} className="custom-option">
      {getMonogram(label, 2)}
      <span className="custom-option__label">{label}</span>
    </div>
  );
}

export default function AutocompleteSelect({ placeholder, options = [], value, selectProvider }) {
  function loadOptions(searchText) {
    return new Promise((res) =>
      res(options.filter((o) => o.text.toLowerCase().includes(searchText.toLowerCase())))
    );
  }

  return (
    <div className="custom-autocomplete-wrapper">
      <AsyncSelect
        instanceId='custom-autocomplete'
        onChange={(option) => selectProvider(option)}
        getOptionValue={(option) => option.value}
        getOptionLabel={(option) => option.text}
        loadOptions={(searchText) => loadOptions(searchText)}
        components={{ Option: customOptionElement }}
        classNamePrefix="custom-autocomplete-selector"
        className="custom-autocomplete-selector"
        value={options.find((e) => e.value === value)}
        placeholder={placeholder}
        defaultOptions={options}
        cacheOptions
      />
    </div>
  );
}
