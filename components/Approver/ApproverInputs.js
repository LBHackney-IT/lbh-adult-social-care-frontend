import React from 'react';
import Input from '../Input';
import Dropdown from '../Dropdown';

const ApproverInputs = ({
  packageTypeOptions = [],
  socialWorkerOptions = [],
  byValueOptions = [],
  approverOptions = [],
  className = '',
  setFilters,
  filters,
}) => {
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
    <div className={`approver-hub__inputs ${className}`}>
      <div className="pay-runs__new-pay">
        <p className="title">Approved hub</p>
      </div>
      <div className="pay-runs__filters social-worker__filters">
        <Input
          classes="mr-3"
          label="Search"
          value={filters.id}
          search={searchId}
          placeholder="Enter name or Hackney ID"
          onChange={(option) => changeFilter('id', option)}
        />
        <Dropdown
          initialText="Package Type"
          classes="mr-3"
          options={packageTypeOptions}
          selectedValue={filters.packageType}
          onOptionSelect={(option) => changeFilter('packageType', option)}
        />
        <Dropdown
          initialText="Social Worker"
          classes="mr-3"
          options={socialWorkerOptions}
          selectedValue={filters.socialWorker}
          onOptionSelect={(option) => changeFilter('socialWorker', option)}
        />
        <Dropdown
          initialText="Approver"
          classes="mr-3"
          options={approverOptions}
          selectedValue={filters.approver}
          onOptionSelect={(option) => changeFilter('approver', option)}
        />
        <Dropdown
          initialText="By Value"
          classes="mr-3"
          options={byValueOptions}
          selectedValue={filters.byValue}
          onOptionSelect={(option) => changeFilter('byValue', option)}
        />
      </div>
    </div>
  );
};

export default ApproverInputs;
