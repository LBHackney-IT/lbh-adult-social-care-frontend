import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import SupplierDashboardTable from '../../components/SupplierDashboard/SupplierDashboardTable';
import Pagination from '../../components/Payments/Pagination';
import { supplierDashboardTableData } from '../../testData/testDataPayRuns';
import SupplierDashboardInnerHeader from '../../components/SupplierDashboard/SupplierDashboardInnerHeader';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { changeSupplierReturnsDashboard } from '../../reducers/supplierDashboardReducer';
import withSession from '../../lib/session';
import { getUserSession } from '../../service/helpers';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const SupplierDashboard = () => {
  const [sorts] = useState([
    { name: 'weekCommencing', text: 'Week commencing' },
    { name: 'value', text: 'Value' },
    { name: 'totalPackages', text: 'Total Packages' },
    { name: 'returned', text: 'Returned' },
    { name: 'inDispute', text: 'In Dispute' },
    { name: 'accepted', text: 'Accepted' },
    { name: 'paid', text: 'Paid' },
    { name: 'status', text: 'Status' },
  ]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const onClickTableRow = (rowItems) => {
    dispatch(changeSupplierReturnsDashboard(rowItems));
    router.push(`${router.pathname}/supplier-returns/${rowItems.id}`);
  };

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  useEffect(() => {
    router.replace(`${router.pathname}?page=1`);
  }, []);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className="supplier-dashboard">
      <SupplierDashboardInnerHeader />
      <SupplierDashboardTable
        isIgnoreId={true}
        onClickTableRow={onClickTableRow}
        rows={supplierDashboardTableData}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={10} itemsCount={10} totalCount={30} />
      <HackneyFooterInfo />
    </div>
  );
};

export default SupplierDashboard;
