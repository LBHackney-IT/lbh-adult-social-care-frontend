import React, { useEffect, useState } from 'react'
import { Button } from '../Button';
import Input from '../Input';
import Dropdown from '../Dropdown';
import DatePick from '../DatePick'

const initialFilters = {
  serviceUser: '',
  invoiceNo: '',
  packageId: '',
  supplier: '',
  type: '',
  status: '',
  dateFrom: new Date(),
  dateTo: '',
};

const PayRunHeader = ({
  supplierOptions = [],
  changeFilters,
  typeOptions = [],
  statusOptions = [],
  actionButtonText = '',
  filter,
  clickActionButton = () => {},
}) => {
  const [filters, setFilters] = useState({ ...initialFilters });

  const applyFilters = () => {
    filter(filters);
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

  useEffect(() => {
    changeFilters(filters)
  }, [filters]);

  return (
    <div className="pay-runs__header p-3 pay-run__header">
      <div className="pay-runs__new-pay">
        <p className="title">Pay Runs</p>
        {actionButtonText && <Button onClick={clickActionButton}>{actionButtonText}</Button>}
      </div>
      <div>
        <div className="pay-run__searches mb-3">
          <Input
            classes="mr-3 pay-run__filter-item"
            value={filters.serviceUser}
            search={searchId}
            placeholder="Service User"
            onChange={(value) => changeFilter('serviceUser', value)}
          />
          <Input
            classes="mr-3 pay-run__filter-item"
            value={filters.invoiceNo}
            search={searchId}
            placeholder="Invoice No"
            onChange={(value) => changeFilter('invoiceNo', value)}
          />
          <Input
            classes="mr-3 pay-run__filter-item"
            value={filters.packageId}
            search={searchId}
            placeholder="Package ID"
            onChange={(value) => changeFilter('packageId', value)}
          />
        </div>
        <div className="pay-run__dropdowns">
          <Dropdown
            initialText="Supplier"
            className="pay-run__filter-item mr-3"
            options={supplierOptions}
            selectedValue={filters.supplier}
            onOptionSelect={(option) => changeFilter('supplier', option)}
          />
          <Dropdown
            initialText="Type"
            className="pay-run__filter-item mr-3"
            options={typeOptions}
            selectedValue={filters.type}
            onOptionSelect={(option) => changeFilter('type', option)}
          />
          <Dropdown
            initialText="Status"
            className="pay-run__filter-item mr-3"
            options={statusOptions}
            selectedValue={filters.status}
            onOptionSelect={(option) => changeFilter('status', option)}
          />
          <DatePick
            classes='pay-run__filter-item mr-3'
            dateValue={filters.dateFrom}
            startDate={filters.dateFrom}
            endDate={filters.dateTo}
            setDate={(value) => {
              changeFilter('dateFrom', value[0])
              changeFilter('dateTo', value[1])
            }}
            selectsRange
          />
          <Button onClick={applyFilters}>Filter</Button>
        </div>
      </div>
    </div>
  );
};

export default PayRunHeader;
