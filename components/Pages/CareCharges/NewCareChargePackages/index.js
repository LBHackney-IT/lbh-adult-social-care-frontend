import React from 'react';
import { getServiceUserPackagesRoute, CARE_PACKAGE_ROUTE, SERVICE_USER_SEARCH_ROUTE } from 'routes/RouteConstants';
import { useRouter } from 'next/router';
import { Breadcrumbs, Button, Container, Select, FormGroup } from '../../../HackneyDS';
import Loading from '../../../Loading';
import BrokerageHeader from '../../CarePackages/BrokerageHeader';
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
  const changeFilter = (field) => (value) => setFilters((prevState) => ({ ...prevState, [field]: value }));

  const findServiceUser = () => router.push(SERVICE_USER_SEARCH_ROUTE);

  return (
    <Container className="new-care-charge">
      <BrokerageHeader />
      <Loading isLoading={isLoading} />
      <Container background="#FAFAFA">
        <Container padding="10px 60px 32px 60px" className="centered-container">
          <Breadcrumbs values={breadcrumbs} />
          <Container className="new-care-charge__header" display="flex" justifyContent="space-between">
            <h2>New care charge packages</h2>
            <Button onClick={findServiceUser}>Find a service user</Button>
          </Container>
          <Container className="new-care-charge__selectors">
            <FormGroup label="Status">
              <Select options={userStatusOptions} onChangeValue={changeFilter('status')} value={filters.status} />
            </FormGroup>
            <FormGroup label="Date">
              <Select options={dateOptions} onChangeValue={changeFilter('orderByDate')} value={filters.orderByDate} />
            </FormGroup>
            <FormGroup label="Modified by">
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
      <Container padding="30px 60px 60px 60px" className="centered-container">
        <CareChargesTable
          data={data}
          onRowClick={({ serviceUserId }) => pushRoute(getServiceUserPackagesRoute(serviceUserId))}
        />
        <AlternativePagination
          className="mt-6"
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
