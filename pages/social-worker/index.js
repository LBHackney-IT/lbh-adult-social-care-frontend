import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { getUserSession } from '../../service/helpers';
import withSession from '../../lib/session';
import SocialWorkerInputs from '../../components/SocialWorker/SocialWorkerInputs';
import { socialWorkerDashboardTableData } from '../../testData/testDataSocialWorker';
import SocialWorkerTable from '../../components/SocialWorker/SocialWorkerTable';

export const getServerSideProps = withSession(async ({ req }) => {
  const user = getUserSession({ req });
  if (user.redirect) {
    return user;
  }

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
    router.push(`${router.pathname}/${rowItems.id}`);
  };

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className="social-worker-page">
      <SocialWorkerInputs />
      <SocialWorkerTable
        isIgnoreId
        classes="p-4"
        onClickTableRow={onClickTableRow}
        rows={socialWorkerDashboardTableData}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={50} itemsCount={10} totalCount={10} />
      <HackneyFooterInfo />
    </div>
  );
};

export default SocialWorkerDashboardPage;
