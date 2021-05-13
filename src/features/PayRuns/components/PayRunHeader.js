import React, {useState} from "react";
import {Button} from "../../components/Button";
import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";

const initialFilters = {
  id: '',
  type: '',
  cadence: '',
  status: '',
  date: '',
};

const PayRunHeader = ({
  typeOptions = [],
  cadenceOptions = [],
  statusOptions = [],
  dateOptions = [],
  actionButtonText = '',
  clickActionButton = () => {},
}) => {
  const [filters, setFilters] = useState({...initialFilters});

  const resetFilters = () => {
    setFilters({...initialFilters});
  };

  const applyFilters = () => {
    console.log('make an apply filters request');
  };

  const searchId = () => {
    console.log('search by id', filters.id);
  };

  const changeFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className='pay-runs__header p-3 pay-run__header'>
      <div className='pay-runs__new-pay'>
        <p className='title'>Pay Runs</p>
        <Button onClick={clickActionButton}>{actionButtonText}</Button>
      </div>
      <div>
        <div className='pay-run__searches mb-3'>
          <Input
            classes='mr-3 pay-run__filter-item'
            value={filters.id}
            search={searchId}
            placeholder='Service User'
            onChange={(value) => changeFilter('serviceUser', value)}
          />
          <Input
            classes='mr-3 pay-run__filter-item'
            value={filters.id}
            search={searchId}
            placeholder='Invoice No'
            onChange={(value) => changeFilter('invoiceNo', value)}
          />
          <Input
            classes='mr-3 pay-run__filter-item'
            value={filters.id}
            search={searchId}
            placeholder='Package ID'
            onChange={(value) => changeFilter('packageId', value)}
          />
        </div>
        <div className='pay-run__dropdowns'>
          <Dropdown
            initialText='Status'
            classes='pay-run__filter-item mr-3'
            options={statusOptions}
            selectedValue={filters.status}
            onOptionSelect={(option) => changeFilter('status', option)}
          />
          <Dropdown
            initialText='Date'
            classes='pay-run__filter-item mr-3'
            options={dateOptions}
            selectedValue={filters.date}
            onOptionSelect={(option) => changeFilter('date', option)}
          />
          <Dropdown
            initialText='Date'
            classes='pay-run__filter-item mr-3'
            options={dateOptions}
            selectedValue={filters.date}
            onOptionSelect={(option) => changeFilter('date', option)}
          />
          <Dropdown
            initialText='Date'
            classes='pay-run__filter-item mr-3'
            options={dateOptions}
            selectedValue={filters.date}
            onOptionSelect={(option) => changeFilter('date', option)}
          />
          <Button onClick={applyFilters}>Filter</Button>
        </div>
      </div>
    </div>
  )
};

export default PayRunHeader;
