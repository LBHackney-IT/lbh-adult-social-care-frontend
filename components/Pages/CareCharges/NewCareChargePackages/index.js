import React, { useCallback, useState } from 'react';
import { getServiceUserCareChargesRoute, SERVICE_USER_SEARCH_ROUTE } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import { Breadcrumbs, Button, Container, Heading, HorizontalSeparator } from '../../../HackneyDS';
import Loading from '../../../Loading';
import AlternativePagination from '../../../AlternativePagination';
import { CareChargesTable } from './CareChargesTable';
import CareChargesFilter from '../CareChargesFilter';

const breadcrumbs = [{ text: 'Home', href: '/' }, { text: 'Care Charges' }];

const NewCareChargePackages = ({
  isLoading,
  filters,
  setFilters,
  clearFilters,
  searchResults: { data, pagingMetaData },
  pageNumber,
  setPageNumber,
  pushRoute,
  modifiedByOptions,
}) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const changeFilter = (field) => (value) => setFilters((prevState) => ({ ...prevState, [field]: value }));

  const onSearch = useCallback(() => {
    changeFilter('searchTerm')(searchText);
  }, [searchText]);

  const findServiceUser = () => router.push(SERVICE_USER_SEARCH_ROUTE);

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Container background="#FAFAFA" padding="0 0 60px 0">
        <Container padding="0 60px" margin="0 auto" maxWidth="1080px">
          <HorizontalSeparator height={10} />
          <Breadcrumbs values={breadcrumbs} />
          <HorizontalSeparator height={30} />
          <Container display="flex" justifyContent="space-between">
            <Heading size="xl">Care Charges</Heading>
            <Button largeButton onClick={findServiceUser}>
              Find a service user
            </Button>
          </Container>
          <HorizontalSeparator height={16} />
          <CareChargesFilter
            filters={filters}
            onSearch={onSearch}
            searchText={searchText}
            setSearchText={setSearchText}
            changeFilter={changeFilter}
            clearFilters={clearFilters}
            modifiedByOptions={modifiedByOptions}
          />
        </Container>
      </Container>
      <Container padding="30px 60px 60px 60px" className="centered-container">
        <CareChargesTable
          data={data}
          searchTerm={filters.searchTerm}
          onRowClick={({ serviceUserId }) => pushRoute(getServiceUserCareChargesRoute(serviceUserId))}
        />
        <HorizontalSeparator height="20px" />
        <AlternativePagination
          totalPages={pagingMetaData?.totalPages}
          totalCount={pagingMetaData?.totalCount}
          currentPage={pageNumber}
          changePagination={setPageNumber}
          pageSize={pagingMetaData?.pageSize}
        />
      </Container>
    </Container>
  );
};

export default NewCareChargePackages;
