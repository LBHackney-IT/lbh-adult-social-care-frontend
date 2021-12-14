import React, { useMemo, useState } from 'react';
import { assignToBroker, useServiceUserSearch } from 'api';
import { SearchServiceUser } from 'components';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { getFormData } from 'service';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { selectUser } from 'reducers/userReducer';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const BrokerPortalSearch = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isCreatingNewPackage, setIsCreatingNewPackage] = useState(false);

  const params = useMemo(
    () => ({
      pageNumber,
      firstName: filters.firstName,
      postcode: filters.postcode,
      lastName: filters.lastName,
      hackneyId: filters.hackneyId,
      dateOfBirth: filters?.dateOfBirth?.toJSON?.(),
    }),
    [filters, pageNumber]
  );

  const {
    data: { residents: searchResults },
    isLoading,
  } = useServiceUserSearch({ params, shouldFetch: showSearchResults });

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

  const createNewPackage = async ({ mosaicId }) => {
    if (!isCreatingNewPackage) {
      setIsCreatingNewPackage(true);

      const formData = getFormData({
        hackneyUserId: mosaicId,
        brokerId: user.userId,
        packageType: 2,

      })
      const newPackageId = await assignToBroker({ data: formData });

      router.push(getCorePackageRoute(newPackageId));
    }
  }

  const pushRoute = (route) => router.push(route);

  return (
    <SearchServiceUser
      isLoading={isLoading}
      createNewPackage={createNewPackage}
      filters={filters}
      pushRoute={pushRoute}
      searchResults={searchResults?.slice((pageNumber - 1) * 10, pageNumber * 10)}
      clearFilters={clearFilters}
      changeFilters={changeFilters}
      setPageNumber={setPageNumber}
      pageNumber={pageNumber}
      totalCount={searchResults?.length}
      totalPages={searchResults?.length && Math.ceil(searchResults.length / 10)}
      onSearch={onSearch}
    />
  );
};

export default BrokerPortalSearch;
