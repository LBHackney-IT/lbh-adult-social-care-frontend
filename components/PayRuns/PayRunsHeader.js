import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import PayRunsFilters from './PayRunsFilters';
import HeldPaymentsFilters from './HeldPaymentsFilters';

const initialFilters = {
  id: '',
  type: '',
  status: '',
  dateStart: '',
  dateEnd: '',
  date: '',
  dateRange: '',
  serviceType: '',
  waitingOn: '',
  serviceUser: '',
  supplier: '',
  unread: false,
};

const PayRunsHeader = ({
  typeOptions = [],
  statusOptions = [],
  dateRangeOptions = [],
  dateOptions = [],
  serviceTypesOptions = [],
  releaseHolds,
  serviceUserOptions = [],
  supplierOptions = [],
  waitingOnOptions = [],
  setOpenedPopup,
  apply,
  tab,
}) => {
  const [filters, setFilters] = useState({ ...initialFilters });

  const applyFilters = () => {
    apply?.(filters);
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

  const [hasFields, setHasFields] = useState(false);

  const clearFilters = () => {
    setHasFields(false);
    setFilters({...initialFilters});
  }

  useEffect(() => {
    for(const name in filters) {
      if(filters[name]) {
        setHasFields(true);
        break;
      }
    }
  }, [filters]);

  const tabInfos = {
    'pay-runs': {
      title: 'Pay Runs',
      actionButtonText: 'New Pay Run',
      clickActionButton: () => {
        setOpenedPopup('create-pay-run');
      },
      filtersComponent: (
        <PayRunsFilters
          dateOptions={dateOptions}
          statusOptions={statusOptions}
          applyFilters={applyFilters}
          hasFields={hasFields}
          changeFilter={changeFilter}
          filters={filters}
          clearFilters={clearFilters}
          searchId={searchId}
          typeOptions={typeOptions}
        />
      ),
    },
    'held-payments': {
      title: 'Held Payments',
      actionButtonText: 'Pay Released Holds',
      clickActionButton: releaseHolds,
      filtersComponent: (
        <HeldPaymentsFilters
          applyFilters={applyFilters}
          hasFields={hasFields}
          dateRangeOptions={dateRangeOptions}
          serviceTypesOptions={serviceTypesOptions}
          serviceUserOptions={serviceUserOptions}
          supplierOptions={supplierOptions}
          waitingOnOptions={waitingOnOptions}
          clearFilters={clearFilters}
          changeFilter={changeFilter}
          filters={filters}
          typeOptions={typeOptions}
        />
      ),
    },
  };

  useEffect(() => {
    clearFilters()
  }, [tab]);

  return (
    <div className="pay-runs__header p-3">
      <div className="pay-runs__new-pay">
        <p className="title">{tabInfos[tab].title}</p>
        <Button onClick={tabInfos[tab].clickActionButton}>{tabInfos[tab].actionButtonText}</Button>
      </div>
      <div className="pay-runs__filters">
        <p className="pay-runs__filters-title">Filter by</p>
        {tabInfos[tab].filtersComponent}
      </div>
    </div>
  );
};

export default PayRunsHeader;
