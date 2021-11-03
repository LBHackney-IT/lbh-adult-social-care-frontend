import React, { useCallback, useState } from 'react';
import { useBrokers } from 'api';
import BrokerageHeader from '../CarePackages/BrokerageHeader';
import { Button, Container, HorizontalSeparator, SearchBox, Select, FormGroup } from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import { BrokerPortalTable } from './BrokerPortalTable';
import DatePick from '../../DatePick';
import Loading from '../../Loading';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';

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

export const BrokerPortalPage = ({
  items,
  title,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  filters,
  setFilters,
  clearFilter,
  onRowClick = () => {},
  loading,
  goToSearch,
}) => {
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
  }

  const onSearch = useCallback(() => {
    changeFilterField('serviceUserName', searchText);
  }, [changeFilterField, searchText]);

  const shouldShowClear = Object.values(filters).some((item) => item);

  return (
    <div className="broker-portal">
      <Loading isLoading={loading} />
      <BrokerageHeader />
      <DynamicBreadcrumbs />
      <Container background="#FAFAFA" padding="0 0 60px">
        <Container maxWidth="1080px" margin="0 auto">
          <Container className="brokerage-portal__header">
            <h1>{title}</h1>
            <Button onClick={goToSearch}>Find a service user</Button>
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

              {filters.brokerId !== undefined && (
                <FormGroup className="form-group--inline-label" label="Broker">
                  <Select
                    value={filters.brokerId}
                    options={brokerOptions}
                    onChangeValue={(value) => changeFilterField('brokerId', value)}
                  />
                </FormGroup>
              )}
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
                <Button outline secondary color='gray' className=" clear-filter-button" onClick={onClearFilters}>
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
