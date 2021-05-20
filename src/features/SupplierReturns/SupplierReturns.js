import React, {useEffect, useState} from "react";
import { useLocation, useHistory } from 'react-router-dom';
import SupplierReturnsTable from "./components/SupplierReturnsTable";
import Pagination from "../Payments/components/Pagination";
import {supplierReturnsTableData} from "../../testData/TestDataPayRuns";
import SupplierInnerHeader from "./components/SupplierInnerHeader";
import HackneyFooterInfo from "../components/HackneyFooterInfo";
import {useDispatch} from "react-redux";
import { changeSupplierReturns } from "../../reducers/supplierReturnsReducer";

const sorts = [
  {name: 'weekCommencing', text: 'Week commencing'},
  {name: 'suppliers', text: 'Suppliers'},
  {name: 'value', text: 'Value'},
  {name: 'totalPackages', text: 'Total Packages'},
  {name: 'returned', text: 'Returned'},
  {name: 'inDispute', text: 'In Dispute'},
  {name: 'accepted', text: 'Accepted'},
  {name: 'paid', text: 'Paid'},
  {name: 'status', text: 'Status'},
];

const SupplierReturns = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const onClickTableRow = (rowItems) => {
    dispatch(changeSupplierReturns(rowItems));
    pushRoute(`${location.pathname}/${rowItems.id}`)
  };

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  return (
    <div className='supplier-dashboard supplier-returns'>
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
  )
};

export default SupplierReturns;
