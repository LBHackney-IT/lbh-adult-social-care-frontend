import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Pagination from '../../../components/Payments/Pagination';
import { supplierReturnTableData } from '../../../testData/testDataPayRuns';
import SupplierReturnsLevelInsight from '../../../components/SupplierReturns/SupplierReturnsLevelInsight';
import SupplierReturnsInnerHeader from '../../../components/SupplierReturns/SupplierReturnsInnerHeader';
import SupplierReturnTable from '../../../components/SupplierReturns/SupplierReturnTable';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { formatDateWithSign, getUserSession } from '../../../service/helpers';
import { selectSupplierReturns, changeWeekOfSupplier } from '../../../reducers/supplierReturnsReducer';

import withSession from '../../../lib/session';
import { PAYMENTS_PAY_RUNS_ROUTE } from '../../../routes/RouteConstants';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const SupplierReturn = () => {
  const [sorts] = useState([
    { name: 'supplier', text: 'Supplier' },
    { name: 'packages', text: 'Packages' },
    { name: 'returned', text: 'Returned' },
    { name: 'withVariance', text: 'With Variance' },
    { name: 'inDispute', text: 'In Dispute' },
    { name: 'accepted', text: 'Accepted' },
    { name: 'status', text: 'Status' },
  ]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [pathname] = useState(`${PAYMENTS_PAY_RUNS_ROUTE}/${id}`);
  const [checkedRows, setCheckedRows] = useState([]);
  const {
    supplierReturns: { weekCommencing: date },
  } = useSelector(selectSupplierReturns);

  const [breadcrumbs] = useState([
    { text: 'Supplier Returns', onClick: () => router.push('/payments/supplier-returns') },
    { text: `Return week commencing ${date ? formatDateWithSign(date, '.') : ''}` },
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'supplier',
  });

  const onClickTableRow = (rowItemData) => {
    dispatch(changeWeekOfSupplier(rowItemData));
    router.push(`/payments/supplier-returns/week-of-supplier/${rowItemData.id}`);
  };

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const onCheckRow = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((item) => String(item) !== String(id)));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const actionButton = {
    classes: 'outline green mr-auto',
    onClick: () => console.log('Accept all selected', checkedRows),
    text: 'Accept all selected',
  };

  useEffect(() => {
    router.replace(`${pathname}?page=1`);
  }, []);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className="supplier-return supplier-returns-dashboard">
      {!!breadcrumbs.length && <Breadcrumbs classes="p-3" values={breadcrumbs} />}
      <SupplierReturnsInnerHeader />
      <SupplierReturnTable
        rows={supplierReturnTableData}
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        isIgnoreId
        sortBy={sortBy}
        sorts={sorts}
        onClickTableRow={onClickTableRow}
      />
      <Pagination pathname={pathname} actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
      <SupplierReturnsLevelInsight
        suppliers="832"
        packages="832"
        totalValue="£92,321"
        returned="700"
        inDispute="42"
        accepted="678"
        paid="584"
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default SupplierReturn;
