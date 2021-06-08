import React, {useEffect, useState} from "react";
import Breadcrumbs from "../../components/Breadcrumbs";
import { useRouter } from 'next/router';
import BillsTable from "../../components/Bills/BillsTable";
import Pagination from "../../components/Payments/Pagination";
import {payRunTableData} from "../../testData/testDataPayRuns";
import BillsHeader from "../../components/Bills/BillsHeader";
import PopupBillsPayDownload from "../../components/Bills/PopupBillsPayDownload";
import HackneyFooterInfo from "../../components/HackneyFooterInfo";

const sorts = [
  {name: 'serviceUser', text: 'Service User'},
  {name: 'invId', text: 'INV ID'},
  {name: 'packageType', text: 'Package Type'},
  {name: 'supplier', text: 'SupplierDashboard'},
  {name: 'total', text: 'Total'},
  {name: 'status', text: 'Status'},
];

const popupTypes = {
  createPayRun: 'create-pay-run',
  holdPayments: 'hold-payment',
};

const BillPage = () => {
  const router = useRouter();
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [reason, setReason] = useState('');
  const id = router.query?.id;

  const [headerOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
    },
  });

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Bills', onClick: () => router.push('/payments/bills')},
    {text: `Bill ${id}`}
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
      setCheckedRows(checkedRows.filter(item => String(item) !== String(id)));
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
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => router.push(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
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
        rows={payRunTableData}
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
      <HackneyFooterInfo />
    </div>
  )
};

export default BillPage;
