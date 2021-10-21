import { useRouter } from 'next/router';
import React, { useCallback, useRef, useState } from 'react';
import BrokerageHeader from '../CarePackages/BrokerageHeader';
import { useBrokers } from '../../../api';
import { Breadcrumbs, Button, Container, HorizontalSeparator, SearchBox, Select, FormGroup } from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import { BrokerPortalTable } from './BrokerPortalTable';
import DatePick from '../../DatePick';
import Loading from '../../Loading';
import { SERVICE_USER_MASTER_SEARCH_ROUTE } from '../../../routes/RouteConstants';

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
  loading,
}) => {
  const [searchText, setSearchText] = useState('');

  const router = useRouter();

  const { options: brokerOptions } = useBrokers();

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
    router.push(SERVICE_USER_MASTER_SEARCH_ROUTE);
  }, []);

  const shouldShowClear = Object.values(filters).some((item) => !!item);

  return (
    <div className="broker-portal">
      <Loading isLoading={loading} />
      <BrokerageHeader />
      <Container background="#FAFAFA" padding="0 0 55px">
        <Container maxWidth="1080px" margin="0 auto">
          <Container padding="10px 60px 0px">
            <Breadcrumbs values={breadcrumbs} />
          </Container>

          <Container className="brokerage-portal__header">
            <h1>Broker Portal</h1>
            <Button onClick={goToBrokerPortalSearch}>Find a service user</Button>
          </Container>

          <Container className="brokerage-portal__filters">
            <div className="brokerage-portal__filters-block">
              <FormGroup className="form-group--inline-label">
                <SearchBox label="Search Packages" value={searchText} onChangeValue={setSearchText} search={onSearch} />
              </FormGroup>

              <FormGroup className="form-group--inline-label brokerage-portal__form-status" label="Status">
                <Select
                  emptyElement={null}
                  options={statusOptions}
                  value={filters.status}
                  onChange={({ target: { value } }) => changeFilterField('status', value)}
                />
              </FormGroup>

              <FormGroup className="form-group--inline-label" label="Broker">
                <Select
                  value={filters.broker}
                  options={brokerOptions}
                  onChange={(option) => changeFilterField('broker', option)}
                />
              </FormGroup>
            </div>

            <div className="brokerage-portal__filters-block">
              <FormGroup className="form-group--inline-label" label="From">
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
                  onClick={() => {
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

export default BrokerPortalPage;
