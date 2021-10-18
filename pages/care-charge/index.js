import React, { useState } from 'react';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import { NewCareCharge } from '../../components/Pages/CareCharges/NewCareCharge';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const CareCharge = () => {
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

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setShowSearchResults(false);
  };

  const pushRoute = ({ hackneyId }, route) => router.push(route)

  return (
    <NewCareCharge
      isLoading={isLoading}
      setPageNumber={setPageNumber}
      clearFilters={clearFilters}
      pageNumber={pageNumber}
      filters={filters}
      pushRoute={pushRoute}
      searchResults={searchResults}
      setFilters={setFilters}
      dateOptions={[]}
      modifiedByOptions={[]}
      statusOptions={[]}
    />
  );
};

export default CareCharge;