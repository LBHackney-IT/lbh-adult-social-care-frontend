import Dropdown from "../../components/Dropdown";
import {Button} from "../../components/Button";
import React from "react";
import Checkbox from "../../components/Checkbox";

const HeldPaymentsFilters = ({
  filters,
  serviceTypesOptions,
  changeFilter,
  dateRangeOptions,
  waitingOnOptions,
  serviceUserOptions,
  applyFilters,
  supplierOptions,
  statusOptions,
}) => {
  return (
    <>
      <div className='held-payments__filters'>
        <Dropdown
          initialText='Date Range'
          options={dateRangeOptions}
          classes='pay-runs__dropdown-type mr-3'
          selectedValue={filters.dateRange}
          onOptionSelect={(option) => changeFilter('dateRange', option)}
        />
        <Dropdown
          initialText='Service type'
          classes='pay-runs__dropdown-cadence mr-3'
          options={serviceTypesOptions}
          selectedValue={filters.serviceType}
          onOptionSelect={(option) => changeFilter('serviceType', option)}
        />
        <Dropdown
          initialText='Status'
          classes='pay-runs__dropdown-status mr-3'
          options={waitingOnOptions}
          selectedValue={filters.status}
          onOptionSelect={(option) => changeFilter('status', option)}
        />
        <Dropdown
          initialText='Service User'
          classes='pay-runs__dropdown-date mr-3'
          options={serviceUserOptions}
          selectedValue={filters.serviceUser}
          onOptionSelect={(option) => changeFilter('serviceUser', option)}
        />
        <Dropdown
          initialText='Supplier'
          classes='pay-runs__dropdown-date mr-3'
          options={supplierOptions}
          selectedValue={filters.supplier}
          onOptionSelect={(option) => changeFilter('supplier', option)}
        />
        <Dropdown
          initialText='Status'
          classes='pay-runs__dropdown-date mr-3'
          options={statusOptions}
          selectedValue={filters.status}
          onOptionSelect={(option) => changeFilter('status', option)}
        />
        <Checkbox checked={filters.unread} onChange={value => changeFilter('unread', value)}><p>Unread</p></Checkbox>
      </div>
      <Button onClick={applyFilters}>Filter</Button>
    </>
  );
};

export default HeldPaymentsFilters;
