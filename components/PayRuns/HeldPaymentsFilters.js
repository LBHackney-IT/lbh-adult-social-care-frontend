import React from 'react';
import axios from 'axios';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../api/BaseApi';
import { usePackageGetAll, usePaymentDepartments } from '../../api/SWR';
import Dropdown from '../Dropdown';
import { Button } from '../Button';
import { CaretDownIcon } from '../Icons';

const HeldPaymentsFilters = ({ filters, changeFilter, applyFilters, dateRangeOptions }) => {
  const { options: packageTypeOptions } = usePackageGetAll();
  const { options: waitingOnOptions } = usePaymentDepartments();

  const dropdowns = [
    { text: 'Date Range', options: dateRangeOptions, key: 'dateRange' },
    { text: 'Service type', options: packageTypeOptions, key: 'serviceType' },
    { text: 'Waiting on', options: waitingOnOptions, key: 'waitingOn' },
    { text: 'Service User', key: 'serviceUser', endpoint: 'clients/get-all' },
    { text: 'Supplier', key: 'supplier', endpoint: 'suppliers/get-all' },
  ];

  return (
    <>
      <div className="held-payments__filters">
        {dropdowns.map(({ text, options, key, endpoint }) => {
          if (endpoint) {
            return (
              <AsyncSelect
                onChange={(option) => changeFilter(key, option.id)}
                getOptionValue={(option) => option.id}
                getOptionLabel={(option) => option[`${key}Name`]}
                loadOptions={async (searchText) => {
                  const { data } = await axios.get(`${BASE_URL}/v1/${endpoint}`, {
                    params: { searchBy: searchText },
                  });
                  return data.data;
                }}
                components={{ DropdownIndicator: CaretDownIcon }}
                classNamePrefix="held-payments-select"
                className="held-payments-select"
                placeholder={text}
                defaultOptions
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

      <Button onClick={applyFilters}>Filter</Button>
    </>
  );
};

export default HeldPaymentsFilters;
