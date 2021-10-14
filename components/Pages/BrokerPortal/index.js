import React, { useRef, useState } from 'react';
import BrokerageHeader from '../CarePackages/BrokerageHeader/BrokerageHeader';
import { Button, Container, HorizontalSeparator, Select } from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import FormGroup from '../../HackneyDS/FormGroup';
import DatePick from '../../DatePick';
import { BrokerPortalTable } from './BrokerPortalTable';
import CustomAsyncSelector from '../../CustomAsyncSelect';
import { LOGOUT_ROUTE } from '../../../routes/RouteConstants';
import { isFunction } from '../../../api/Utils/FuncUtils';

export const BrokerPortalPage = ({
  items,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  statusOptions,
  filters,
  setFilters,
  clearFilter,
  createNewPackage,
  onRowClick = () => {},
}) => {
  const selectorRef = useRef(null);

  const handleRowClick = (rowItem) => {
    if (isFunction(onRowClick)) onRowClick(rowItem);
  };

  const changeFilterFiled = (field, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const [links] = useState([{ text: 'Log out', href: LOGOUT_ROUTE }]);

  return (
    <div className="brokerage-hub">
      <BrokerageHeader serviceName="" links={links} />
      <Container background="#FAFAFA">
        <Container
          maxWidth="1080px"
          margin="0 auto 16px auto"
          padding="30px 60px 15px 60px"
          className="brokerage-hub__header"
        >
          <h2>Broker Portal</h2>
          <Button handler={createNewPackage}>Create New Package</Button>
        </Container>
        <Container maxWidth="1080px" margin="0 auto" className="brokerage-hub__filters" padding="0 60px 30px 60px">
          <CustomAsyncSelector
            innerRef={selectorRef}
            onChange={(option) => changeFilterFiled('serviceUser', option)}
            placeholder="Service User"
            getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
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
                  return setFilters((prevState) => ({
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
          {Object.values(filters).some((item) => !!item) && (
            <Button
              className="outline gray clear-filter-button"
              handler={() => {
                clearFilter();
                selectorRef.current?.select?.select?.clearValue();
              }}
            >
              Clear
            </Button>
          )}
        </Container>
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        {items && <BrokerPortalTable onRowClick={handleRowClick} data={items} />}
        <HorizontalSeparator height="20px" />
        <AlternativePagination
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