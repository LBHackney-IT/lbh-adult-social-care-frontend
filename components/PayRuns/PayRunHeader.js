import React, { useState } from 'react';
import { Button } from '../Button';
import Input from '../Input';
import Dropdown from '../Dropdown';

const initialFilters = {
  serviceUser: '',
  invoiceNo: '',
  packageId: '',
  supplier: '',
  type: '',
  status: '',
  dateRange: '',
};

const PayRunHeader = ({
  supplierOptions = [],
  dateRangeOptions = [],
  typeOptions = [],
  statusOptions = [],
  actionButtonText = '',
  clickActionButton = () => {},
}) => {
  const [filters, setFilters] = useState({ ...initialFilters });

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
    <div className="pay-runs__header p-3 pay-run__header">
      <div className="pay-runs__new-pay">
        <p className="title">Pay Runs</p>
        <Button onClick={clickActionButton}>{actionButtonText}</Button>
      </div>
      <div>
        <div className="pay-run__searches mb-3">
          <Input
            classes="mr-3 pay-run__filter-item"
            value={filters.id}
            search={searchId}
            placeholder="Service User"
            onChange={(value) => changeFilter('serviceUser', value)}
          />
          <Input
            classes="mr-3 pay-run__filter-item"
            value={filters.id}
            search={searchId}
            placeholder="Invoice No"
            onChange={(value) => changeFilter('invoiceNo', value)}
          />
          <Input
            classes="mr-3 pay-run__filter-item"
            value={filters.id}
            search={searchId}
            placeholder="Package ID"
            onChange={(value) => changeFilter('packageId', value)}
          />
        </div>
        <div className="pay-run__dropdowns">
          <Dropdown
            initialText="Supplier"
            classes="pay-run__filter-item mr-3"
            options={supplierOptions}
            selectedValue={filters.supplier}
            onOptionSelect={(option) => changeFilter('supplier', option)}
          />
          <Dropdown
            initialText="Type"
            classes="pay-run__filter-item mr-3"
            options={typeOptions}
            selectedValue={filters.type}
            onOptionSelect={(option) => changeFilter('type', option)}
          />
          <Dropdown
            initialText="Status"
            classes="pay-run__filter-item mr-3"
            options={statusOptions}
            selectedValue={filters.status}
            onOptionSelect={(option) => changeFilter('status', option)}
          />
          <Dropdown
            initialText="Date range"
            classes="pay-run__filter-item mr-3"
            options={dateRangeOptions}
            selectedValue={filters.dateRange}
            onOptionSelect={(option) => changeFilter('dateRange', option)}
          />
          <Button onClick={applyFilters}>Filter</Button>
        </div>
      </div>
    </div>
  );
};

export default PayRunHeader;
