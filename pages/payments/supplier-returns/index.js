import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import SupplierReturnsTable from '../../../components/SupplierReturns/SupplierReturnsTable';
import Pagination from '../../../components/Payments/Pagination';
import { supplierReturnsTableData } from '../../../testData/testDataPayRuns';
import SupplierInnerHeader from '../../../components/SupplierReturns/SupplierInnerHeader';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { changeSupplierReturns } from '../../../reducers/supplierReturnsReducer';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const SupplierReturns = () => {
  const [sorts] = useState([
    { name: 'weekCommencing', text: 'Week commencing' },
    { name: 'suppliers', text: 'Suppliers' },
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
    name: 'weekCommencing',
  });

  const onClickTableRow = (rowItems) => {
    dispatch(changeSupplierReturns(rowItems));
    router.push(`${router.pathname}/${rowItems.id}`);
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
    <div className="supplier-dashboard supplier-returns">
      <SupplierInnerHeader />
      <SupplierReturnsTable
        isIgnoreId={true}
        onClickTableRow={onClickTableRow}
        checkedRows={true}
        rows={supplierReturnsTableData}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={10} itemsCount={10} totalCount={30} />
      <HackneyFooterInfo />
    </div>
  );
};

export default SupplierReturns;
