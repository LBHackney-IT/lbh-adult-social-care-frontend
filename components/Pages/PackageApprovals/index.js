import React, { useCallback, useState } from 'react';
import { useApproversOptions, useLookups } from 'api';
import {
  Breadcrumbs,
  Button,
  Container,
  HorizontalSeparator,
  SearchBox,
  Select,
  FormGroup,
  Dialog,
} from '../../HackneyDS';
import AlternativePagination from '../../AlternativePagination';
import DatePick from '../../DatePick';
import Loading from '../../Loading';
import { PackageApprovalsTable } from './PackageApprovalsTable';
import ServiceUserSearch from '../ServiceUser/Search';

const statusOptions = [
  { text: 'Waiting For Approval', value: '3' },
  { text: 'Approved', value: '4' },
  { text: 'Not Approved', value: '5' },
];

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

  const getPackageTypeById = (packageTypeId) => packageOptions.find(packageType => packageType.value === packageTypeId)?.text;

  const onSearch = useCallback(() => {
    changeFilterField('serviceUserName', searchText);
  }, [changeFilterField, searchText]);

  const shouldShowClear = Object.values(filters).some((item) => item);

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
          <Container className="brokerage-portal__header">
            <h1>{title}</h1>
          </Container>

          <Container className="brokerage-portal__filters">
            <div className="brokerage-portal__filters-block">
              <FormGroup className="form-group--inline-label">
                <SearchBox placeholder='Search service user' label="Search Packages" value={searchText} onChangeValue={setSearchText} search={onSearch} />
              </FormGroup>

              <FormGroup className="form-group--inline-label brokerage-portal__form-status" label="Status">
                <Select
                  options={statusOptions}
                  value={filters.status}
                  onChange={({ target: { value } }) => changeFilterField('status', value)}
                />
              </FormGroup>

              <FormGroup className="form-group--inline-label" label="Approver">
                <Select
                  value={filters.approverId}
                  options={approverOptions}
                  onChangeValue={(value) => changeFilterField('approverId', value)}
                />
              </FormGroup>
            </div>

            <div className="brokerage-portal__filters-block">
              <FormGroup className="form-group--inline-label date-from" label="From">
                <DatePick
                  placeholder="Select date"
                  startDate={filters.dateFrom}
                  dateValue={filters.dateFrom}
                  setDate={(value) => {
                    if (filters.dateTo && value > filters.dateTo) {
                      setFilters((prevState) => ({
                        ...prevState,
                        dateTo: value,
                        dateFrom: value,
                      }));
                    } else {
                      changeFilterField('dateFrom', value);
                    }
                  }}
                />
              </FormGroup>

              <FormGroup className="form-group--inline-label" label="To">
                <DatePick
                  placeholder="Select date"
                  startDate={filters.dateTo}
                  dateValue={filters.dateTo}
                  minDate={filters.dateFrom}
                  setDate={(value) => changeFilterField('dateTo', value)}
                />
              </FormGroup>

              <FormGroup className="form-group--inline-label" label="Package">
                <Select
                  value={filters.packageType}
                  options={packageOptions}
                  onChangeValue={(value) => changeFilterField('packageType', value)}
                />
              </FormGroup>

              {shouldShowClear && (
                <Button className="outline gray clear-filter-button" onClick={onClearFilters}>
                  Clear
                </Button>
              )}
            </div>
          </Container>
        </Container>
      </Container>

      <Container maxWidth="1080px" margin="0 auto" padding="30px 60px 60px 60px">
        <PackageApprovalsTable getPackageTypeById={getPackageTypeById} onRowClick={onRowClick} data={items} />
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
