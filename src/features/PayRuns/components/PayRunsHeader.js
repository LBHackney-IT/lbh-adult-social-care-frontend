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

const PayRunsHeader = ({
  typeOptions = [],
  cadenceOptions = [],
  statusOptions = [],
  dateOptions = [],
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

  const newPayRun = () => {
    console.log('new pay run');
  };

  return (
    <div className='pay-runs__header p-3'>
      <div className='pay-runs__new-pay'>
        <p className='title'>Pay Runs</p>
        <Button onClick={newPayRun}>New Pay Run</Button>
      </div>
      <div className='pay-runs__filters'>
        <p className='pay-runs__filters-title'>Filter by</p>
        <Input classes='mr-3' value={filters.id} search={searchId} placeholder='ID' onChange={(value) => changeFilter('id', value)} />
        <Dropdown
          initialText='Type'
          options={typeOptions}
          classes='pay-runs__dropdown-type mr-3'
          selectedValue={filters.type}
          onOptionSelect={(option) => changeFilter('type', option)}
        />
        <Dropdown
          initialText='Cadence'
          classes='pay-runs__dropdown-cadence mr-3'
          options={cadenceOptions}
          selectedValue={filters.cadence}
          onOptionSelect={(option) => changeFilter('cadence', option)}
        />
        <Dropdown
          initialText='Status'
          classes='pay-runs__dropdown-status mr-3'
          options={statusOptions}
          selectedValue={filters.status}
          onOptionSelect={(option) => changeFilter('status', option)}
        />
        <Dropdown
          initialText='Date'
          classes='pay-runs__dropdown-date mr-3'
          options={dateOptions}
          selectedValue={filters.date}
          onOptionSelect={(option) => changeFilter('date', option)}
        />
        <Button onClick={applyFilters}>Apply</Button>
      </div>
    </div>
  )
};

export default PayRunsHeader;
