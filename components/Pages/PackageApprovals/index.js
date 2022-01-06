import React, { useCallback, useState } from 'react';
import { useApproversOptions, useLookups } from 'api';
import { Breadcrumbs, Container, Dialog, Heading, HorizontalSeparator, } from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import Loading from '../../Loading';
import { PackageApprovalsTable } from './PackageApprovalsTable';
import ServiceUserSearch from '../ServiceUser/Search';
import ApprovalsFilter from '../Approvals/ApprovalsFilter';

const initialServiceUserFilters = {
  firstName: '',
  lastName: '',
  hackneyId: '',
  dateOfBirth: null,
  postcode: '',
};

export const PackageApprovals = ({
  items,
  title,
  searchTerm,
  pageNumber,
  setPageNumber,
  paginationData: { pageSize, totalPages, totalCount },
  filters,
  setFilters,
  clearFilter,
  loading,
  onRowClick = () => {},
  breadcrumbs,
}) => {
  const [searchText, setSearchText] = useState('');
  const [openedSearch, setOpenedSearch] = useState(false);
  const [serviceUserFilter, setServiceUserFilter] = useState(initialServiceUserFilters);

  const { options: packageOptions, isLoading: packageOptionsLoading } = useLookups('packageType');
  const { options: approverOptions, isLoading: approverOptionsLoading } = useApproversOptions();

  const changeFilterField = useCallback(
    (field, value) => {
      setFilters((prevState) => ({
        ...prevState,
        [field]: value,
      }));
    },
    [setFilters]
  );

  const onClearFilters = () => {
    setSearchText('');
    clearFilter();
  };

  const closeSearch = () => setOpenedSearch(false);

  const onServiceUserSearch = () => {
    setOpenedSearch('');
    setFilters((prevState) => ({
      ...prevState,
      ...serviceUserFilter,
    }));
  };

  const changeServiceUserSearch = (field, value) => {
    setServiceUserFilter((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const clearServiceUserSearch = () => {
    setServiceUserFilter({ ...initialServiceUserFilters });
  };

  const getPackageTypeById = (packageTypeId) =>
    packageOptions.find((packageType) => packageType.value === packageTypeId)?.text;

  const onSearch = useCallback(() => {
    changeFilterField('serviceUserName', searchText);
  }, [changeFilterField, searchText]);

  const isLoading = loading || approverOptionsLoading || packageOptionsLoading;

  return (
    <div className="broker-portal approvals">
      <Loading isLoading={isLoading} />
      <Dialog className="approvals-modal" onClose={closeSearch} isOpen={openedSearch}>
        <ServiceUserSearch
          onSearch={onServiceUserSearch}
          filters={serviceUserFilter}
          changeFilters={changeServiceUserSearch}
          clearFilters={clearServiceUserSearch}
        />
      </Dialog>
      <Container background="#FAFAFA" padding="0 0 60px">
        <Container maxWidth="1080px" margin="0 auto">
          <Container padding="10px 60px 0px">
            <Breadcrumbs values={breadcrumbs} />
          </Container>
          <HorizontalSeparator height={30} />
          <Container height={50} padding="0 60px">
            <Heading size="xl">{title}</Heading>
          </Container>
          <HorizontalSeparator height={16} />
          <ApprovalsFilter
            onClearFilters={onClearFilters}
            filters={filters}
            setFilters={setFilters}
            setSearchText={setSearchText}
            searchText={searchText}
            onSearch={onSearch}
            packageOptions={packageOptions}
            changeFilterField={changeFilterField}
            approverOptions={approverOptions}
          />
        </Container>
      </Container>

      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        <PackageApprovalsTable
          searchTerm={searchTerm}
          getPackageTypeById={getPackageTypeById}
          onRowClick={onRowClick}
          data={items}
        />
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
};

export default PackageApprovals;
