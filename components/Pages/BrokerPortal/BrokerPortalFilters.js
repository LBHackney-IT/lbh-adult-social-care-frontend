import React, { useCallback, useState } from 'react';
import { useBrokers } from 'api';
import { Button, Container, SearchBox, Select, FormGroup, VerticalSeparator, HorizontalSeparator } from 'components';
import DatePick from '../../DatePick';

const statusOptions = [
  { text: 'All', value: '' },
  { text: 'New', value: '1' },
  { text: 'In Progress', value: '2' },
  { text: 'Waiting For Approval', value: '3' },
  { text: 'Approved', value: '4' },
  { text: 'Not Approved', value: '5' },
  { text: 'Ended', value: '6' },
  { text: 'Cancelled', value: '7' },
];

export const BrokerPortalFilters = ({ filters, setFilters, clearFilter }) => {
  const [searchText, setSearchText] = useState('');
  const { options: brokerOptions } = useBrokers();

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
    changeFilterField('serviceUserName', searchText);
  }, [changeFilterField, searchText]);

  const shouldShowClear = Object.values(filters).some((item) => item);
  return (
    <Container>
      <Container display="flex" alignItems="flex-end">
        <FormGroup label="Search" smallLabel>
          <SearchBox
            placeholder="Search by name..."
            value={searchText}
            onChangeValue={setSearchText}
            search={onSearch}
          />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Status" inlineLabel smallLabel>
          <Select
            emptyElement={null}
            options={statusOptions}
            value={filters.status}
            onChange={({ target: { value } }) => changeFilterField('status', value)}
          />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Broker" inlineLabel smallLabel>
          <Select
            value={filters.brokerId}
            options={brokerOptions}
            onChangeValue={(value) => changeFilterField('brokerId', value)}
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
          />{' '}
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
        {shouldShowClear && (
          <>
            <VerticalSeparator width="20px" />
            <Button outline secondary color="gray" className=" clear-filter-button" onClick={onClearFilters}>
              Clear
            </Button>
          </>
        )}
      </Container>
    </Container>
  );
};
