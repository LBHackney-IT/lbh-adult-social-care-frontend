import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BillsHeader from '../../../components/Bills/BillsHeader';
import PaymentsTabs from '../../../components/Payments/PaymentsTabs';
import BillsTable from '../../../components/Bills/BillsTable';
import Pagination from '../../../components/Payments/Pagination';
import { billsPayRunsTableData, billsTableData } from '../../../testData/billsTestData';
import PopupBillsPayDownload from '../../../components/Bills/PopupBillsPayDownload';
import BillsFilters from '../../../components/Bills/BillsFilters';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const Bills = () => {
  const [sortsTab] = useState({
    bills: [
      { name: 'red', text: 'Ref' },
      { name: 'againstPackage', text: 'Against Package' },
      { name: 'from', text: 'From' },
      { name: 'date', text: 'Date' },
      { name: 'dueDate', text: 'Due Date' },
      { name: 'amount', text: 'Amount' },
      { name: 'paid', text: 'Paid' },
      { name: 'status', text: 'Status' },
    ],
    'bill-pay-runs': [
      { name: 'bprId', text: 'BPR ID' },
      { name: 'date', text: 'Date' },
      { name: 'invoicesPaid', text: 'Invoices Paid' },
      { name: 'totalValue', text: 'Total Value' },
      { name: '', text: '' },
    ],
  });

  const [tabsClasses] = useState({
    bills: 'bills__tab-class',
    'bill-pay-runs': 'bill-pay-runs__tab-class',
  });

  const [initialFilters] = useState({
    packageId: '',
    supplier: '',
    dateRange: '',
    status: '',
  });

  const router = useRouter();
  const [filters, setFilters] = useState({ ...initialFilters });
  const [openedPopup, setOpenedPopup] = useState('');
  const [payBills] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [tab, changeTab] = useState('bills');
  const [sort, setSort] = useState({
    value: 'ascending',
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
    router.push('/payments/bills/add-bill');
  };

  const isBillsTab = tab === 'bills';

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const closePopup = () => setOpenedPopup('');

  const onCheckRows = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((item) => String(item) !== String(id)));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  useEffect(() => {
    router.replace(`${router.pathname}?page=1`);
  }, []);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className={`bills ${tab}__tab-class`}>
      {openedPopup === 'bills-pay-download' && <PopupBillsPayDownload closePopup={closePopup} payBills={payBills} />}
      <BillsHeader addBill={addBill} />
      <PaymentsTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          { text: 'Bills', value: 'bills' },
          { text: 'Bill Pay Runs', value: 'bill-pay-runs' },
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
        rows={isBillsTab ? billsTableData : billsPayRunsTableData}
        sortBy={sortBy}
        sorts={sortsTab[tab]}
      />
      <Pagination
        actionButton={{
          text: 'Pay selected bills',
          onClick: () => console.log('pay selected bills', checkedRows),
          classes: 'bills__pay-selected-bills',
        }}
        from={1}
        to={10}
        pageSize={10}
        totalCount={30}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default Bills;
