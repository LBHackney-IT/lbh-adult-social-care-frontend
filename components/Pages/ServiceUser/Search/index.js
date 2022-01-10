import React from 'react';
import { Button, Container, DatePicker, FormGroup, Input } from '../../../HackneyDS';

const defaultInputs = [
  { label: 'First name', key: 'firstName' },
  { label: 'Last name', key: 'lastName' },
  { label: 'Hackney ID', key: 'hackneyId' },
];

const ServiceUserSearch = ({ filters, inputs = defaultInputs, changeFilters, clearFilters, isLoading, onSearch }) => (
  <Container className="service-user-search">
    <Container className="service-user-search__inputs">
      <h3 className="search-service-user__title">Search for a service user</h3>
      <Container className="search-service-user__filters">
        {inputs.map(({ key, label }) => (
          <Input key={key} value={filters[key]} onChangeValue={(value) => changeFilters(key, value)} label={label} />
        ))}
        <FormGroup>
          <DatePicker
            setDate={(value) => changeFilters('dateOfBirth', value)}
            date={filters.dateOfBirth}
            calendarStylePosition={{ left: 32 }}
            label="Date of birth"
          />
        </FormGroup>
        <Input label="Postcode" value={filters.postcode} onChangeValue={(value) => changeFilters('postcode', value)} />
        {Object.values(filters).some((value) => value) && (
          <Button onClick={clearFilters} outline color="gray" className="clear-button">
            Clear
          </Button>
        )}
      </Container>
    </Container>
    <Button isLoading={isLoading} disabled={isLoading} className="search-service-user__button" onClick={onSearch}>
      Search
    </Button>
  </Container>
);

export default ServiceUserSearch;
