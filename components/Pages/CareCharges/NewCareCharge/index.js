import React from 'react';
import { Breadcrumbs, Button, Container, Header, Select, Tag } from '../../../HackneyDS';
import { CARE_PACKAGE_ROUTE, LOGOUT_ROUTE } from '../../../../routes/RouteConstants';
import AlternativePagination from '../../../AlternativePagination';
import { formatDate } from '../../../../service/helpers';
import TitleSubtitle from './TitleSubtitle';
import { getTagColorFromStatusId, getTagDisplayTextFromStatusId } from '../../../../service/getTagFromStatus';
import FormGroup from '../../../HackneyDS/FormGroup';

const breadcrumbs = [{ text: 'Home', href: CARE_PACKAGE_ROUTE }, { text: 'Care Charges' }];

const links = [{ text: 'Logout', href: LOGOUT_ROUTE }];

export const NewCareCharge = ({
  filters,
  setFilters,
  searchResults: {
    data,
    pagingMetaData,
  },
  pageNumber,
  setPageNumber,
  statusOptions,
  dateOptions,
  modifiedByOptions,
}) => {
  const changeFilter = (field) => (value) => setFilters(prevState => ({ ...prevState, [field]: value }));

  return (
    <Container className="new-care-charge">
      <Header links={links}/>
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
          </Container>
        </Container>
      </Container>
      <Container padding="9px 60px 32px 60px" className="centered-container">
        {data?.map(({
          statusIds,
          dateOfBirth,
          address,
          mosaicId,
          packageName,
          startDate,
          lastModified,
          modifiedBy,
        }) => (
          <Container key={mosaicId} className="new-care-charge__card">
            <Container className="new-care-charge__card-title" display="flex">
              <p>Name</p>
              {statusIds.map(statusId => (
                <Tag
                  key={statusId}
                  className="outline"
                  color={getTagColorFromStatusId(statusId)}
                >
                  {getTagDisplayTextFromStatusId(statusId)}
                </Tag>
              ))}
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