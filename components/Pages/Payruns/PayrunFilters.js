import React, { useCallback, useState } from 'react';
import { Container, FormGroup, HorizontalSeparator, SearchBox, Select, VerticalSeparator } from 'components';
import DatePick from 'components/DatePick';

const initialFilters = {
  status: '',
  dateFrom: null,
  dateTo: null,
  brokerId: '',
  serviceUserName: '',
};

export const PayrunFilters = () => {
  const [searchText, setSearchText] = useState('');
  const [filters, setFilters] = useState(initialFilters);
  const changeFilterField = useCallback(
    (field, value) => {
      setFilters((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    },
    [setFilters]
  );

  const onSearch = useCallback(() => {
    changeFilterField('serviceUserName', searchText);
  }, [changeFilterField, searchText]);

  return (
    <Container>
      <Container display="flex" alignItems="flex-end">
        <FormGroup label="Search" smallLabel>
          <SearchBox placeholder="Search by ID..." value={searchText} onChangeValue={setSearchText} search={onSearch} />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Status" inlineLabel smallLabel>
          <Select />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Type" inlineLabel smallLabel>
          <Select />
        </FormGroup>
      </Container>
      <HorizontalSeparator height="25px" />
      <Container display="flex" alignItems="flex-end">
        <FormGroup label="From" inlineLabel smallLabel>
          <DatePick placeholder="Select date" startDate={new Date()} dateValue={new Date()} />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="To" inlineLabel smallLabel>
          <DatePick placeholder="Select date" startDate={new Date()} dateValue={new Date()} />
        </FormGroup>
      </Container>
    </Container>
  );
};
