import React, { memo, useMemo, useState } from 'react';
import { SearchServiceUser } from 'components';
import { useServiceUserSearch } from 'api';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE } from 'routes/RouteConstants';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Search for a service user' },
];

export const getServerSideProps = ({ req }) => ({ props: { prevRoute: req.headers.referer } });

const BrokerPortalSearch = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(false);

  const searchParams = useMemo(
    () => ({
      pageNumber,
      firstName: filters.firstName,
      postcode: filters.postcode,
      lastName: filters.lastName,
      hackneyId: filters.hackneyId,
      dateOfBirth: filters.dateOfBirth?.toJSON?.(),
    }),
    [filters, pageNumber]
  );

  const {
    data: { pagingMetaData, data: searchResults },
    isLoading,
  } = useServiceUserSearch({ params: searchParams, shouldFetch: showSearchResults });

  const changeFilters = (field, value) => {
    setShowSearchResults(false);
    setFilters((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setShowSearchResults(false);
  };

  const onSearch = () => setShowSearchResults(true);

  const pushRoute = (route) => router.push(route);

  return (
    <SearchServiceUser
      breadcrumbs={breadcrumbs}
      className="broker-assistance__search"
      isLoading={isLoading}
      setPageNumber={setPageNumber}
      changeFilters={changeFilters}
      pageNumber={pageNumber}
      totalCount={pagingMetaData?.totalCount}
      filters={filters}
      totalPages={pagingMetaData?.totalPages}
      pushRoute={pushRoute}
      searchResults={searchResults}
      onSearch={onSearch}
      clearFilters={clearFilters}
      setFilters={setFilters}
    />
  );
};

export default memo(BrokerPortalSearch);
