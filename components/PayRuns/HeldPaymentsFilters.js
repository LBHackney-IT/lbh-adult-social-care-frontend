import React from 'react';
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
}) => (
  <>
    <div className="held-payments__filters">
      <Dropdown
        initialText="Date Range"
        options={dateRangeOptions}
        classes="pay-runs__dropdown-type mr-3"
        selectedValue={filters.dateRange}
        onOptionSelect={(option) => changeFilter('dateRange', option)}
      />
      <Dropdown
        initialText="Service type"
        classes="pay-runs__dropdown-cadence mr-3"
        options={serviceTypesOptions}
        selectedValue={filters.serviceType}
        onOptionSelect={(option) => changeFilter('serviceType', option)}
      />
      <Dropdown
        initialText="Waiting on"
        classes="pay-runs__dropdown-status mr-3"
        options={waitingOnOptions}
        selectedValue={filters.waitingOn}
        onOptionSelect={(option) => changeFilter('status', option)}
      />
      <Dropdown
        initialText="Service User"
        classes="pay-runs__dropdown-date mr-3"
        options={serviceUserOptions}
        selectedValue={filters.serviceUser}
        onOptionSelect={(option) => changeFilter('serviceUser', option)}
      />
      <Dropdown
        initialText="Supplier"
        classes="pay-runs__dropdown-date mr-3"
        options={supplierOptions}
        selectedValue={filters.supplier}
        onOptionSelect={(option) => changeFilter('supplier', option)}
      />
    </div>
    <Button onClick={applyFilters}>Filter</Button>
  </>
);

export default HeldPaymentsFilters;
