import React, {useEffect, useState} from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import PayRunsHeader from "./components/PayRunsHeader";
import PayRunTabs from "./components/PayRunTabs";
import PayRunTable from "./components/PayRunTable";
import Pagination from "./components/Pagination";
import {payRunsTableDate} from "../../testData/PayRuns";

const sorts = [
  {name: 'ID', text: 'id'},
  {name: 'Date', text: 'date'},
  {name: 'Type', text: 'type'},
  {name: 'Cadence', text: 'cadence'},
  {name: 'Paid', text: 'paid'},
  {name: 'Held', text: 'held'},
  {name: 'Status', text: 'status'},
];

const PayRuns = () => {
  const location = useLocation();
  const pushRoute = useHistory();

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [tab, changeTab] = useState('');
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
    console.log('sort by', field, value);
  };

  useEffect(() => {
    console.log(location);
    if(location?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => pushRoute(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
      ]);
    }
  }, [location]);

  return (
    <div className='pay-runs'>
      {!!breadcrumbs.length && <Breadcrumbs values={breadcrumbs} />}
      <PayRunsHeader  />
      <PayRunTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          {text: 'Pay Runs', value: 'pay-runs'},
          {text: 'Held Payments', value: 'held-payments'}
        ]}
      />
      <PayRunTable
        rows={payRunsTableDate}
        careType='Residential'
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={10} currentPage={1} itemsCount={10} totalCount={30} />
    </div>
  )
};

export default PayRuns;
