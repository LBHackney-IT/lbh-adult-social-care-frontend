import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../api/BaseApi'
import { CaretDownIcon } from './Icons'

const loadOptions = async (searchText, endpoint) => {
  const { filterKey, endpointName } = endpoint;
  const { data } = await axios.get(`${BASE_URL}/v1${endpointName}`, {
    params: { [filterKey]: searchText },
  });
  return data.data;
};

const CustomAsyncSelector = ({ onChange, value, placeholder, getOptionLabel, endpoint }) => (
    <AsyncSelect
      instanceId={endpoint.filterKey}
      onChange={(option) => onChange(option)}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => getOptionLabel(option)}
      loadOptions={(searchText) => loadOptions(searchText, endpoint)}
      components={{ DropdownIndicator: CaretDownIcon }}
      classNamePrefix="custom-async-selector"
      className="custom-async-selector"
      value={value}
      placeholder={placeholder}
      defaultOptions
      cacheOptions
    />
  );

export default CustomAsyncSelector;