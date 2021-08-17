import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { getUserSession, formatDate } from '../../service/helpers';
import useSocialWorkerApi from '../../api/SWR/useSocialWorkerApi';
import withSession from '../../lib/session';
import {
  RESIDENTIAL_CARE_ROUTE,
  NURSING_CARE_ROUTE,
  RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE,
  NURSING_CARE_APPROVE_PACKAGE_ROUTE,
} from '../../routes/RouteConstants';
import Table from '../../components/Table';
import Inputs from '../../components/Inputs';
import { checkEmptyFields } from '../../service/inputValidator';
import { DATA_TYPES } from '../../api/Utils/CommonOptions';
import { sortArray } from '../../api/Utils/FuncUtils';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const SocialWorkerDashboardPage = () => {
  const [sorts] = useState([
    { name: 'client', text: 'Client' },
    { name: 'categoryId', text: 'Category' },
    { name: 'dateOfBirth', text: 'DOB', dataType: DATA_TYPES.DATE },
    { name: 'approver', text: 'Approver' },
    { name: 'submittedDaysAgo', text: 'Submitted\n(days ago)' },
    { name: 'statusName', text: 'Status' },
  ]);

  const [initialFilters] = useState({
    terms: '',
    status: '',
  });
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    value: 'ascending',
    name: sorts[0].name,
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const [filters, setFilters] = useState({...initialFilters});
  const [requestFilters, setRequestFilters] = useState({...initialFilters});

  const { data: statusOptions } = useSocialWorkerApi.submittedPackagesStatus();
  const { data: { data: submittedPackages, pagingMetaData } } = useSocialWorkerApi.submittedPackageRequests({
    pageNumber: page,
    pageSize: 50,
    clientName: requestFilters.terms,
    statusId: requestFilters.status,
  });

  const onClickTableRow = (rowItems) => {
    rowItems.categoryId === 3
      ? rowItems.statusName === 'Draft'
      ? router.push(`${RESIDENTIAL_CARE_ROUTE}/${rowItems.packageId}`)
      : router.push(`${RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`)
      : rowItems.statusName === 'Draft'
      ? router.push(`${NURSING_CARE_ROUTE}/${rowItems.packageId}`)
      : router.push(`${NURSING_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
  };

  const rowsRules = {
    packageId: {
      hide: true,
    },
    dateOfBirth: {
      getValue: (value) => `${formatDate(value, '/')}`,
    },
    status: {
      getClassName: (value) => `${value} table__row-item-status`,
    },
  };

  const tableFields = {
    id: 'packageId',
    client: 'client',
    category: 'category',
    DOB: 'dateOfBirth',
    approver: 'approver',
    submitted: 'submittedDaysAgo',
    status: 'statusName',
  };

  const changeFilters = (field, value) => {
    setFilters(filtersState => ({
      ...filtersState,
      [field]: value,
    }))
  }

  const inputs = {
    inputs: [
      {
        label: 'Search',
        name: 'terms',
        placeholder: 'Enter search terms',
        search: () => setRequestFilters({ ...filters }),
        className: 'mr-3'
      },
    ],
    dropdowns: [
      { options: statusOptions, initialText: 'Status', name: 'status', className: 'mr-3' },
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto ml-6', onClick: () =>  setRequestFilters({ ...filters })},
      {
        initialText: 'Clear',
        name: 'button-2',
        className: `mt-auto ml-3 outline gray${checkEmptyFields(filters) ? ' display-none' : ''}`,
        onClick: () => setFilters({...initialFilters})
      },
    ],
  };

  return (
    <div className="social-worker-page">
      <Inputs values={filters} inputs={inputs} title='Submitted Package Request' changeInputs={changeFilters} />
      <Table
        onClickTableRow={onClickTableRow}
        fields={tableFields}
        rows={sortArray(submittedPackages, sort)}
        loading={!submittedPackages}
        rowsRules={rowsRules}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination
        currentPage={pagingMetaData?.currentPage}
        changePagination={(pageNumber) => setPage(pageNumber)}
        pageSize={pagingMetaData?.pageSize}
        totalCount={pagingMetaData?.totalCount}
        totalPages={pagingMetaData?.totalPages}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default SocialWorkerDashboardPage;
