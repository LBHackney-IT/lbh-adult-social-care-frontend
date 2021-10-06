import React, { useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, SearchBox, Select } from '../../HackneyDS';
import Pagination from '../../Payments/Pagination';
import FormGroup from '../../HackneyDS/FormGroup';
import DatePick from '../../DatePick';
import { BrokerageHubTable } from './BrokerageHubTable';

const BrokerageHub = ({
  searchResults: {
    items,
    pageSize,
    totalPages,
    totalCount,
  },
  statusOptions,
  brokerOptions,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [status, setStatus] = useState('');
  const [searchPackages, setSearchPackages] = useState('');
  const [broker, setBroker] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const findServiceUser = async () => {
    alert('Find a service user');
  };

  return (
    <div className="brokerage-hub">
      <BrokerageHeader
        links={[
          { text: 'Broker Assistance', href: 'broker-assistance' },
          { text: 'Broker Portal', href: 'broker-portal' },
          { text: 'Care Charge Team', href: 'care-charge-team' },
          { text: 'Log Out', href: 'logout' },
        ]}
      />
      <Container className="brokerage__container-main">
        <Container className="brokerage-hub__header">
          <h2>Broker Portal</h2>
          <Button handler={findServiceUser}>Find a service user</Button>
        </Container>
        <Container className="brokerage-hub__filters">
          <SearchBox
            placeholder="Search"
            label="Search packages"
            handler={setSearchPackages}
            value={searchPackages}
          />
          <FormGroup className="form-group--inline-label brokerage-hub__form-status" label="Status">
            <Select
              options={statusOptions}
              value={status}
              onChange={({ target: { value } }) => setStatus(value)}
            />
          </FormGroup>
          <FormGroup className="form-group--inline-label" label="Broker">
            <Select
              options={brokerOptions}
              value={broker}
              onChange={({ target: { value } }) => setBroker(value)}
            />
          </FormGroup>
          <FormGroup className="form-group--inline-label brokerage-hub__date-from" label="From">
            <DatePick
              placeholder="Select date"
              startDate={dateFrom}
              dateValue={dateFrom}
              setDate={value => {
                if(value > dateTo) {
                  setDateTo(value);
                }
                setDateFrom(value);
              }}
            />
          </FormGroup>
          <FormGroup className="form-group--inline-label" label="To">
            <DatePick
              placeholder="Select date"
              startDate={dateTo}
              dateValue={dateTo}
              minDate={dateFrom}
              setDate={setDateTo}
            />
          </FormGroup>
        </Container>
        <BrokerageHubTable data={items}/>
        <Pagination
          pageSize={pageSize}
          totalPages={totalPages}
          currentPage={currentPage}
          totalCount={totalCount}
          changePagination={setCurrentPage}
        />
      </Container>
    </div>
  );
};

export default BrokerageHub;