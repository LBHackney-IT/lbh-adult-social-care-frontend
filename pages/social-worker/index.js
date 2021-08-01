import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { getUserSession, formatDate } from '../../service/helpers';
import withSession from '../../lib/session';
import SocialWorkerInputs from '../../components/SocialWorker/SocialWorkerInputs';
import { getSubmittedPackages, getSubmittedPackagesStatus } from '../../api/ApproversHub/SocialWorkerApi';
import { RESIDENTIAL_CARE_ROUTE, NURSING_CARE_ROUTE, RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE, NURSING_CARE_APPROVE_PACKAGE_ROUTE } from '../../routes/RouteConstants';
import Table from '../../components/Table';

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
    { name: 'category', text: 'Category' },
    { name: 'dob', text: 'DOB' },
    { name: 'approver', text: 'Approver' },
    { name: 'submitted', text: 'Submitted\n(days ago)' },
    { name: 'status', text: 'Status' },
  ]);

  const router = useRouter();
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const onClickTableRow = (rowItems) => {
    rowItems.categoryId === 3
      ? rowItems.statusName == "Draft" ? router.push(`${RESIDENTIAL_CARE_ROUTE}/${rowItems.packageId}`) : router.push(`${RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`)
      : rowItems.statusName == "Draft" ? router.push(`${NURSING_CARE_ROUTE}/${rowItems.packageId}`) : router.push(`${NURSING_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`)
  };

  const [socialWorkerData, setSubmittedPackages] = useState([]);
  const [pagedData, setPagedData] = useState([]);
  const [statusOptions, setStatusOptions] = useState([]);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  useEffect(() => {
    retrieveSocialWorkerData();
    retrieveStatusOptions();
  }, []);

  const retrieveSocialWorkerData = (page, clientName, statusId) => {
    getSubmittedPackages(page, 50, clientName, statusId)
      .then((res) => {
        const pagedData = res.pagingMetaData;
        const options = res.data.map((option) => ({
          client: option.client,
          packageId: option.packageId,
          categoryId: option.categoryId,
          category: option.category,
          dateOfBirth: option.dateOfBirth,
          approver: option.approver,
          submittedDaysAgo: option.submittedDaysAgo,
          statusName: option.statusName,
        }));
        setSubmittedPackages(options);
        setPagedData(pagedData);
      })
      .catch((error) => {
        setErrors([...errors, `Retrieve Submitted Packages Requests failed. ${error.message}`]);
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
        setErrors([...errors, `Retrieve status options failed. ${error.message}`]);
      });
  };

  const rowsRules = {
    dateOfBirth: {
      getValue: (value) => `${formatDate(value, '/')}`,
    },
    status: {
      getClassName: (value) => `${value} table__row-item-status`,
    },
  };

  const tableFields = {
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

  const setSearchTerm = (clientName) => {
    retrieveSocialWorkerData(1, clientName);
  };

  return (
    <div className="social-worker-page">
      <SocialWorkerInputs statusOptions={statusOptions} searchTerm={setSearchTerm} />
      <Table
        onClickTableRow={onClickTableRow}
        fields={tableFields}
        rows={socialWorkerData}
        rowsRules={rowsRules}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination
        currentPage={pagedData.currentPage}
        changePagination={setPage}
        itemsCount={pagedData.pageSize}
        totalCount={pagedData.totalCount}
        totalPages={pagedData.totalPages}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default SocialWorkerDashboardPage;
