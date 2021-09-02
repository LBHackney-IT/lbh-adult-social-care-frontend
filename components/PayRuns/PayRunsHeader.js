import React, { useEffect, useState } from 'react';
import { Button } from '../Button';
import PayRunsFilters from './PayRunsFilters';
import HeldPaymentsFilters from './HeldPaymentsFilters';
import { checkEmptyFields } from '../../service/inputValidator'

const initialFilters = {
  id: '',
  type: '',
  status: '',
  dateFrom: null,
  dateTo: null,
  serviceType: '',
  waitingOn: '',
  serviceUser: '',
  supplier: '',
  unread: false,
};

const PayRunsHeader = ({
  typeOptions = [],
  statusOptions = [],
  releaseHolds,
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [field]: value,
    }));
  };

  const [hasFields, setHasFields] = useState(false);

  const clearFilters = () => {
    setHasFields(false);
    setFilters({...initialFilters});
  }

  useEffect(() => {
    const empty = checkEmptyFields(filters);
    if(empty) {
      setHasFields(false);
    } else {
      setHasFields(true);
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
          filters={filters}
          applyFilters={applyFilters}
          clearFilters={clearFilters}
          hasFields={hasFields}
          changeFilter={changeFilter}
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
