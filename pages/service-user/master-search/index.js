import React, { useState } from 'react';
import SearchServiceUser from 'components/Pages/BrokerAssistant/SearchServiceUser';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const BrokerPortalSearch = () => {
  const router = useRouter();
  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const { data: { residents: searchResults }, isLoading } = useCarePackageApi.serviceUserMasterSearch({
    firstName: filters.firstName,
    postcode: filters.postcode,
    lastName: filters.lastName,
    hackneyId: filters.hackneyId,
    dateOfBirth: filters?.dateOfBirth?.toJSON?.(),
  }, showSearchResults);

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

  const pushRoute = ({ hackneyId }, route) => router.push(route);

  return (
    <SearchServiceUser
      isLoading={isLoading}
      filters={filters}
      pushRoute={pushRoute}
      searchResults={searchResults?.slice((pageNumber - 1) * 10, pageNumber * 10)}
      clearFilters={clearFilters}
      changeFilters={changeFilters}
      setPageNumber={setPageNumber}
      pageNumber={pageNumber}
      totalCount={searchResults.length}
      totalPages={searchResults.length && Math.ceil(searchResults.length / 10)}
      onSearch={onSearch}
    />
  );
};

export default BrokerPortalSearch;