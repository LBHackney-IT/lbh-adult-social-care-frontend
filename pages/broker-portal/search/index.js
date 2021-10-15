import React, { useState } from 'react';
import SearchServiceUser from '../../../components/Pages/BrokerAssistant/SearchServiceUser';
import useCarePackageApi from '../../../api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import { getAssignPackageRoute, getCarePackageReviewRoute } from '../../../routes/RouteConstants';

const BrokerPortalSearch = () => {
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(1);
  const [initialFilters] = useState({
    postcode: '',
    firstName: '',
    lastName: '',
    hackneyId: '',
    dateOfBirth: null,
  });
  const [filters, setFilters] = useState({ ...initialFilters });
  const [searchFilters, setSearchFilters] = useState({ ...initialFilters });

  const { data: { pagingMetaData, data: searchResults } } = useCarePackageApi.serviceUser({
    pageNumber,
    firstName: filters.firstName,
    postcode: filters.postcode,
    lastName: filters.lastName,
    hackneyId: filters.hackneyId,
    dateOfBirth: filters.dateOfBirth,
  });

  const changeFilters = (field, value) => {
    setFilters(prevState => ({
      ...prevState,
      [field]: value
    }));
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setSearchFilters({ ...initialFilters });
  };

  const onSearch = () => setSearchFilters({ ...filters });

  const allocateToBroker = (item) => {
    router.push(getAssignPackageRoute(item.id));
  };

  const viewPackageHistory = (item) => {
    router.push(getCarePackageReviewRoute(item.id));
  };

  return (
    <SearchServiceUser
      allocateToBroker={allocateToBroker}
      viewPackageHistory={viewPackageHistory}
      setPageNumber={setPageNumber}
      pageNumber={pageNumber}
      totalCount={pagingMetaData?.totalCount}
      filters={filters}
      totalPages={pagingMetaData?.totalCount}
      searchResults={searchResults}
      clearFilters={clearFilters}
      changeFilters={changeFilters}
      onSearch={onSearch}
    />
  );
};

export default BrokerPortalSearch;