import React, {useEffect, useState} from "react";
import { useLocation, useHistory } from 'react-router-dom';
import BillsHeader from "./components/BillsHeader";
import PayRunTabs from "../Payments/components/PaymentsTabs";
import BillsTable from "./components/BillsTable";
import Pagination from "../Payments/components/Pagination";
import { billsPayRunsTableDate, billsTableDate } from "../../testData/TestDataPayRuns";
import PopupBillsPayDownload from "./components/PopupBillsPayDownload";
import BillsFilters from "./components/BillsFilters";

const sortsTab = {
  'bills': [
    {name: 'red', text: 'Ref'},
    {name: 'againstPackage', text: 'Against Package'},
    {name: 'from', text: 'From'},
    {name: 'date', text: 'Date'},
    {name: 'dueDate', text: 'Due Date'},
    {name: 'amount', text: 'Amount'},
    {name: 'paid', text: 'Paid'},
    {name: 'status', text: 'Status'},
  ],
  'bill-pay-runs': [
    {name: 'bprId', text: 'BPR ID'},
    {name: 'date', text: 'Date'},
    {name: 'invoicesPaid', text: 'Invoices Paid'},
    {name: 'totalValue', text: 'Total Value'},
    {name: '', text: ''},
  ],
};

const tabsClasses = {
  'bills': 'bills__tab-class',
  'bill-pay-runs': 'bill-pay-runs__tab-class',
};

const initialFilters = {
  packageId: '',
  supplier: '',
  dateRange: '',
  status: '',
};

const Bills = () => {
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [filters, setFilters] = useState({...initialFilters})
  const [openedPopup, setOpenedPopup] = useState('');
  const [payBills, setPayBills] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [tab, changeTab] = useState('bills');
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'ref',
  });

  const changeFilter = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const applyFilters = () => console.log('apply filters');

  const addBill = () => {
    setOpenedPopup('add-bill');
  };
  const isBillsTab = tab === 'bills';

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const closePopup = () => setOpenedPopup('');

  const onCheckRows = id => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => item != id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  }

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  return (
    <div className={`bills ${tab}__tab-class`}>
      {openedPopup === 'bills-pay-download' &&
        <PopupBillsPayDownload closePopup={closePopup} payBills={payBills} />
      }
      <BillsHeader addBill={addBill} />
      <PayRunTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          {text: 'Bills', value: 'bills'},
          {text: 'Bill Pay Runs', value: 'bill-pay-runs'}
        ]}
      />
      <BillsFilters
        supplierOptions={[]}
        filters={filters}
        changeFilter={changeFilter}
        applyFilters={applyFilters}
        statusOptions={[]}
        dateRangeOptions={[]}
        packageIdOptions={[]}
      />
      <BillsTable
        checkedRows={checkedRows}
        setCheckedRows={onCheckRows}
        isIgnoreId={true}
        classes={tabsClasses[tab]}
        rows={isBillsTab ? billsTableDate : billsPayRunsTableDate}
        sortBy={sortBy}
        sorts={sortsTab[tab]}
      />
      <Pagination
        actionButton={{
          text: 'Pay selected bills',
          onClick: () => console.log('pay selected bills'),
          classes: 'bills__pay-selected-bills'
        }}
        from={1}
        to={10}
        itemsCount={10}
        totalCount={30}
      />
      <div className='payments__footer'>
        <div className='payments__footer-info'>
          <p>Hackney Adult Social Care Services  ·  2021</p>
        </div>
      </div>
    </div>
  )
};

export default Bills;
