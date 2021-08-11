import React from 'react'
import Dropdown from '../Dropdown';
import { Button } from '../Button';

const HeldPaymentsFilters = ({
  filters,
  serviceTypesOptions,
  changeFilter,
  dateRangeOptions,
  waitingOnOptions,
  serviceUserOptions,
  applyFilters,
  supplierOptions,
  clearFilters,
  hasFields,
}) => {
  const dropdowns = [
    { text: 'Date Range', options: dateRangeOptions, key: 'dateRange' },
    { text: 'Service type', options: serviceTypesOptions, key: 'serviceType' },
    { text: 'Waiting on', options: waitingOnOptions, key: 'waitingOn' },
    { text: 'Service User', options: serviceUserOptions, key: 'serviceUser' },
    { text: 'Supplier', options: supplierOptions, key: 'supplier' },
  ];

  return (
    <>
      <div className="held-payments__filters">
        {dropdowns.map(({ text, options, key }) => (
          <Dropdown
            key={key}
            initialText={text}
            options={options}
            classes="pay-runs__dropdown-type mr-3"
            selectedValue={filters[key]}
            onOptionSelect={(option) => changeFilter(key, option)}
          />
        ))}
      </div>

      <div className='button-group'>
        <Button onClick={applyFilters}>Filter</Button>
        {hasFields && <Button className='outline gray ml-3' onClick={clearFilters}>Clear</Button> }
      </div>
    </>
  );
};

export default HeldPaymentsFilters;
