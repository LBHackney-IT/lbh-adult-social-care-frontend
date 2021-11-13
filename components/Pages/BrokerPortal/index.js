import React from 'react';
import { Breadcrumbs, Container, HorizontalSeparator, Heading, Button } from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import { BrokerPortalTable } from './BrokerPortalTable';
import Loading from '../../Loading';
import { BrokerPortalFilters } from './BrokerPortalFilters';

export const BrokerPortalPage = ({
  items,
  title,
  searchTerm,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  filters,
  setFilters,
  clearFilter,
  onRowClick = () => {},
  loading,
  goToSearch,
  breadcrumbs,
}) => (
  <div className="broker-portal">
    <Loading isLoading={loading} />
    <Container background="#FAFAFA" padding="0 0 60px">
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        <HorizontalSeparator height="10px" />
        <Breadcrumbs values={breadcrumbs} />
        <HorizontalSeparator height="30px" />
        <Container display="flex" justifyContent="space-between">
          <Heading size="xl">{title}</Heading>
          <Button onClick={goToSearch} largeButton>Find a service user</Button>
        </Container>
        <HorizontalSeparator height="16px" />
        <BrokerPortalFilters title={title} filters={filters} setFilters={setFilters} clearFilter={clearFilter} />
      </Container>
    </Container>

    <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
      {items && <BrokerPortalTable searchTerm={searchTerm} onRowClick={onRowClick} data={items} />}
      <HorizontalSeparator height="20px" />
      <AlternativePagination
        pageSize={pageSize}
        totalPages={totalPages}
        currentPage={pageNumber}
        totalCount={totalCount}
        changePagination={setPageNumber}
      />
    </Container>
  </div>
);

export default BrokerPortalPage;
