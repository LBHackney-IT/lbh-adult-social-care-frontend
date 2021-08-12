import React from 'react'
import axios from 'axios'
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../api/BaseApi'
import { CaretDownIcon } from './Icons'

const loadOptions = async (searchText, endpoint) => {
  const filterKey = endpoint === 'clients' ? 'clientName' : 'supplierName';
  const { data } = await axios.get(`${BASE_URL}/v1/${endpoint}/get-all`, {
    params: { [filterKey]: searchText },
  });
  return data.data;
};

const AsyncUserSelector = ({ onChange, value, placeholder, endpoint = 'clients' }) => {
  return (
    <AsyncSelect
      onChange={(option) => onChange(option)}
      getOptionValue={(option) => option.id}
      getOptionLabel={(option) => endpoint === 'suppliers' ? option.supplierName : `${option.firstName} ${option.lastName}`}
      loadOptions={(searchText) => loadOptions(searchText, endpoint)}
      components={{ DropdownIndicator: CaretDownIcon }}
      classNamePrefix="held-payments-select"
      className="held-payments-select"
      value={value}
      placeholder={placeholder}
      defaultOptions
      cacheOptions
    />
  )
};

export default AsyncUserSelector;