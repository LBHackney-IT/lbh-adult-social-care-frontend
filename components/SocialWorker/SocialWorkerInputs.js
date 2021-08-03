import React, { useEffect, useState } from 'react';
import Input from '../Input';
import Dropdown from '../Dropdown';

const initialFilters = {
  terms: '',
  status: '',
};

const SocialWorkerInputs = ({ statusOptions = [], searchTerm, searchFilters }) => {
  const [filters, setFilters] = useState({ ...initialFilters });

  const searchId = () => {
    searchTerm(filters.terms);
  };

  const onChangePagination = (item) => {
    changePagination(item);
  };

  const changeFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
    searchFilters(value);
  };

  useEffect(() => {
    setFilters({ ...initialFilters });
  }, []);

  return (
    <div className="pay-runs__header social-worker__header">
      <div className="pay-runs__new-pay">
        <p className="title">Submitted Package Requests</p>
      </div>
      <div className="pay-runs__filters social-worker__filters">
        <Input
          classes="mr-3"
          label="Search"
          value={filters.terms}
          search={searchId}
          placeholder="Enter search terms"
          onChange={(value) => changeFilter('terms', value)}
        />
        <Dropdown
          initialText="Status"
          classes="mr-3"
          options={statusOptions}
          selectedValue={filters.status}
          onOptionSelect={(option) => changeFilter('status', option)}
        />
      </div>
    </div>
  );
};

export default SocialWorkerInputs;
