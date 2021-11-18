import React, { memo } from 'react';
import { getServiceUserPackagesRoute, getAssignPackageRoute } from 'routes/RouteConstants';
import { Container, AlternativePagination } from '../../../HackneyDS';
import ServiceUserDetails from '../../BrokerPortal/ServiceUserDetails';
import SearchResult from '../../../SearchResult';
import ServiceUserSearch from '../../ServiceUser/Search';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';
import Loading from '../../../Loading';

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
  className = '',
}) => (
  <Container className={`search-service-user ${className}`}>
    <Loading isLoading={isLoading} />
    <DynamicBreadcrumbs additionalBreadcrumbs={[{ text: 'Search for a service user' }]} />
    <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
      <ServiceUserSearch
        onSearch={onSearch}
        isLoading={isLoading}
        clearFilters={clearFilters}
        filters={filters}
        changeFilters={changeFilters}
        inputs={inputs}
      />
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
