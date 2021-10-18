import React from 'react';
import { Breadcrumbs, Button, Container, Header, Select, Tag } from '../../../HackneyDS';
import {
  APPROVALS_ROUTE,
  BROKER_ASSISTANT_ROUTE,
  BROKER_PORTAL_ROUTE, CARE_CHARGE_ROUTE,
  CARE_PACKAGE_ROUTE, FINANCE_ROUTE,
  LOGOUT_ROUTE
} from '../../../../routes/RouteConstants';
import { getServiceUserPackagesRoute } from '../../../../routes/RouteConstants';
import AlternativePagination from '../../../AlternativePagination';
import { formatDate } from '../../../../service/helpers';
import TitleSubtitle from './TitleSubtitle';
import FormGroup from '../../../HackneyDS/FormGroup';
import Loading from '../../../Loading';

const breadcrumbs = [{ text: 'Home', href: CARE_PACKAGE_ROUTE }, { text: 'Care Charges' }];

const links = [
  { text: 'Broker Assistant', href: BROKER_ASSISTANT_ROUTE },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Care Charges', href: CARE_CHARGE_ROUTE },
  { text: 'Approvals', href: FINANCE_ROUTE },
  { text: 'Finance', href: APPROVALS_ROUTE },
  { text: 'Logout', href: LOGOUT_ROUTE },
];

const statusIdParams = {
  1: {
    name: 'New',
    color: 'yellow',
  },
  2: {
    name: 'Existing',
    color: 'gray',
  },
  3: {
    name: 'S117',
    color: 'red',
  }
}

export const NewCareCharge = ({
  isLoading,
  filters,
  setFilters,
  clearFilters,
  searchResults: {
    data,
    pagingMetaData,
  },
  pageNumber,
  setPageNumber,
  statusOptions,
  dateOptions,
  pushRoute,
  modifiedByOptions,
}) => {
  const changeFilter = (field) => (value) => setFilters(prevState => ({ ...prevState, [field]: value }));

  return (
    <Container className="new-care-charge">
      <Header links={links} />
      <Loading isLoading={isLoading} />
      <Container background="#FAFAFA">
        <Container padding="9px 60px 32px 60px" className="centered-container">
          <Breadcrumbs values={breadcrumbs}/>
          <Container className="new-care-charge__header" display="flex" justifyContent="space-between">
            <h2>New care Charge package</h2>
            <Button>Find a service user</Button>
          </Container>
          <Container className="new-care-charge__selectors">
            <FormGroup label="Status">
              <Select
                options={statusOptions}
                onChangeValue={changeFilter('status')}
                value={filters.status}
              />
            </FormGroup>
            <FormGroup label="Date">
              <Select
                options={dateOptions}
                onChangeValue={changeFilter('date')}
                value={filters.date}
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
              <Button className='outline gray' handler={clearFilters}>Clear</Button>
            )}
          </Container>
        </Container>
      </Container>
      <Container padding="10px 60px 32px" className="centered-container">
        {data?.map(({
          statusId,
          isS117,
          dateOfBirth,
          address,
          mosaicId,
          packageName,
          startDate,
          lastModified,
          modifiedBy,
        }) => (
          <Container
            onClick={() => pushRoute(getServiceUserPackagesRoute(mosaicId))}
            key={mosaicId}
            className="new-care-charge__card"
          >
            <Container className="new-care-charge__card-title" display="flex">
              <p>Name</p>
              <Tag key={statusId} className="outline" color={statusIdParams[statusId].color}>
                {statusIdParams[statusId].name}
              </Tag>
              {isS117 && <Tag key={statusId} className="outline" color='gray'>S117</Tag>}
            </Container>
            <p className='new-care-charge__card-date'>{formatDate(dateOfBirth)}</p>
            <p className='new-care-charge__card-address'>{address}</p>
            <Container display="flex" justifyContent="space-between">
              <Container display="flex">
                <TitleSubtitle title="Mosaic ID" subtitle={`#${mosaicId}`}/>
                <TitleSubtitle title="Package" subtitle={packageName}/>
                <TitleSubtitle title="Start date" subtitle={formatDate(startDate)}/>
              </Container>
              <Container display="flex">
                <TitleSubtitle title="Last modified" subtitle={formatDate(lastModified)}/>
                <TitleSubtitle title="by" subtitle={modifiedBy}/>
              </Container>
            </Container>
          </Container>
        ))}
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