import React, { memo } from 'react';
import {
  BROKER_PORTAL_ROUTE,
  CARE_PACKAGE_ROUTE,
  LOGOUT_ROUTE,
  getAssignPackageRoute,
  getServiceUserPackagesRoute,
  getHistoryRoute,
} from '../../../../routes/RouteConstants';
import { Button, Container, Header, Input, Breadcrumbs, DatePicker, FormGroup } from '../../../HackneyDS';
import ServiceUserDetails from '../../BrokerPortal/ServiceUserDetails';
import AlternativePagination from '../../../AlternativePagination';
import SearchResult from '../../../SearchResult';
import Loading from '../../../Loading';

const links = [
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Care Charges', href: CARE_PACKAGE_ROUTE },
  { text: 'Log Out', href: LOGOUT_ROUTE },
];

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Search for a service user' },
];

const inputs = [
  { label: 'First name', key: 'firstName' },
  { label: 'Last name', key: 'lastName' },
  { label: 'Hackney ID', key: 'hackneyId' },
];

const SearchServiceUser = ({
  isLoading,
  searchResults,
  pageNumber,
  setPageNumber,
  clearFilters,
  changeFilters,
  totalCount,
  totalPages,
  pushRoute,
  filters,
  onSearch,
}) => (
  <Container className="search-service-user">
    <Header links={links} />
    <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
      <Breadcrumbs values={breadcrumbs}/>
      <Container padding="60px 0 0">
        <h3 className="search-service-user__title">Search for a service user</h3>
        <Container className="search-service-user__filters">
          {inputs.map(({ key, label }) => (
            <Input
              key={key}
              value={filters[key]}
              onChangeValue={value => changeFilters(key, value)}
              label={label}
            />
          ))}
          <FormGroup>
            <DatePicker
              setDate={(value) => changeFilters('dateOfBirth', value)}
              date={filters.dateOfBirth}
              label="Date of birth"
            />
          </FormGroup>
          <Input
            label="Postcode"
            value={filters.postcode}
            onChangeValue={(value) => changeFilters('postcode', value)}
          />
          {Object.values(filters).some(value => value) &&
          <Button handler={clearFilters} className="outline gray clear-button">Clear</Button>
          }
        </Container>
      </Container>
      <Button isLoading={isLoading} disabled={isLoading} className="search-service-user__button" handler={onSearch}>Search</Button>
      {searchResults &&
      <Container>
        <SearchResult count={searchResults.length}/>
        {searchResults.map((item) => (
          <Container onClick={() => item.hackneyId && pushRoute(item, getServiceUserPackagesRoute((item.hackneyId)))} key={`${item.hackneyId || item.mosaicId}${item.firstName}${item.lastName}`} className="search-service-user__card">
            <ServiceUserDetails
              hackneyId={item.hackneyId || item.mosaicId}
              dateOfBirth={item.dateOfBirth}
              serviceUserName={`${item.firstName} ${item.lastName}`}
              address={item.postCode || item.address?.postcode}
              title=""
            />
            <Container className="actions">
              <p onClick={(e) => {
                e.stopPropagation();
                pushRoute(item, getAssignPackageRoute(item.hackneyId || item.mosaicId));
              }} className="link-button green">Allocate to broker</p>
              {item.hackneyId && <p onClick={(e) => {
                e.stopPropagation();
                pushRoute(item, getHistoryRoute(item.hackneyId));
              }} className="link-button green">View package history</p>}
            </Container>
          </Container>
        ))}
        {pageNumber && <AlternativePagination
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={10}
          currentPage={pageNumber}
          changePagination={setPageNumber}
        />}
      </Container>
      }
    </Container>
  </Container>
);

export default memo(SearchServiceUser);