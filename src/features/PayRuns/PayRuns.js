import React, {useEffect, useState} from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import PayRunsHeader from "./components/PayRunsHeader";
import PayRunTabs from "./components/PayRunTabs";
import PayRunTable from "./components/PayRunTable";
import Pagination from "./components/Pagination";
import {payRunsTableDate} from "../../testData/PayRuns";
import PopupCreatePayRun from "./components/PopupCreatePayRun";

const sorts = [
  {name: 'id', text: 'ID'},
  {name: 'date', text: 'Date'},
  {name: 'type', text: 'Type'},
  {name: 'cadence', text: 'Cadence'},
  {name: 'paid', text: 'Paid'},
  {name: 'held', text: 'Held'},
  {name: 'status', text: 'Status'},
];

const tabsClasses = {
  'pay-runs': 'pay-runs__tab-class',
  'held-payments': 'pay-runs__held-payments-class',
};

const PayRuns = () => {
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [openedPopup, setOpenedPopup] = useState('');
  const [date, setDate] = useState(new Date());
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');

  const [headerOptions, setHeaderOptions] = useState({
    actionButtonText: 'Pay Runs',
    clickActionButton: () => {
      console.log('asd');
      setOpenedPopup('create-pay-run');
    },
  });

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [tab, changeTab] = useState('pay-runs');
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    changeHocAndRelease('');
    changeRegularCycles('');
    setDate(new Date());
  };

  useEffect(() => {
    if(location?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => pushRoute(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
      ]);
    }
  }, [location]);

  return (
    <div className='pay-runs'>
      {openedPopup === 'create-pay-run' &&
        <PopupCreatePayRun
          changeHocAndRelease={changeHocAndRelease}
          changeRegularCycles={changeRegularCycles}
          hocAndRelease={hocAndRelease}
          regularCycles={regularCycles}
          closePopup={closeCreatePayRun}
          date={date}
          setDate={setDate}
        />
      }
      {!!breadcrumbs.length && <Breadcrumbs values={breadcrumbs} />}
      <PayRunsHeader
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <PayRunTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          {text: 'Pay Runs', value: 'pay-runs'},
          {text: 'Held Payments', value: 'held-payments'}
        ]}
      />
      <PayRunTable
        classes={tabsClasses[tab]}
        rows={payRunsTableDate}
        careType='Residential'
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={10} itemsCount={10} totalCount={30} />
      <div className='pay-runs__footer'>
        <div className='pay-runs__footer-info'>
          <p>Hackney Adult Social Care Services  ·  2021</p>
        </div>
      </div>
    </div>
  )
};

export default PayRuns;
