import React, { useEffect, useMemo, useState } from 'react';
import { assignToBroker, useServiceUserSearch } from 'api';
import { Container, HorizontalSeparator, Pagination } from 'components';
import { useRouter } from 'next/router';
import { dateToIsoString, getFormData, getLoggedInUser } from 'service';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, userLogin } from 'reducers/userReducer';
import Loading from 'components/Loading';
import DynamicBreadcrumbs from 'components/Pages/DynamicBreadcrumbs';
import ServiceUserSearch from 'components/Pages/ServiceUser/Search';
import SearchResultCount from 'components/SearchResultCount';
import SearchResultList from 'components/Pages/Brokerage/SearchResultList';
import axios from 'axios';
import { addNotification } from 'reducers/notificationsReducer';
import withSession from 'lib/session';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../api/handleRoleBasedAccess';
import { accessRoutes } from '../api/accessMatrix';

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

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.SERVICE_USER_SEARCH)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const BrokerageSearch = ({ roles }) => {
  const router = useRouter();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState(initialFilters);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [paginationInfo, setPaginationInfo] = useState({
    pageNumber: 1,
    cursor: '',
  });
  const [previousCursors, setPreviousCursors] = useState(['']);
  const [isLoading, setIsLoading] = useState(false);
  const [requestFilters, setRequestFilters] = useState(initialFilters);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const params = useMemo(
    () => ({
      firstName: requestFilters.firstName,
      postcode: requestFilters.postcode,
      lastName: requestFilters.lastName,
      cursor: paginationInfo.cursor,
      pageSize,
      pageNumber: paginationInfo.pageNumber,
      hackneyId: requestFilters.hackneyId,
      dateOfBirth: dateToIsoString(requestFilters.dateOfBirth),
    }),
    [requestFilters, paginationInfo, pageSize]
  );

  const {
    data: { residents, nextCursor, totalCount = 0 },
    isLoading: searchLoading,
  } = useServiceUserSearch({ params, shouldFetch: showSearchResults });

  const searchResults = residents?.data || [];
  const pagingMetaData = residents?.pagingMetaData;

  const changeFilters = (field, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({ ...initialFilters });
    setRequestFilters({ ...initialFilters });
  };

  const onSearch = () => {
    if (!showSearchResults) setShowSearchResults(true);
    setRequestFilters(filters);
  };

  const createNewPackage = async ({ mosaicId }) => {
    if (isLoading) return;

    setIsLoading(true);

    const formData = getFormData({
      hackneyUserId: mosaicId,
      brokerId: user.user.userId,
      packageType: 2,
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
      axios.get('/api/user').then((res) => dispatch(userLogin({ user: res.data })));
    }
  }, [user]);

  useEffect(() => {
    if (pagingMetaData) {
      setPageSize(pagingMetaData.pageSize);
    }
  }, [pagingMetaData]);

  const fullLoading = isLoading || searchLoading;

  return (
    <Container className="search-service-user">
      <NewHeader roles={roles ?? []} />
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
            {showSearchResults && <SearchResultCount count={searchResults.length} />}
            <SearchResultList searchResults={searchResults} createNewPackage={createNewPackage} />
            <Pagination
              showOnlyCurrentPage
              totalPages={pagingMetaData?.totalPages}
              totalCount={totalCount}
              pageSize={pageSize}
              currentPage={paginationInfo.pageNumber}
              onPageChange={(page) => {
                let newCursor;
                if (paginationInfo.pageNumber < page) {
                  newCursor = nextCursor;
                  const isNewPreviousCursor = !previousCursors.some((prevCursor) => prevCursor === nextCursor);
                  if (isNewPreviousCursor) {
                    setPreviousCursors((prevState) => [...prevState, nextCursor]);
                  }
                } else {
                  newCursor = previousCursors[page - 1];
                }
                setPaginationInfo({
                  pageNumber: page,
                  cursor: newCursor,
                });
              }}
            />
            <HorizontalSeparator height={20} />
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default BrokerageSearch;
