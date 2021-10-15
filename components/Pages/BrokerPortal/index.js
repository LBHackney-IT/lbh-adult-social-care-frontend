import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import BrokerageHeader from '../CarePackages/BrokerageHeader/BrokerageHeader';
import { Breadcrumbs, Button, Container, HorizontalSeparator, SearchBox, Select } from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import FormGroup from '../../HackneyDS/FormGroup';
import DatePick from '../../DatePick';
import { BrokerPortalTable } from './BrokerPortalTable';
import CustomAsyncSelector from '../../CustomAsyncSelect';
import { BROKER_PORTAL_SEARCH_ROUTE, LOGOUT_ROUTE } from '../../../routes/RouteConstants';

const statusOptions = [
  { text: 'All', value: '' },
  { text: 'New', value: '1' },
  { text: 'In Progress', value: '2' },
  { text: 'Submitted For Approval', value: '3' },
  { text: 'Approved', value: '4' },
  { text: 'Not Approved', value: '5' },
  { text: 'Ended', value: '6' },
  { text: 'Cancelled', value: '7' },
];

const links = [{ text: 'Log out', href: LOGOUT_ROUTE }];

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Broker Portal' }];

export const BrokerPortalPage = ({
  items,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  filters,
  setFilters,
  clearFilter,
  onRowClick = () => {},
}) => {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const selectorRef = useRef(null);

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

  const goToBrokerPortalSearch = useCallback(() => {
    router.push(BROKER_PORTAL_SEARCH_ROUTE);
  }, []);

  const shouldShowClear = Object.values(filters).some((item) => !!item);

  return (
    <div className="broker-portal">
      <BrokerageHeader serviceName="" links={links} />
      <Container background="#FAFAFA" padding="10px 0 55px">
        <Container maxWidth="1080px" margin="0 auto">
          <Container className="px-60 pt-10">
            <Breadcrumbs values={breadcrumbs} />
          </Container>

          <Container className="brokerage-hub__header">
            <h1>Broker Portal</h1>
            <Button handler={goToBrokerPortalSearch}>Find a service user</Button>
          </Container>

          <Container className="brokerage-hub__filters">
            <div className="brokerage-hub__filters-block">
              <FormGroup className="form-group--inline-label">
                <SearchBox label="Search Packages" value={searchText} onChangeValue={setSearchText} search={onSearch} />
              </FormGroup>

              <FormGroup className="form-group--inline-label brokerage-hub__form-status" label="Status">
                <Select
                  options={statusOptions}
                  value={filters.status}
                  onChange={({ target: { value } }) => changeFilterField('status', value)}
                />
              </FormGroup>

              <FormGroup className="form-group--inline-label" label="Broker">
                <CustomAsyncSelector
                  innerRef={selectorRef}
                  onChange={(option) => changeFilterField('broker', option)}
                  getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
                  endpoint={{
                    endpointName: '/clients/get-all',
                    filterKey: 'clientName',
                  }}
                  value={filters.broker}
                />
              </FormGroup>
            </div>

            <div className="brokerage-hub__filters-block">
              <FormGroup className="form-group--inline-label" label="From">
                <DatePick
                  placeholder="Select date"
                  startDate={filters.dateFrom}
                  dateValue={filters.dateFrom}
                  setDate={(value) => {
                    if (value > filters.dateTo) {
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

              <FormGroup className="form-group--inline-label" label="To">
                <DatePick
                  placeholder="Select date"
                  startDate={filters.dateTo}
                  dateValue={filters.dateTo}
                  minDate={filters.dateFrom}
                  setDate={(value) => changeFilterField('dateTo', value)}
                />
              </FormGroup>

              {shouldShowClear && (
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
            </div>
          </Container>
        </Container>
      </Container>

      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        {items && <BrokerPortalTable onRowClick={onRowClick} data={items} />}
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
