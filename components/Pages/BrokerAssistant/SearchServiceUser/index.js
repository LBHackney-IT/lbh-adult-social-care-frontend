import React, { memo } from 'react';
import { getServiceUserPackagesRoute, getAssignPackageRoute } from 'routes/RouteConstants';
import BrokerageHeader from '../../CarePackages/BrokerageHeader';
import { Button, Container, Input, Breadcrumbs, DatePicker, FormGroup } from '../../../HackneyDS';
import ServiceUserDetails from '../../BrokerPortal/ServiceUserDetails';
import AlternativePagination from '../../../AlternativePagination';
import SearchResult from '../../../SearchResult';

const inputs = [
  { label: 'First name', key: 'firstName' },
  { label: 'Last name', key: 'lastName' },
  { label: 'Hackney ID', key: 'hackneyId' },
];

const SearchServiceUser = ({
  breadcrumbs,
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
  className = '',
}) => (
  <Container className={`search-service-user ${className}`}>
    <BrokerageHeader />
    <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
      <Breadcrumbs values={breadcrumbs} />
      <Container padding="60px 0 0">
        <h3 className="search-service-user__title">Search for a service user</h3>
        <Container className="search-service-user__filters">
          {inputs.map(({ key, label }) => (
            <Input key={key} value={filters[key]} onChangeValue={(value) => changeFilters(key, value)} label={label} />
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
          {Object.values(filters).some((value) => value) && (
            <Button onClick={clearFilters} className="outline gray clear-button">
              Clear
            </Button>
          )}
        </Container>
      </Container>
      <Button isLoading={isLoading} disabled={isLoading} className="search-service-user__button" onClick={onSearch}>
        Search
      </Button>
      {searchResults && (
        <Container>
          <SearchResult count={searchResults.length} />
          {searchResults.map((item) => (
            <Container
              onClick={() => item.hackneyId && pushRoute(getServiceUserPackagesRoute(item.id))}
              key={`${item.hackneyId || item.mosaicId}${item.firstName}${item.lastName}`}
              className="search-service-user__card"
            >
              <ServiceUserDetails
                hackneyId={item.hackneyId || item.mosaicId}
                dateOfBirth={item.dateOfBirth}
                serviceUserName={`${item.firstName} ${item.lastName}`}
                address={item.postCode || item.address?.postcode}
                title=""
              />
              {item.mosaicId && (
                <Container className="actions">
                  <p onClick={() => pushRoute(getAssignPackageRoute(item.mosaicId))} className="link-button green">
                    Allocate to broker
                  </p>
                </Container>
              )}
            </Container>
          ))}
          {pageNumber && (
            <AlternativePagination
              totalPages={totalPages}
              totalCount={totalCount}
              pageSize={10}
              currentPage={pageNumber}
              changePagination={setPageNumber}
            />
          )}
        </Container>
      )}
    </Container>
  </Container>
);

export default memo(SearchServiceUser);
