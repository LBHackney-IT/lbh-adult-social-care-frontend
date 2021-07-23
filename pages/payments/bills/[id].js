import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from '../../../components/Breadcrumbs';
import BillsTable from '../../../components/Bills/BillsTable';
import Pagination from '../../../components/Payments/Pagination';
import { payRunTableData } from '../../../testData/testDataPayRuns';
import BillsHeader from '../../../components/Bills/BillsHeader';
import PopupBillsPayDownload from '../../../components/Bills/PopupBillsPayDownload';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import { PAYMENTS_BILLS_ROUTE } from '../../../routes/RouteConstants';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const BillPage = () => {
  const [sorts] = useState([
    { name: 'serviceUser', text: 'Service User' },
    { name: 'invId', text: 'INV ID' },
    { name: 'packageType', text: 'Package Type' },
    { name: 'supplier', text: 'SupplierDashboard' },
    { name: 'total', text: 'Total' },
    { name: 'status', text: 'Status' },
  ]);
  const [popupTypes] = useState({
    createPayRun: 'create-pay-run',
    holdPayments: 'hold-payment',
  });
  const router = useRouter();
  const { id } = router.query;
  const [pathname] = useState(`${PAYMENTS_BILLS_ROUTE}/${id}`);
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [reason, setReason] = useState('');

  const [headerOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
    },
  });

  const [breadcrumbs] = useState([
    { text: 'Bills', onClick: () => router.push(PAYMENTS_BILLS_ROUTE) },
    { text: `Bill ${id}` },
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    setReason('');
    setActionRequiredBy('');
  };

  const onCheckRow = (rowId) => {
    if (checkedRows.includes(rowId)) {
      setCheckedRows(checkedRows.filter((item) => String(item) !== String(rowId)));
    } else {
      setCheckedRows([...checkedRows, rowId]);
    }
  };

  const actionButton = {
    classes: 'outline green',
    onClick: () => console.log('Accept all selected', checkedRows),
    text: 'Accept all selected',
  };

  useEffect(() => {
    router.replace(`${pathname}?page=1`);
  }, []);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  return (
    <div className="pay-runs pay-run">
      {openedPopup === popupTypes.holdPayments && (
        <PopupBillsPayDownload
          reason={reason}
          actionRequiredBy={actionRequiredBy}
          actionRequiredByOptions={[
            { text: 'Brokerage', value: 'brokerage' },
            { text: 'Testage', value: 'testage' },
          ]}
          changeActionRequiredBy={(value) => setActionRequiredBy(value)}
          closePopup={closeCreatePayRun}
          changeReason={(value) => setReason(value)}
        />
      )}
      {!!breadcrumbs.length && <Breadcrumbs classes="p-3" values={breadcrumbs} />}
      <BillsHeader
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <BillsTable
        rows={payRunTableData}
        careType="Residential"
        isStatusDropDown
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        isIgnoreId
        canCollapseRows
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination pathname={pathname} actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
      <HackneyFooterInfo />
    </div>
  );
};

export default BillPage;
