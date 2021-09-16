import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import Dropdown from '../Dropdown';
import DatePick from '../DatePick';
import CustomAsyncSelector from '../CustomAsyncSelect';

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
  payRunDetails,
  changeFilters,
  typeOptions = [],
  statusOptions = [],
  actionButtonText = '',
  filter = () => {},
  clickActionButton = () => {},
}) => {
  const [filters, setFilters] = useState({ ...initialFilters });
  const [hasFields, setHasFields] = useState(false);

  const applyFilters = () => {
    filter(filters);
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
        <span className="pay-runs__new-pay_container">
          <p className="title">Pay Run {payRunDetails?.payRunId}</p>
          <p className="subtitle">{payRunDetails?.payRunStatusName}</p>
        </span>
        {actionButtonText && <Button onClick={clickActionButton}>{actionButtonText}</Button>}
      </div>
      <div>
        <div className="pay-run__searches">
          <CustomAsyncSelector
            onChange={(option) => changeFilter('serviceUser', option)}
            placeholder='Service User'
            getOptionLabel={option =>  `${option.firstName} ${option.lastName}`}
            endpoint={{
              endpointName: '/clients/get-all',
              filterKey: 'clientName',
            }}
            value={filters.serviceUser}
          />
          <CustomAsyncSelector
            value={filters.supplier}
            getOptionLabel={option => option.supplierName}
            onChange={(option) => changeFilter('supplier', option)}
            placeholder='Supplier'
            endpoint={{
              endpointName: '/suppliers/get-all',
              filterKey: 'supplierName',
            }}
          />
          <CustomAsyncSelector
            value={filters.invoiceNo}
            getOptionLabel={option => option.invoiceNo}
            onChange={(option) => changeFilter('invoiceNo', option)}
            placeholder='Invoice Number'
            endpoint={{
              endpointName: '/invoiceNo/get-all',
              filterKey: 'invoiceNo',
            }}
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
            className='pay-run__filter-item mr-3'
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
          <div className='inputs__button-container'>
            <Button onClick={applyFilters}>Filter</Button>
            {hasFields && <Button className='outline gray ml-3' onClick={() => {
              setFilters({...initialFilters})
              setHasFields(false);
            }}>Clear</Button> }
          </div>

        </div>
      </div>
    </div>
  );
};

export default PayRunHeader;
