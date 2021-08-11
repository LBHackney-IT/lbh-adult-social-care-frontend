import React, { useEffect, useState } from 'react'
import { Button } from '../Button';
import Input from '../Input';
import Dropdown from '../Dropdown';
import DatePick from '../DatePick'
import SearchSelector from '../SearchSelector'

const initialFilters = {
  serviceUser: '',
  invoiceNo: '',
  packageId: '',
  supplier: '',
  type: '',
  status: '',
  dateFrom: '',
  dateTo: '',
};

const PayRunHeader = ({
  supplierOptions = [],
  changeFilters,
  typeOptions = [],
  serviceUserOptions = [],
  statusOptions = [],
  actionButtonText = '',
  filter,
  clickActionButton = () => {},
}) => {
  const [filters, setFilters] = useState({ ...initialFilters });
  const [hasFields, setHasFields] = useState(false);

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
    for(const name in filters) {
      if(filters[name]) {
        setHasFields(true);
        break;
      }
    }
  }, [filters]);

  return (
    <div className="pay-runs__header p-3 pay-run__header">
      <div className="pay-runs__new-pay">
        <p className="title">Pay Runs</p>
        {actionButtonText && <Button onClick={clickActionButton}>{actionButtonText}</Button>}
      </div>
      <div>
        <div className="pay-run__searches mb-3">
          <SearchSelector
            placeholder='Service User'
            value={filters.serviceUser}
            options={serviceUserOptions}
            onOptionSelect={(option) => changeFilter('serviceUser', option)}
            className="pay-run__filter-item mr-3"
          />
          <SearchSelector
            placeholder='Supplier'
            value={filters.supplier}
            options={supplierOptions}
            onOptionSelect={(option) => changeFilter('supplier', option)}
            className="pay-run__filter-item mr-3"
          />
        </div>
        <div className="pay-run__dropdowns">
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
            placeholder='Data range'
            startDate={filters.dateFrom}
            endDate={filters.dateTo}
            setDate={(value) => {
              setFilters({
                ...filters,
                dateFrom: value[0],
                dateTo: value[1],
              })
            }}
            selectsRange
          />
          <Button onClick={applyFilters}>Filter</Button>
          {hasFields && <Button className='outline gray ml-3' onClick={() => {
            setFilters({...initialFilters})
            setHasFields(false);
          }}>Clear</Button> }
        </div>
      </div>
    </div>
  );
};

export default PayRunHeader;
