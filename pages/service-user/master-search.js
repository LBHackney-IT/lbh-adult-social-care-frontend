import React, { useMemo, useState } from 'react';
import { useServiceUserMasterSearch } from 'api';
import { SearchServiceUser } from 'components';
import { useRouter } from 'next/router';
import { BROKER_ASSISTANCE_ROUTE } from 'routes/RouteConstants';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Assistance', href: BROKER_ASSISTANCE_ROUTE },
  { text: 'Search for a service user' },
];

const BrokerAssistanceSearch = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const params = useMemo(
    () => ({
      firstName: filters.firstName,
      postcode: filters.postcode,
      lastName: filters.lastName,
      hackneyId: filters.hackneyId,
      dateOfBirth: filters?.dateOfBirth?.toJSON?.(),
    }),
    [filters]
  );

  const {
    data: { residents: searchResults },
    isLoading,
  } = useServiceUserMasterSearch({ params, shouldFetch: showSearchResults });

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
      isLoading={isLoading}
      filters={filters}
      pushRoute={pushRoute}
      searchResults={searchResults?.slice((pageNumber - 1) * 10, pageNumber * 10)}
      clearFilters={clearFilters}
      changeFilters={changeFilters}
      setPageNumber={setPageNumber}
      className='master-search'
      pageNumber={pageNumber}
      totalCount={searchResults?.length}
      totalPages={searchResults?.length && Math.ceil(searchResults.length / 10)}
      onSearch={onSearch}
    />
  );
};

export default BrokerAssistanceSearch;
