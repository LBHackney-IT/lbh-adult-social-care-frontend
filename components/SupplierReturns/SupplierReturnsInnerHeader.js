import React, { useState } from 'react';
import { Button } from '../Button';
import Dropdown from '../Dropdown';

const initialFilters = {
  serviceUser: '',
  supplier: '',
  status: '',
};

const SupplierReturnsInnerHeader = ({ dateRangeOptions = [], careType, typeOptions = [], statusOptions = [] }) => {
  const [filters, setFilters] = useState({ ...initialFilters });

  const applyFilters = () => {
    console.log('make an apply filters request');
  };

  const changeFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  return (
    <div className="supplier-returns-dashboard__inner-header supplier-returns__inner-header">
      <div className="supplier-returns-dashboard__upload-evidence">
        <p className="title">{careType} Supplier Returns</p>
      </div>
      <div className="supplier-returns-dashboard__actions">
        <div className="supplier-returns__filters">
          <div className="supplier-returns__dropdowns">
            <Dropdown
              initialText="Service user"
              classes="mr-3"
              options={typeOptions}
              selectedValue={filters.serviceUser}
              onOptionSelect={(option) => changeFilter('serviceUser', option)}
            />
            <Dropdown
              initialText="Supplier"
              classes="mr-3"
              options={statusOptions}
              selectedValue={filters.supplier}
              onOptionSelect={(option) => changeFilter('supplier', option)}
            />
            <Dropdown
              initialText="Status"
              classes="mr-3"
              options={dateRangeOptions}
              selectedValue={filters.status}
              onOptionSelect={(option) => changeFilter('status', option)}
            />
            <Button onClick={applyFilters}>Filter</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierReturnsInnerHeader;
