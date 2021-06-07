import Dropdown from "../Dropdown";
import {Button} from "../Button";
import React from "react";

const BillsFilters = ({
  filters,
  packageIdOptions,
  changeFilter,
  supplierOptions,
  dateRangeOptions,
  statusOptions,
  applyFilters,
}) => {
  return (
    <div className='bills__filters'>
      <Dropdown
        initialText='Package ID'
        options={packageIdOptions}
        classes='bills__dropdown mr-3'
        selectedValue={filters.packageId}
        onOptionSelect={(option) => changeFilter('packageId', option)}
      />
      <Dropdown
        initialText='Supplier'
        classes='bills__dropdown mr-3'
        options={supplierOptions}
        selectedValue={filters.supplier}
        onOptionSelect={(option) => changeFilter('supplier', option)}
      />
      <Dropdown
        initialText='Date range'
        classes='bills__dropdown mr-3'
        options={dateRangeOptions}
        selectedValue={filters.dateRange}
        onOptionSelect={(option) => changeFilter('dateRange', option)}
      />
      <Dropdown
        initialText='Status'
        classes='bills__dropdown mr-3'
        options={statusOptions}
        selectedValue={filters.status}
        onOptionSelect={(option) => changeFilter('status', option)}
      />
      <Button onClick={applyFilters}>Filter</Button>
    </div>
  );
};

export default BillsFilters;
