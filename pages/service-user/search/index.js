import React, { useState } from 'react';
import SearchServiceUser from 'components';
import { useRouter } from 'next/router';
import { useServiceUserSearch } from 'api';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const BrokerPortalSearch = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(false);

  const { data: { pagingMetaData, data: searchResults }, isLoading } = useServiceUserSearch({
    showSearchResults,
    params: {
      pageNumber,
      firstName: filters.firstName,
      postcode: filters.postcode,
      lastName: filters.lastName,
      hackneyId: filters.hackneyId,
      dateOfBirth: filters.dateOfBirth?.toJSON?.(),
    }
  });

  const changeFilters = (field, value) => {
    setShowSearchResults(false);
    setFilters(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setShowSearchResults(false);
  };

  const onSearch = () => setShowSearchResults(true);

  const pushRoute = ({ hackneyId }, route) => router.push(route)

  return (
    <SearchServiceUser
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

export default BrokerPortalSearch;