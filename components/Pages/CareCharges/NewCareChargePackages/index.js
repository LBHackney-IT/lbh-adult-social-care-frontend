import React from 'react';
import { formatDate, getTagColorFromStatus } from 'service';
import {
  Breadcrumbs,
  Button,
  Container,
  Select,
  Tag,
  FormGroup,
  BrokerageHeader,
  Loading,
  AlternativePagination,
  TitleSubtitle,
} from 'components';
import { getServiceUserPackagesRoute, CARE_PACKAGE_ROUTE, } from 'routes/RouteConstants';
import { userTagColors } from 'constants/variables';

const breadcrumbs = [{ text: 'Home', href: CARE_PACKAGE_ROUTE }, { text: 'Care Charges' }];

const userStatusOptions = [
  { text: 'New', value: 'New' },
  { text: 'Existing', value: 'Existing' },
];

const dateOptions = [
  {text: 'Newest first', value: 'desc' },
  {text: 'Oldest First', value: 'asc' },
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
  const changeFilter = (field) => (value) => setFilters((prevState) => ({ ...prevState, [field]: value }));

  return (
    <Container className="new-care-charge">
      <BrokerageHeader />
      <Loading isLoading={isLoading}/>
      <Container background="#FAFAFA">
        <Container padding="10px 60px 32px 60px" className="centered-container">
          <Breadcrumbs values={breadcrumbs} />
          <Container className="new-care-charge__header" display="flex" justifyContent="space-between">
            <h2>New care Charge package</h2>
            <Button>Find a service user</Button>
          </Container>
          <Container className="new-care-charge__selectors">
            <FormGroup label="Status">
              <Select
                options={userStatusOptions}
                onChangeValue={changeFilter('status')}
                value={filters.status}
              />
            </FormGroup>
            <FormGroup label="Date">
              <Select
                options={dateOptions}
                onChangeValue={changeFilter('orderByDate')}
                value={filters.orderByDate}
              />
            </FormGroup>
            <FormGroup label="Modified by">
              <Select
                options={modifiedByOptions}
                onChangeValue={changeFilter('modifiedBy')}
                value={filters.modifiedBy}
              />
            </FormGroup>
            {Object.values(filters).some(item => item) && (
              <Button className="outline gray" onClick={clearFilters}>Clear</Button>
            )}
          </Container>
        </Container>
      </Container>
      <Container padding="30px 60px 60px 60px" className="centered-container">
        {data?.map(({
          status,
          serviceUser,
          isS117Client,
          dateOfBirth,
          address,
          hackneyId,
          packageName,
          startDate,
          lastModified,
          modifiedBy,
        }) => (
          <Container
            onClick={() => pushRoute(getServiceUserPackagesRoute(hackneyId))}
            key={hackneyId}
            className="new-care-charge__card"
          >
            <Container className="new-care-charge__card-title" display="flex">
              <p>{serviceUser}</p>
              <Tag className="outline" color={getTagColorFromStatus(status, userTagColors)}>
                {status}
              </Tag>
              {isS117Client && <Tag className="outline" color="red">S117</Tag>}
            </Container>
            <p className="new-care-charge__card-date">{formatDate(dateOfBirth)}</p>
            <p className="new-care-charge__card-address">{address}</p>
            <Container display="flex" justifyContent="space-between">
              <Container display="flex">
                <TitleSubtitle title="Mosaic ID" subtitle={`#${hackneyId}`} />
                <TitleSubtitle title="Package" subtitle={packageName} />
                <TitleSubtitle title="Start date" subtitle={formatDate(startDate)} />
              </Container>
              <Container display="flex">
                <TitleSubtitle title="Last modified" subtitle={formatDate(lastModified)} />
                <TitleSubtitle title="by" subtitle={modifiedBy} />
              </Container>
            </Container>
          </Container>
        ))}
        <AlternativePagination
          className='mt-6'
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