import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import BillsTable from "./components/BillsTable";
import Pagination from "../Payments/components/Pagination";
import {payRunTableDate} from "../../testData/TestDataPayRuns";
import BillsHeader from "./components/BillsHeader";
import PopupBillsPayDownload from "./components/PopupBillsPayDownload";

const sorts = [
  {name: 'serviceUser', text: 'Service User'},
  {name: 'invId', text: 'INV ID'},
  {name: 'packageType', text: 'Package Type'},
  {name: 'supplier', text: 'Supplier'},
  {name: 'total', text: 'Total'},
  {name: 'status', text: 'Status'},
];

const popupTypes = {
  createPayRun: 'create-pay-run',
  holdPayments: 'hold-payment',
};

const Bill = () => {
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [reason, setReason] = useState('');
  const id = location.pathname.replace('/payments/pay-runs/', '');

  const [headerOptions, setHeaderOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
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
    setReason('');
    setActionRequiredBy('');
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
      {openedPopup === popupTypes.holdPayments &&
        <PopupBillsPayDownload
          reason={reason}
          actionRequiredBy={actionRequiredBy}
          actionRequiredByOptions={[{text: 'Brokerage', value: 'brokerage'}, {text: 'Testage', value: 'testage'}]}
          changeActionRequiredBy={(value) => setActionRequiredBy(value)}
          closePopup={closeCreatePayRun}
          changeReason={value => setReason(value)}
        />
      }
      {!!breadcrumbs.length && <Breadcrumbs classes='p-3' values={breadcrumbs} />}
      <BillsHeader
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <BillsTable
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
      <div className='payments__footer'>
        <div className='payments__footer-info'>
          <p>Hackney Adult Social Care Services  ·  2021</p>
        </div>
      </div>
    </div>
  )
};

export default Bill;
