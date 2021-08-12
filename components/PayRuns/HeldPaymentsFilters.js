import React from 'react'
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../api/BaseApi';
import { usePackageGetAll, usePaymentDepartments } from '../../api/SWR';
import Dropdown from '../Dropdown';
import { Button } from '../Button';
import { CaretDownIcon } from '../Icons';

const HeldPaymentsFilters = ({
  filters,
  changeFilter,
  hasFields,
  clearFilters,
  applyFilters,
  dateRangeOptions
}) => {
  const { options: packageTypeOptions } = usePackageGetAll();
  const { options: waitingOnOptions } = usePaymentDepartments();

  const dropdowns = [
    // todo: replace with Date Picker to select a range
    { text: 'Date Range', options: dateRangeOptions, key: 'dateRange' },
    { text: 'Service type', options: packageTypeOptions, key: 'serviceType' },
    { text: 'Waiting on', options: waitingOnOptions, key: 'waitingOn' },
    { text: 'Service User', key: 'serviceUser', endpoint: 'clients' },
    { text: 'Supplier', key: 'supplier', endpoint: 'suppliers' },
  ];

  return (
    <>
      <div className="held-payments__filters">
        {dropdowns.map(({ text, options, key, endpoint }) => {
          if (endpoint) {
            const isClient = endpoint === 'clients';
            const filterKey = isClient ? 'clientName' : 'supplierName';

            const loadOptions = async (searchText) => {
              const { data } = await axios.get(`${BASE_URL}/v1/${endpoint}/get-all`, {
                params: { [filterKey]: searchText },
              });
              return data.data;
            };

            return (
              <AsyncSelect
                onChange={(option) => changeFilter(key, option.id)}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => (isClient ? `${option.firstName} ${option.lastName}` : option.supplierName)}
                loadOptions={loadOptions}
                components={{ DropdownIndicator: CaretDownIcon }}
                classNamePrefix="held-payments-select"
                className="held-payments-select"
                placeholder={text}
                defaultOptions
                cacheOptions
              />
            );
          }

          return (
            <Dropdown
              key={key}
              initialText={text}
              options={options}
              classes="pay-runs__dropdown-type mr-3"
              selectedValue={filters[key]}
              onOptionSelect={(option) => changeFilter(key, option)}
            />
          );
        })}
      </div>

      <div className='button-group'>
        <Button onClick={applyFilters}>Filter</Button>
        {hasFields && <Button className='outline gray ml-3' onClick={clearFilters}>Clear</Button> }
      </div>
    </>
  );
};

export default HeldPaymentsFilters;
