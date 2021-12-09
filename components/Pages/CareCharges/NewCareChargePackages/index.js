import React, { useCallback, useState } from 'react';
import { getServiceUserCareChargesRoute, CARE_PACKAGE_ROUTE, SERVICE_USER_SEARCH_ROUTE } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import {
  Breadcrumbs,
  Button,
  Container,
  Select,
  FormGroup,
  HorizontalSeparator,
  Heading,
  SearchBox
} from '../../../HackneyDS';
import Loading from '../../../Loading';
import AlternativePagination from '../../../AlternativePagination';
import { CareChargesTable } from './CareChargesTable';

const breadcrumbs = [{ text: 'Home', href: CARE_PACKAGE_ROUTE }, { text: 'Care Charges' }];

const userStatusOptions = [
  { text: 'New', value: 'New' },
  { text: 'Existing', value: 'Existing' },
];

const dateOptions = [
  { text: 'Newest first', value: 'desc' },
  { text: 'Oldest First', value: 'asc' },
];

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
            <Heading size="xl">New care charge packages</Heading>
            <Button largeButton onClick={findServiceUser}>
              Find a service user
            </Button>
          </Container>
          <HorizontalSeparator height={16} />
          <Container className="new-care-charge__selectors">
            <Container display='flex' alignItems='flex-end'>
              <FormGroup className='search' label="Search" smallLabel>
                <SearchBox
                  className='broker-portal'
                  placeholder="Search by name..."
                  value={searchText}
                  onChangeValue={setSearchText}
                  search={onSearch}
                />
              </FormGroup>
              <FormGroup label="Status" smallLabel>
                <Select options={userStatusOptions} onChangeValue={changeFilter('status')} value={filters.status} />
              </FormGroup>
              <FormGroup label="Date" smallLabel>
                <Select options={dateOptions} onChangeValue={changeFilter('orderByDate')} value={filters.orderByDate} />
              </FormGroup>
            </Container>
            <HorizontalSeparator height={25} />
            <Container display='flex'>
              <FormGroup label="Modified by" smallLabel>
                <Select
                  options={modifiedByOptions}
                  onChangeValue={changeFilter('modifiedBy')}
                  value={filters.modifiedBy}
                />
              </FormGroup>
              {Object.values(filters).some((item) => item) && (
                <Button outline secondary color="gray" onClick={clearFilters}>
                  Clear
                </Button>
              )}
            </Container>
          </Container>
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
