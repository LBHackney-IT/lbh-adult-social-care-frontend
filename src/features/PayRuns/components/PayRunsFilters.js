import Input from "../../components/Input";
import Dropdown from "../../components/Dropdown";
import {Button} from "../../components/Button";
import React from "react";

const PayRunsFilters = ({ filters, searchId, changeFilter, typeOptions, cadenceOptions, statusOptions, dateOptions, applyFilters }) => {
  return (
    <>
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
    </>
  );
};

export default PayRunsFilters;
