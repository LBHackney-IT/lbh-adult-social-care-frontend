import React from 'react';
import Input from '../Input';
import Dropdown from '../Dropdown';
import { Button } from '../Button';
import DatePick from '../DatePick';

const PayRunsFilters = ({
  filters,
  searchId,
  changeFilter,
  typeOptions,
  statusOptions,
  applyFilters,
  clearFilters,
  hasFields,
}) => {
    return (
      <>
          <Input
            classes="mr-3"
            value={filters.id}
            search={searchId}
            placeholder="ID"
            onChange={(value) => changeFilter('id', value)}
          />
          <Dropdown
            initialText="Type"
            options={typeOptions}
            classes="pay-runs__dropdown-type mr-3"
            selectedValue={filters.type}
            onOptionSelect={(option) => changeFilter('type', option)}
          />
          <Dropdown
            initialText="Status"
            classes="pay-runs__dropdown-status mr-3"
            options={statusOptions}
            selectedValue={filters.status}
            onOptionSelect={(option) => changeFilter('status', option)}
          />
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
          <Button className='mr-3' onClick={applyFilters}>Apply</Button>
          {hasFields && <Button className='outline gray' onClick={clearFilters}>Clear</Button> }
      </>
    );
}

export default PayRunsFilters;
