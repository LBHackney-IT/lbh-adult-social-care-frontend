import React, { useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, HorizontalSeparator, Select } from '../../HackneyDS';
import Pagination from '../../Payments/Pagination';
import FormGroup from '../../HackneyDS/FormGroup';
import DatePick from '../../DatePick';
import { BrokerageHubTable } from './BrokerageHubTable';
import { useRouter } from 'next/router';
import CustomAsyncSelector from '../../CustomAsyncSelect';
import Breadcrumbs from '../../Breadcrumbs';

export const BrokerageHub = ({
  items,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  statusOptions,
  filters,
  setFilters,
  clearFilter,
  findServiceUser,
}) => {
  const router = useRouter();

  const onRowClick = (rowItem) => {
    // router.push({ pathname: `${router.pathname}/${rowItem.packageId}`, query: rowItem });
    router.push({
      pathname: `care-package/service-users/${rowItem?.serviceUserId}/core-package-details`,
      query: { packageId: rowItem.packageId },
    });
  };

  const changeFilterFiled = (field, value) => {
    setFilters(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [breadcrumbs] = useState([
    { text: 'Home', onClick: () => router.push('#') },
    { text: 'Broker Portal' },
  ]);

  return (
    <div className="brokerage-hub">
      <BrokerageHeader
        serviceName=''
        links={[
          { text: 'Broker Assistance', href: 'broker-assistance' },
          { text: 'Broker Portal', href: 'broker-portal' },
          { text: 'Care Charge Team', href: 'care-charge-team' },
          { text: 'Log Out', href: 'logout' },
        ]}
      />
      <Container padding="8px 60px 0 60px">
        <Breadcrumbs values={breadcrumbs} />
      </Container>
      <Container padding="30px 60px 60px 60px">
        <Container maxWidth="1080px" margin="0 auto 16px auto" className="brokerage-hub__header">
          <h2>Broker Portal</h2>
          <Button handler={findServiceUser}>Find a service user</Button>
        </Container>
        <Container maxWidth="1080px" margin="0 auto" className="brokerage-hub__filters">
          <CustomAsyncSelector
            onChange={(option) => changeFilterFiled('serviceUser', option)}
            placeholder="Service User"
            getOptionLabel={option => `${option.firstName} ${option.lastName}`}
            endpoint={{
              endpointName: '/clients/get-all',
              filterKey: 'clientName',
            }}
            value={filters.serviceUser}
          />
          <FormGroup className="form-group--inline-label brokerage-hub__form-status" label="Status">
            <Select
              options={statusOptions}
              value={filters.status}
              onChange={({ target: { value } }) => changeFilterFiled('status', value)}
            />
          </FormGroup>
          <FormGroup className="form-group--inline-label" label="From">
            <DatePick
              placeholder="Select date"
              startDate={filters.dateFrom}
              dateValue={filters.dateFrom}
              setDate={(value) => {
                if (value > filters.dateTo) {
                  return setFilters(prevState => ({
                    ...prevState,
                    dateTo: value,
                    dateFrom: value,
                  }));
                }
                changeFilterFiled('dateFrom', value);
              }}
            />
          </FormGroup>
          <FormGroup className="form-group--inline-label" label="To">
            <DatePick
              placeholder="Select date"
              startDate={filters.dateTo}
              dateValue={filters.dateTo}
              minDate={filters.dateFrom}
              setDate={(value) => changeFilterFiled('dateTo', value)}
            />
          </FormGroup>
          {Object.values(filters).some(item => !!item) &&
          <Button className="outline gray clear-filter-button" handler={clearFilter}>Clear</Button>
          }
        </Container>
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        {items && <BrokerageHubTable onRowClick={onRowClick} data={items}/>}
        <HorizontalSeparator height="20px"/>
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
