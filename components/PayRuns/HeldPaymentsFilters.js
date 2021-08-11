import React from 'react';
import { usePaymentDepartments } from '../../api/SWR';
import usePackageGetAll from '../../api/SWR/package/usePackageGetAll';
import Dropdown from '../Dropdown';
import { Button } from '../Button';

const HeldPaymentsFilters = ({
  filters,
  changeFilter,
  applyFilters,
  dateRangeOptions,
  serviceUserOptions,
  supplierOptions,
}) => {
  const { options: packageTypeOptions } = usePackageGetAll();
  const { options: waitingOnOptions } = usePaymentDepartments();

  const dropdowns = [
    { text: 'Date Range', options: dateRangeOptions, key: 'dateRange' },
    { text: 'Service type', options: packageTypeOptions, key: 'serviceType' },
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

      <Button onClick={applyFilters}>Filter</Button>
    </>
  );
};

export default HeldPaymentsFilters;
