import React from 'react'
import Input from '../Input';
import Dropdown from '../Dropdown';
import { Button } from '../Button';

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
          {/* <Dropdown
            initialText="Date"
            classes="pay-runs__dropdown-date mr-3"
            options={dateOptions}
            selectedValue={filters.date}
            onOptionSelect={(option) => changeFilter('date', option)}
          /> */}

          {/* TODO delete if no need a datepicker */}
          {/* <DatePick */}
          {/*  dateValue={filters.date} */}
          {/*  setDate={(value) => changeFilter('date', value)} */}
          {/* /> */}
          <Button onClick={applyFilters}>Apply</Button>
          {hasFields && <Button className='outline gray ml-3' onClick={clearFilters}>Clear</Button> }
      </>
    );
}

export default PayRunsFilters;
