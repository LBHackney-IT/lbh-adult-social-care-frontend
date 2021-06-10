import React, {useEffect, useState} from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useRouter } from 'next/router';
import Pagination from "../../../components/Payments/Pagination";
import {supplierReturnTableData} from "../../../testData/testDataPayRuns";
import SupplierReturnsLevelInsight from "../../../components/SupplierReturns/SupplierReturnsLevelInsight";
import SupplierReturnsInnerHeader from "../../../components/SupplierReturns/SupplierReturnsInnerHeader";
import SupplierReturnTable from "../../../components/SupplierReturns/SupplierReturnTable";
import HackneyFooterInfo from "../../../components/HackneyFooterInfo";
import {formatDateWithSign, getUserSession} from "../../../service/helpers";
import {useDispatch, useSelector} from "react-redux";
import {selectSupplierReturns} from "../../../reducers/supplierReturnsReducer";
import { changeWeekOfSupplier } from "../../../reducers/supplierReturnsReducer";
import withSession from "../../../lib/session";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return {
      props: { user },
    }
  }

  return {
    props: {}, // will be passed to the page component as props
  }
});

const SupplierReturn = (props) => {
  const [sorts] = useState([
    {name: 'supplier', text: 'Supplier'},
    {name: 'packages', text: 'Packages'},
    {name: 'returned', text: 'Returned'},
    {name: 'withVariance', text: 'With Variance'},
    {name: 'inDispute', text: 'In Dispute'},
    {name: 'accepted', text: 'Accepted'},
    {name: 'status', text: 'Status'},
  ]);
  const dispatch = useDispatch();
  const router = useRouter();
  const [checkedRows, setCheckedRows] = useState([]);
  const {supplierReturns: { weekCommencing: date }} = useSelector(selectSupplierReturns);

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Supplier Returns', onClick: () => router.push('/payments/supplier-returns')},
    {text: `Return week commencing ${date ? formatDateWithSign(date, '.') : ''}`}
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'supplier',
  });

  const onClickTableRow = rowItemData => {
    dispatch(changeWeekOfSupplier(rowItemData));
    router.push(`/payments/supplier-returns/week-of-supplier/${rowItemData.id}`);
  }

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const onCheckRow = (id) => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => String(item) !== String(id)));
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
    if(router?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => router.push(`${value.route}`)},
        {text: `Pay Run ${router.query.id}`}
      ]);
    }
  }, []);

  useEffect(() => {
    router.replace(`${router.pathname}?page=1`);
  }, []);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className='supplier-return supplier-returns-dashboard'>
      {!!breadcrumbs.length && <Breadcrumbs classes='p-3' values={breadcrumbs} />}
      <SupplierReturnsInnerHeader />
      <SupplierReturnTable
        rows={supplierReturnTableData}
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        isIgnoreId={true}
        sortBy={sortBy}
        sorts={sorts}
        onClickTableRow={onClickTableRow}
      />
      <Pagination actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
      <SupplierReturnsLevelInsight
        suppliers='832'
        packages='832'
        totalValue='£92,321'
        returned='700'
        inDispute='42'
        accepted='678'
        paid='584'
      />
      <HackneyFooterInfo />
    </div>
  )
};

export default SupplierReturn;
