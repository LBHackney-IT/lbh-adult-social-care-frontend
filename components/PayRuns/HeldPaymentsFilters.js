import axios from 'axios';
import React from 'react';
import AsyncSelect from 'react-select/async';
import { BASE_URL } from '../../api/BaseApi';
import { usePackageGetAll, usePaymentDepartments } from '../../api/SWR';
import { Button } from '../Button';
import DatePick from '../DatePick';
import Dropdown from '../Dropdown';
import { CaretDownIcon } from '../Icons';

const HeldPaymentsFilters = ({ filters, changeFilter, clearFilters, applyFilters, hasFields }) => {

  const { options: packageTypeOptions } = usePackageGetAll();
  const { options: waitingOnOptions } = usePaymentDepartments();

  const dropdowns = [
    { text: 'Service type', options: packageTypeOptions, key: 'serviceType' },
    { text: 'Waiting on', options: waitingOnOptions, key: 'waitingOn' },
    { text: 'Service User', key: 'serviceUser', endpoint: 'clients' },
    { text: 'Supplier', key: 'supplier', endpoint: 'suppliers' },
  ];

  return (
    <>
      <div className="held-payments__filters">
        <DatePick
          classes='pay-run__filter-item mr-3'
          dateValue={filters.dateFrom}
          placeholder='Data range'
          startDate={filters.dateFrom}
          endDate={filters.dateTo}
          setDate={(dateRange) => {
            const [dateFrom, dateTo] = dateRange;
            changeFilter('dateFrom', dateFrom);
            changeFilter('dateTo', dateTo);
          }}
          selectsRange
        />
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
                key={key}
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
      <div className='held-payments__filters-button--group'>
        <Button onClick={applyFilters}>Filter</Button>
        {hasFields && <Button className='ml-3 outline gray' onClick={clearFilters}>Clear</Button>}
      </div>
    </>
  );
};

export default HeldPaymentsFilters;
