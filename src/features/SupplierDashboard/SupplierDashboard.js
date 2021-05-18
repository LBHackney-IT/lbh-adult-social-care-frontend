import React, {useEffect, useState} from "react";
import { useLocation, useHistory } from 'react-router-dom';
import SupplierDashboardTable from "./components/SupplierDashboardTable";
import Pagination from "../Payments/components/Pagination";
import {supplierReturnsDashboardTableDate} from "../../testData/TestDataPayRuns";
import SupplierDashboardInnerHeader from "./components/SupplierDashboardInnerHeader";

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
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const onClickTableRow = (rowItems) => {
    pushRoute(`${location.pathname}/${rowItems.id}`)
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
        rows={supplierReturnsDashboardTableDate}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={10} itemsCount={10} totalCount={30} />
      <div className='payments__footer'>
        <div className='payments__footer-info'>
          <p>Hackney Adult Social Care Services  ·  2021</p>
        </div>
      </div>
    </div>
  )
};

export default SupplierDashboard;
