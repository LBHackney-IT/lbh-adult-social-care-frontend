import React, { useEffect, useMemo, useState } from 'react';
import { assignToBroker, useServiceUserNewSearch } from 'api';
import { Container } from 'components';
import { useRouter } from 'next/router';
import { getFormData } from 'service';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, userLogin } from 'reducers/userReducer';
import Loading from 'components/Loading';
import DynamicBreadcrumbs from 'components/Pages/DynamicBreadcrumbs';
import ServiceUserSearch from 'components/Pages/ServiceUser/Search';
import SearchResultCount from 'components/SearchResultCount';
import AlternativePagination from 'components/AlternativePagination';
import SearchResultList from 'components/Pages/Brokerage/SearchResultList';
import axios from 'axios';
import { addNotification } from '../../reducers/notificationsReducer';

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
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({ ...initialFilters });
  const [showSearchResults, setShowSearchResults] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

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
    isLoading: searchLoading,
  } = useServiceUserNewSearch({ params, shouldFetch: showSearchResults });

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
    if (isLoading) return;

    setIsLoading(true);

    const formData = getFormData({
      object: {
        hackneyUserId: mosaicId,
        brokerId: user.user.userId,
        packageType: 2,
      }
    });
    try {
      const newPackageId = await assignToBroker({ data: formData });
      pushNotification('Package created', 'success');
      router.push(getCorePackageRoute(newPackageId));
    } catch (e) {
      pushNotification(e);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!user) {
      axios.get('/api/user')
        .then(res => dispatch(userLogin({ user: res.data })));
    }
  }, [user]);

  const fullLoading = isLoading || searchLoading;

  return (
    <Container className="search-service-user">
      <Loading isLoading={fullLoading} />
      <DynamicBreadcrumbs additionalBreadcrumbs={[{ text: 'Search for a service user' }]} />
      <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
        <ServiceUserSearch
          onSearch={onSearch}
          isLoading={fullLoading}
          clearFilters={clearFilters}
          filters={filters}
          changeFilters={changeFilters}
          inputs={inputs}
        />
        {searchResults && (
          <Container>
            <SearchResultCount count={searchResults.length} />
            <SearchResultList searchResults={searchResults} createNewPackage={createNewPackage} />
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
