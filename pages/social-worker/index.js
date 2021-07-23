import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { getUserSession } from '../../service/helpers';
import withSession from '../../lib/session';
import SocialWorkerInputs from '../../components/SocialWorker/SocialWorkerInputs';
import SocialWorkerTable from '../../components/SocialWorker/SocialWorkerTable';
import { getSubmittedPackages, getSubmittedPackagesStatus } from '../../api/ApproversHub/SocialWorkerApi';
import { RESIDENTIAL_CARE_ROUTE, NURSING_CARE_ROUTE} from '../../routes/RouteConstants';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const SocialWorkerDashboardPage = () => {
  const [sorts] = useState([
    { name: 'client', text: 'Client'},
    { name: 'packageId', text: 'Package ID' },
    { name: 'primarySupport', text: 'Primary Support Reason' },
    { name: 'category', text: 'Category', value: 'categoryId' },
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
    console.log(rowItems);
    {rowItems.categoryId === 3 ? (
      router.push(`${RESIDENTIAL_CARE_ROUTE}/${rowItems.packageId}`)
    ) : (
      router.push(`${NURSING_CARE_ROUTE}/${rowItems.packageId}`)
    )}
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

  const retrieveSocialWorkerData = (clientId, statusId) => {
    getSubmittedPackages(1, 50, clientId, statusId)
      .then((res) => {
        const pagedData = res.pagingMetaData
        const options = res.data.map((option) => ({
          client: option.client,
          packageId: option.packageId,
          primarySupportReason : option.primarySupportReason,
          categoryId : option.categoryId,
          category : option.category,
          dateOfBirth : option.dateOfBirth,
          approver : option.approver,
          submittedDaysAgo : option.submittedDaysAgo,
          statusName : option.statusName
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
        setErrors([
          ...errors,
          `Retrieve status options failed. ${error.message}`,
        ]);
      });
  };

  return (
    <div className="social-worker-page">
      <SocialWorkerInputs 
        statusOptions = {statusOptions}
      />
      <SocialWorkerTable
        isIgnoreId
        className="p-4"
        onClickTableRow={onClickTableRow}
        rows={socialWorkerData}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={pagedData.currentPage} to={pagedData.totalPages} itemsCount={pagedData.totalCount} totalCount={pagedData.totalPages} />
      <HackneyFooterInfo />
    </div>
  );
};

export default SocialWorkerDashboardPage;
