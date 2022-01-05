import React, { useCallback, useState } from 'react';
import { Container, FormGroup, HorizontalSeparator, SearchBox, Select, VerticalSeparator } from 'components';
import DatePick from 'components/DatePick';
import ResetFilterButton from '../../../ResetFilterButton';

const statusOptions = [
  { text: 'All', value: '' },
  { text: 'Held', value: '2' },
  { text: 'Released', value: '3' },
  { text: 'Rejected', value: '4' },
  { text: 'Accepted', value: '5' },
];

const typeOptions = [
  { text: 'All', value: '' },
  { text: 'Residential Care Package', value: '2' },
  { text: 'Nursing Care Package', value: '4' },
];

export const InvoiceFilters = ({ filters, setFilters, clearFilter }) => {
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
          <SearchBox placeholder="Number, User, Supplier" value={searchText} onChangeValue={setSearchText} search={onSearch} />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Status" inlineLabel smallLabel>
          <Select
            emptyElement={null}
            options={statusOptions}
            value={filters.invoiceStatus}
            onChange={({ target: { value } }) => changeFilterField('invoiceStatus', value)}
          />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="Package" inlineLabel smallLabel>
          <Select
            emptyElement={null}
            options={typeOptions}
            value={filters.packageType}
            onChange={({ target: { value } }) => changeFilterField('packageType', value)}
          />
        </FormGroup>
      </Container>
      <HorizontalSeparator height="25px" />
      <Container display="flex" alignItems="flex-end">
        <FormGroup label="From" inlineLabel smallLabel>
          <DatePick
            placeholder="Select date"
            startDate={filters.fromDate}
            dateValue={filters.fromDate}
            setDate={(value) => {
              if (filters.toDate && value > filters.toDate) {
                setFilters((prevState) => ({
                  ...prevState,
                  toDate: value,
                  fromDate: value,
                }));
              } else {
                changeFilterField('fromDate', value);
              }
            }}
          />
        </FormGroup>
        <VerticalSeparator width="20px" />
        <FormGroup label="To" inlineLabel smallLabel>
          <DatePick
            placeholder="Select date"
            startDate={filters.toDate}
            dateValue={filters.toDate}
            minDate={filters.fromDate}
            setDate={(value) => changeFilterField('toDate', value)}
          />
        </FormGroup>
        <VerticalSeparator width={20} />
        <ResetFilterButton onClearFilters={onClearFilters} filters={filters} />
      </Container>
    </Container>
  );
};
