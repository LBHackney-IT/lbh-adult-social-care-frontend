import React from 'react';
import { Container, FormGroup, SearchBox, Select } from '../../HackneyDS';
import DatePick from '../../DatePick';
import ResetFilterButton from '../../ResetFilterButton';

const statusOptions = [
  { text: 'Waiting For Approval', value: '3' },
  { text: 'Approved', value: '4' },
  { text: 'Not Approved', value: '5' },
];

const ApprovalsFilter = ({
  searchText,
  setSearchText,
  onSearch,
  filters,
  changeFilterField,
  approverOptions,
  setFilters,
  onClearFilters,
  packageOptions,
}) =>
  <Container className="brokerage-portal__filters">
  <div className="brokerage-portal__filters-block">
    <FormGroup className="form-group--inline-label">
      <SearchBox
        placeholder="Search service user"
        label="Search"
        value={searchText}
        onChangeValue={setSearchText}
        search={onSearch}
      />
    </FormGroup>
    <FormGroup className="form-group--inline-label brokerage-portal__form-status" label="Status">
      <Select
        options={statusOptions}
        value={filters.status}
        onChangeValue={(value) => changeFilterField('status', value)}
      />
    </FormGroup>
    <FormGroup className="form-group--inline-label" label="Approver">
      <Select
        value={filters.approverId}
        options={approverOptions}
        onChangeValue={(value) => changeFilterField('approverId', value)}
      />
    </FormGroup>
  </div>
  <div className="brokerage-portal__filters-block">
    <FormGroup className="form-group--inline-label date-from" label="From">
      <DatePick
        placeholder="Select date"
        startDate={filters.dateFrom}
        dateValue={filters.dateFrom}
        setDate={(value) => {
          if (filters.dateTo && value > filters.dateTo) {
            setFilters((prevState) => ({
              ...prevState,
              dateTo: value,
              dateFrom: value,
            }));
          } else {
            changeFilterField('dateFrom', value);
          }
        }}
      />
    </FormGroup>
    <FormGroup className="form-group--inline-label" label="To">
      <DatePick
        placeholder="Select date"
        startDate={filters.dateTo}
        dateValue={filters.dateTo}
        minDate={filters.dateFrom}
        setDate={(value) => changeFilterField('dateTo', value)}
      />
    </FormGroup>

    <FormGroup className="form-group--inline-label" label="Package">
      <Select
        value={filters.packageType}
        options={packageOptions}
        onChangeValue={(value) => changeFilterField('packageType', value)}
      />
    </FormGroup>
    <ResetFilterButton filters={filters} onClearFilters={onClearFilters} />
  </div>
</Container>

export default ApprovalsFilter;