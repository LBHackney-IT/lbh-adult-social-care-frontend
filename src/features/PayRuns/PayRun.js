import React, {useEffect, useState} from "react";
import Breadcrumbs from "./components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import PayRunTable from "./components/PayRunTable";
import Pagination from "./components/Pagination";
import {payRunTableDate} from "../../testData/TestDataPayRuns";
import PopupCreatePayRun from "./components/PopupCreatePayRun";
import PayRunsLevelInsight from "./components/PayRunsLevelInsight";
import PayRunHeader from "./components/PayRunHeader";

const sorts = [
  {name: 'serviceUser', text: 'Service User'},
  {name: 'invId', text: 'INV ID'},
  {name: 'packageType', text: 'Package Type'},
  {name: 'supplier', text: 'Supplier'},
  {name: 'total', text: 'Total'},
  {name: 'status', text: 'Status'},
];

const PayRun = () => {
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [date, setDate] = useState(new Date());
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');
  const id = location.pathname.replace('/payments/pay-runs/', '');

  const [headerOptions, setHeaderOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      console.log('asd');
      setOpenedPopup('create-pay-run');
    },
  });

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Payments', onClick: () => pushRoute('/payments/pay-runs')},
    {text: `Pay Run ${id}`}
  ]);
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

  const onCheckRow = (id) => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => item != id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const actionButton = {
    classes: 'outline green',
    onClick: () => console.log('Accept all selected', checkedRows),
    text: 'Accept all selected',
  }

  useEffect(() => {
    if(location?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => pushRoute(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
      ]);
    }
  }, [location]);

  return (
    <div className='pay-runs pay-run'>
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
      {!!breadcrumbs.length && <Breadcrumbs classes='p-3' values={breadcrumbs} />}
      <PayRunHeader
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <PayRunTable
        rows={payRunTableDate}
        careType='Residential'
        isStatusDropDown={true}
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        isIgnoreId={true}
        canCollapseRows={true}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
      <PayRunsLevelInsight cost='£42,827' suppliersCount='100' servicesUsersCount='1000' costIncrease='£897' holdsCount='48' holdsPrice='£32,223' />
      <div className='pay-runs__footer'>
        <div className='pay-runs__footer-info'>
          <p>Hackney Adult Social Care Services  ·  2021</p>
        </div>
      </div>
    </div>
  )
};

export default PayRun;
