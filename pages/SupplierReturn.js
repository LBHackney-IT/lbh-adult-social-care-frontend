import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from "../components/Payments/Pagination";
import {supplierReturnTableData} from "../testData/testDataPayRuns";
import SupplierReturnsLevelInsight from "../components/SupplierReturns/SupplierReturnsLevelInsight";
import SupplierReturnsInnerHeader from "../components/SupplierReturns/SupplierReturnsInnerHeader";
import SupplierReturnTable from "../components/SupplierReturns/SupplierReturnTable";
import HackneyFooterInfo from "../components/HackneyFooterInfo";
import {formatDateWithSign} from "../service/helpers";
import {useDispatch, useSelector} from "react-redux";
import {selectSupplierReturns} from "../reducers/supplierReturnsReducer";
import { changeWeekOfSupplier } from "../reducers/supplierReturnsReducer";

const sorts = [
  {name: 'supplier', text: 'Supplier'},
  {name: 'packages', text: 'Packages'},
  {name: 'returned', text: 'Returned'},
  {name: 'withVariance', text: 'With Variance'},
  {name: 'inDispute', text: 'In Dispute'},
  {name: 'accepted', text: 'Accepted'},
  {name: 'status', text: 'Status'},
];

const SupplierReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [checkedRows, setCheckedRows] = useState([]);
  const {supplierReturns: { weekCommencing: date }} = useSelector(selectSupplierReturns);

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Supplier Returns', onClick: () => pushRoute('/payments/supplier-returns')},
    {text: `Return week commencing ${date ? formatDateWithSign(date, '.') : ''}`}
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'supplier',
  });

  const onClickTableRow = rowItemData => {
    dispatch(changeWeekOfSupplier(rowItemData));
    pushRoute(`/payments/supplier-returns/week-of-supplier/${rowItemData.id}`);
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
    if(location?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => pushRoute(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
      ]);
    }
  }, []);

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
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
