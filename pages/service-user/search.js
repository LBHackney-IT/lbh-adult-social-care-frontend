import React, { useMemo, useState } from 'react';
import { assignToBroker, useServiceUserMasterSearch } from 'api';
import { Container } from 'components';
import { useRouter } from 'next/router';
import { getFormData } from 'service';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { useSelector } from 'react-redux';
import { selectUser } from 'reducers/userReducer';
import Loading from 'components/Loading';
import DynamicBreadcrumbs from 'components/Pages/DynamicBreadcrumbs';
import ServiceUserSearch from 'components/Pages/ServiceUser/Search';
import SearchResultCount from 'components/SearchResultCount';
import AlternativePagination from 'components/AlternativePagination';
import SearchResultList from 'components/Pages/Brokerage/SearchResultList';

const initialFilters = {
  postcode: '',
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
};

const inputs = [
  { label: 'First name', key: 'firstName' },
  { label: 'Last name', key: 'lastName' },
  { label: 'Hackney ID', key: 'hackneyId' },
];

const BrokerReferralSearch = () => {
  const router = useRouter();
  const user = useSelector(selectUser);

  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [isCreatingNewPackage, setIsCreatingNewPackage] = useState(false);

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

  const createNewPackage = async ({ mosaicId }) => {
    if (isCreatingNewPackage) return;

    setIsCreatingNewPackage(true);

    const formData = getFormData({
      hackneyUserId: mosaicId,
      brokerId: user.userId,
      packageType: 2,

    });
    const newPackageId = await assignToBroker({ data: formData });

    router.push(getCorePackageRoute(newPackageId));
  };

  const pushRoute = (route) => router.push(route);

  return (
    <Container className="search-service-user">
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
            <SearchResultCount count={searchResults.length} />
            <SearchResultList searchResults={searchResults} pushRoute={pushRoute} createNewPackage={createNewPackage} />
            <AlternativePagination
              totalPages={searchResults?.length && Math.ceil(searchResults.length / 10)}
              totalCount={searchResults?.length}
              pageSize={10}
              currentPage={pageNumber}
              changePagination={setPageNumber}
            />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default BrokerReferralSearch;
