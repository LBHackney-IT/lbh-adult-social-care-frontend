import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { getUserSession } from '../../service/helpers';
import withSession from '../../lib/session';
import DashboardTabs from '../../components/Dashboard/Tabs';
import ApproverInputs from '../../components/Approver/ApproverInputs';
import ApproverTable from '../../components/Approver/ApproverTable';
import {
  newItems,
  clarificationItems,
  awaitingBrokerageItems,
  completedItems,
  reviewCommercialsItems,
} from '../../testData/testDateApprovalHub';

export const getServerSideProps = withSession(async ({ req }) => {
  const user = getUserSession({ req });
  if (user.redirect) {
    return user;
  }

  return {
    props: {}, // will be passed to the page component as props
  };
});

const ApproverHubPage = () => {
  const route = useRouter();
  const [initialFilters] = useState({
    id: '',
    packageType: '',
    socialWorker: '',
    approver: '',
    byValue: '',
  });

  const [filters, setFilters] = useState({ ...initialFilters });
  const [timer, setTimer] = useState(null);

  const [sorts] = useState([
    { name: 'service-user', text: 'SERVICE USER' },
    { name: 'package-type', text: 'PACKAGE TYPE' },
    { name: 'care-value', text: 'CARE TYPE' },
    { name: 'Approver', text: 'APPROVER' },
    { name: 'submitted-by', text: 'SUBMITTED BY' },
    { name: 'id', text: 'ID' },
    { name: 'last-updated', text: 'LAST UPDATED' },
  ]);

  const [tab, setTab] = useState('new');

  const tabsTable = {
    new: newItems,
    clarification: clarificationItems,
    awaitingBrokerage: awaitingBrokerageItems,
    reviewCommercials: reviewCommercialsItems,
    completed: completedItems,
  };

  const [tabs] = useState([
    { className: 'border-2', value: 'new', text: `New ${newItems.length ? `(${newItems.length})` : ''}` },
    {
      value: 'clarification',
      text: `Clarification ${clarificationItems.length ? `(${clarificationItems.length})` : ''}`,
    },
    {
      className: 'border-2',
      value: 'awaitingBrokerage',
      text: `Awaiting Brokerage ${awaitingBrokerageItems.length ? `(${awaitingBrokerageItems.length})` : ''}`,
    },
    {
      className: 'border-2',
      value: 'reviewCommercials',
      text: `Review Commercials ${reviewCommercialsItems.length ? `(${reviewCommercialsItems.length})` : ''}`,
    },
    { value: 'completed', text: `Completed ${completedItems.length ? `(${completedItems.length})` : ''}` },
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const clickPackageType = (type) => setFilters({ ...filters, packageType: type });

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  useEffect(() => {
    setFilters({ ...initialFilters });
  }, []);

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        console.log('request with filters');
      }, 500)
    );
  }, [filters]);

  return (
    <div className="approver-hub-page">
      <ApproverInputs
        filters={filters}
        packageTypeOptions={[
          { value: 'home-type', text: 'Home Type' },
          { value: 'residential', text: 'Residential' },
          { value: 'nursing', text: 'Nursing' },
          { value: 'day-care', text: 'Day Care' },
          { value: 'home-care', text: 'Home Care' },
          { value: 'shared-lives', text: 'Shared Lives' },
        ]}
        setFilters={setFilters}
      />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <ApproverTable
        clickPackageType={clickPackageType}
        classes="p-4"
        onClickTableRow={() => route.push('/route')}
        rows={tabsTable[tab]}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={50} itemsCount={tabsTable[tab].length} totalCount={tabsTable[tab].length} />
      <HackneyFooterInfo />
    </div>
  );
};

export default ApproverHubPage;
