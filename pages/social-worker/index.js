import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { getUserSession, formatDate } from '../../service/helpers';
import withSession from '../../lib/session';
import { addNotification } from '../../reducers/notificationsReducer';
import { getSubmittedPackages, getSubmittedPackagesStatus } from '../../api/ApproversHub/SocialWorkerApi';
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
  const dispatch = useDispatch();
  const [sorts] = useState([
    { name: 'client', text: 'Client' },
    { name: 'category', text: 'Category' },
    { name: 'dob', text: 'DOB', dataType: DATA_TYPES.DATE },
    { name: 'approver', text: 'Approver' },
    { name: 'submittedDaysAgo', text: 'Submitted\n(days ago)' },
    { name: 'statusName', text: 'Status' },
  ]);

  const [initialFilters] = useState({
    terms: '',
    status: '',
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState({
    value: 'ascending',
    name: sorts[0].name,
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };
  const [socialWorkerData, setSubmittedPackages] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [filters, setFilters] = useState({...initialFilters});

  useEffect(() => {
    retrieveSocialWorkerData();
  }, [sort]);

  useEffect(() => {
    retrieveSocialWorkerData();
    retrieveStatusOptions();
  }, []);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }))
  }

  const onClickTableRow = (rowItems) => {
    rowItems.categoryId === 3
      ? rowItems.statusName === 'Draft'
      ? router.push(`${RESIDENTIAL_CARE_ROUTE}/${rowItems.packageId}`)
      : router.push(`${RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`)
      : rowItems.statusName === 'Draft'
      ? router.push(`${NURSING_CARE_ROUTE}/${rowItems.packageId}`)
      : router.push(`${NURSING_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
  };

  const retrieveSocialWorkerData = (page, statusId) => {
    setLoading(true);
    getSubmittedPackages(page, 50, filters.terms, statusId)
      .then((res) => {
        setSubmittedPackages(sortArray(res.data, sort));
        setPagedData(res.pagingMetaData);
        setLoading(false);
      })
      .catch((error) => {
        pushNotification(error);
        setLoading(false);
      });
  };

  const retrieveStatusOptions = () => {
    getSubmittedPackagesStatus()
      .then((response) => {
        const options = response.map((option) => ({
          text: option?.statusName,
          value: option?.id,
        }));
        setStatusOptions(options);
      })
      .catch((error) => {
        pushNotification(error)
      });
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

  const setPage = (page) => {
    retrieveSocialWorkerData(page);
  };

  const setSearchTerm = () => {
    retrieveSocialWorkerData(1, filters.terms);
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
        search: () => setSearchTerm(),
        className: 'mr-3'
      },
    ],
    dropdowns: [
      { options: statusOptions, initialText: 'Status', name: 'status', className: 'mr-3' },
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto ml-6', onClick: () =>  retrieveSocialWorkerData()},
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
        rows={socialWorkerData}
        loading={loading}
        rowsRules={rowsRules}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination
        currentPage={pagedData.currentPage}
        changePagination={setPage}
        pageSize={pagedData.pageSize}
        totalCount={pagedData.totalCount}
        totalPages={pagedData.totalPages}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default SocialWorkerDashboardPage;
