import React, { useCallback, useState } from 'react';
import { Container, FormGroup, HorizontalSeparator, SearchBox, Select, VerticalSeparator } from 'components';
import DatePick from 'components/DatePick';
import ResetFilterButton from '../../ResetFilterButton';

const statusOptions = [
  { text: 'All', value: '' },
  { text: 'Draft', value: '1' },
  { text: 'In Progress', value: '2' },
  { text: 'Waiting For Review', value: '3' },
  { text: 'Waiting For Approval', value: '4' },
  { text: 'Approved', value: '5' },
  { text: 'Paid', value: '6' },
  { text: 'Paid With Hold', value: '7' },
  { text: 'Archived', value: '8' },
];

const typeOptions = [
  { text: 'All', value: '' },
  { text: 'Residential Recurring', value: '1' },
  { text: 'Residential Released Holds', value: '2' },
];

export const PayrunFilters = ({ filters, setFilters, clearFilter, tabView }) => {
  const [searchText, setSearchText] = useState('');
  const changeFilterField = useCallback(
    (field, value) => {
      setFilters((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    },
    [setFilters]
  );

  const onClearFilters = () => {
    setSearchText('');
    clearFilter();
  };

  const onSearch = useCallback(() => {
    changeFilterField('searchTerm', searchText);
  }, [changeFilterField, searchText]);

  return (
    <Container>
      <Container display="flex" alignItems="flex-end">
        <FormGroup label="Search" smallLabel>
          <SearchBox
            placeholder="Pay Run Number..."
            value={searchText}
            onChangeValue={setSearchText}
            search={onSearch}
          />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Status" inlineLabel smallLabel>
          <Select
            disabled={(tabView && tabView === 'Awaiting Approval') || tabView === 'Approved'}
            emptyElement={null}
            options={statusOptions}
            value={filters.payRunStatus}
            onChange={({ target: { value } }) => changeFilterField('payRunStatus', value)}
          />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Type" inlineLabel smallLabel>
          <Select
            emptyElement={null}
            options={typeOptions}
            value={filters.payRunType}
            onChange={({ target: { value } }) => changeFilterField('payRunType', value)}
          />
        </FormGroup>
      </Container>
      <HorizontalSeparator height="25px" />
      <Container display="flex" alignItems="flex-end">
        <FormGroup label="From" inlineLabel smallLabel>
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
        <VerticalSeparator width="20px" />
        <FormGroup label="To" inlineLabel smallLabel>
          <DatePick
            placeholder="Select date"
            startDate={filters.dateTo}
            dateValue={filters.dateTo}
            minDate={filters.dateFrom}
            setDate={(value) => changeFilterField('dateTo', value)}
          />
        </FormGroup>
        <VerticalSeparator width={20} />
        <ResetFilterButton filters={filters} onClearFilters={onClearFilters} />
      </Container>
    </Container>
  );
};
