import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Pagination from '../../components/Payments/Pagination';
import { supplierDashboardTableData } from '../../testData/testDataPayRuns';
import SupplierDashboardInnerHeader from '../../components/SupplierDashboard/SupplierDashboardInnerHeader';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { changeSupplierReturnsDashboard } from '../../reducers/supplierDashboardReducer';
import withSession from '../../lib/session';
import { formatDate, formatStatus, getUserSession } from '../../service/helpers'
import Table from '../../components/Table'

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
    value: 'ascending',
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
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className="supplier-dashboard max-desktop-width">
      <SupplierDashboardInnerHeader />
      <Table
        onClickTableRow={onClickTableRow}
        rows={supplierDashboardTableData}
        rowsRules={{
          id: {
            getHide: () => true,
          },
          weekCommencing: {
            getValue: (value) => formatDate(value),
          },
          status: {
            getClassName: (value) => `${value} table__row-item-status`,
            getValue: (value) => formatStatus(value).slice(0, 1).toUpperCase() + formatStatus(value).slice(1, value.length),
          },
        }}
        fields={{
          id: 'id',
          weekCommencing: 'weekCommencing',
          value: 'value',
          totalPackages: 'totalPackages',
          returned: 'returned',
          inDispute: 'inDispute',
          accepted: 'accepted',
          paid: 'paid',
          status: 'status',
        }}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={10} pageSize={10} totalCount={30} />
      <HackneyFooterInfo />
    </div>
  );
};

export default SupplierDashboard;
