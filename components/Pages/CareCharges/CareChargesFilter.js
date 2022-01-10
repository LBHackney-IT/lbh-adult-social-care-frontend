import React from 'react';
import { Container, FormGroup, HorizontalSeparator, SearchBox, Select } from '../../HackneyDS';
import ResetFilterButton from '../../ResetFilterButton';

const userStatusOptions = [
  { text: 'New', value: 'New' },
  { text: 'Existing', value: 'Existing' },
];

const dateOptions = [
  { text: 'Newest first', value: 'desc' },
  { text: 'Oldest First', value: 'asc' },
];

const CareChargesFilter = ({
  searchText,
  setSearchText,
  onSearch,
  filters,
  changeFilter,
  modifiedByOptions,
  clearFilters,
}) => (
  <Container className="new-care-charge__selectors">
    <Container display="flex" alignItems="flex-end">
      <FormGroup className="search" label="Search" smallLabel>
        <SearchBox
          className="broker-portal"
          placeholder="Search by name..."
          value={searchText}
          onChangeValue={setSearchText}
          search={onSearch}
        />
      </FormGroup>
      <FormGroup label="Status" smallLabel>
        <Select options={userStatusOptions} onChangeValue={changeFilter('status')} value={filters.status} />
      </FormGroup>
      <FormGroup label="Date" smallLabel>
        <Select options={dateOptions} onChangeValue={changeFilter('orderByDate')} value={filters.orderByDate} />
      </FormGroup>
    </Container>
    <HorizontalSeparator height={25} />
    <Container display="flex">
      <FormGroup label="Modified by" smallLabel>
        <Select options={modifiedByOptions} onChangeValue={changeFilter('modifiedBy')} value={filters.modifiedBy} />
      </FormGroup>
      <ResetFilterButton filters={filters} onClearFilters={clearFilters} />
    </Container>
  </Container>
);

export default CareChargesFilter;
