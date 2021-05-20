import React, {useEffect, useState} from "react";
import { useLocation, useHistory } from 'react-router-dom';
import SupplierDashboardTable from "./components/SupplierDashboardTable";
import Pagination from "../Payments/components/Pagination";
import {supplierDashboardTableData} from "../../testData/TestDataPayRuns";
import SupplierDashboardInnerHeader from "./components/SupplierDashboardInnerHeader";
import HackneyFooterInfo from "../components/HackneyFooterInfo";
import {useDispatch} from "react-redux";
import { changeSupplierReturnsDashboard } from "../../reducers/supplierDashboardReducer";

const sorts = [
  {name: 'weekCommencing', text: 'Week commencing'},
  {name: 'value', text: 'Value'},
  {name: 'totalPackages', text: 'Total Packages'},
  {name: 'returned', text: 'Returned'},
  {name: 'inDispute', text: 'In Dispute'},
  {name: 'accepted', text: 'Accepted'},
  {name: 'paid', text: 'Paid'},
  {name: 'status', text: 'Status'},
];

const SupplierDashboard = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const onClickTableRow = (rowItems) => {
    dispatch(changeSupplierReturnsDashboard(rowItems));
    pushRoute(`${location.pathname}/supplier-returns/${rowItems.id}`)
  };

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  return (
    <div className='supplier-dashboard'>
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
  )
};

export default SupplierDashboard;
