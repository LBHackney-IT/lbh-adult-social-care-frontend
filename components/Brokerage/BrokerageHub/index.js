import React, { useState } from 'react';
import { useRouter } from 'next/router';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, HorizontalSeparator, SearchBox, Select } from '../../HackneyDS';
import Pagination from '../../Payments/Pagination';
import FormGroup from '../../HackneyDS/FormGroup';
import DatePick from '../../DatePick';
import { BrokerageHubTable } from './BrokerageHubTable';

export const BrokerageHub = ({
  items,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  statusOptions,
}) => {
  const router = useRouter();
  const [status, setStatus] = useState('');
  const [searchPackages, setSearchPackages] = useState('');
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);

  const onRowClick = (rowItem) => {
    // router.push({ pathname: `${router.pathname}/${rowItem.packageId}`, query: rowItem });
    router.push({
      pathname: `care-package/service-users/${rowItem?.serviceUserId}/core-package-details`,
      query: { packageId: rowItem.packageId },
    });
  };

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
      <Container background="#FAFAFA" padding="60px 60px 30px 60px">
        <Container className="brokerage-hub__header">
          <h2>Broker Portal</h2>
          <Button handler={findServiceUser}>Find a service user</Button>
        </Container>
        <Container className="brokerage-hub__filters">
          <SearchBox placeholder="Search" label="Search packages" handler={setSearchPackages} value={searchPackages} />
          <FormGroup className="form-group--inline-label brokerage-hub__form-status" label="Status">
            <Select options={statusOptions} value={status} onChange={({ target: { value } }) => setStatus(value)} />
          </FormGroup>
          <FormGroup className="form-group--inline-label brokerage-hub__date-from" label="From">
            <DatePick
              placeholder="Select date"
              startDate={dateFrom}
              dateValue={dateFrom}
              setDate={(value) => {
                if (value > dateTo) {
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
      </Container>
      <Container padding="30px 60px 60px 60px">
        {items && <BrokerageHubTable onRowClick={onRowClick} data={items} />}
        <HorizontalSeparator height="20px" />
        <Pagination
          pageSize={pageSize}
          totalPages={totalPages}
          currentPage={pageNumber}
          totalCount={totalCount}
          changePagination={setPageNumber}
        />
      </Container>
    </div>
  );
};
