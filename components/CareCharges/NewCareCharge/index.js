import React from 'react';
import { Button, Container, Header, Select, Tag } from '../../HackneyDS';
import Breadcrumbs from '../../Breadcrumbs';
import { CARE_PACKAGE_ROUTE } from '../../../routes/RouteConstants';
import Pagination from '../../Payments/Pagination';
import { formatDate } from '../../../service/helpers';
import TitleSubtitle from './TitleSubtitle';
import { getTagColorFromStatusId } from '../../../service/getTagFromStatus';

const breadcrumbs = [{ text: 'Home', href: CARE_PACKAGE_ROUTE }, { text: 'Care Charges' }];

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
    <Container>
      <Header />
      <Container className="centered-container">
        <Breadcrumbs values={breadcrumbs}/>
        <Container>
          <h2>New care Charge package</h2>
          <Button>Find a service user</Button>
        </Container>
        <Container>
          <Select
            options={statusOptions}
            label="Status"
            onChangeValue={changeFilter('status')}
            value={filters.status}
          />
          <Select
            options={dateOptions}
            label="Date"
            onChangeValue={changeFilter('date')}
            value={filters.date}
          />
          <Select
            options={modifiedByOptions}
            label="Modified by"
            onChangeValue={changeFilter('modifiedBy')}
            value={filters.modifiedBy}
          />
        </Container>
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
          <Container key={mosaicId} className='care-charge__card'>
            <Container>
              <Container display='flex'>
                <p>Name</p>
                {statusIds.map(statusId => (
                  <Tag color={getTagColorFromStatusId(statusId)} />
                ))}
              </Container>
              <p>{formatDate(dateOfBirth)}</p>
              <p>{address}</p>
              <Container>
                <TitleSubtitle title='Mosaic ID' subtitle={`#${mosaicId}`} />
                <TitleSubtitle title='Package' subtitle={packageName} />
                <TitleSubtitle title='Start date' subtitle={formatDate(startDate)} />
              </Container>
            </Container>
            <Container>
              <TitleSubtitle title='Last modified' subtitle={formatDate(lastModified)} />
              <TitleSubtitle title='by' subtitle={modifiedBy} />
            </Container>
          </Container>
        ))}
        <Pagination
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