import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import {
  acceptInvoice,
  acceptInvoices,
  approvePayRunForPayment,
  deleteDraftPayRun,
  getAllInvoiceStatuses,
  getInvoicePaymentStatuses,
  getSinglePayRunDetails,
  getSinglePayRunInsights, holdInvoicePayment,
  kickPayRunBackToDraft,
  submitPayRunForApproval,
} from '../../../api/Payments/PayRunApi'
import Breadcrumbs from '../../../components/Breadcrumbs';
import Pagination from '../../../components/Payments/Pagination';
import { addNotification } from '../../../reducers/notificationsReducer';
import PopupCreatePayRun from '../../../components/PayRuns/PopupCreatePayRun';
import PayRunsLevelInsight from '../../../components/PayRuns/PayRunsLevelInsight';
import PayRunHeader from '../../../components/PayRuns/PayRunHeader';
import PopupHoldPayment from '../../../components/PayRuns/PopupHoldPayment';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import Table from '../../../components/Table'
import CustomDropDown from '../../../components/CustomDropdown'
import { currency } from '../../../constants/strings'
import PayRunCollapsedContent from '../../../components/PayRuns/PayRunCollapsedContent'

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PayRunPage = () => {
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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [invoices, setInvoices] = useState();
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [reason, setReason] = useState('');
  const [payRunDetails, setPayRunDetails] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [levelInsights, setLevelInsights] = useState();
  const [pathname] = useState(`/payments/pay-runs/${id}`);
  const [date, setDate] = useState(new Date());
  const [invoiceStatuses, setInvoiceStatuses] = useState([]);
  const [invoicePaymentStatuses, setInvoicePaymentStatuses] = useState([]);
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');

  const [headerOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
    },
  });

  const [breadcrumbs] = useState([
    { text: 'Payments', onClick: () => router.push('/payments/pay-runs') },
    { text: `Pay Run ${id}` },
  ]);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'serviceUser',
  });

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    setReason('');
    setActionRequiredBy('');
  };

  const onCheckRow = (rowItemId) => {
    if (checkedRows.includes(rowItemId)) {
      setCheckedRows(checkedRows.filter((item) => String(item) !== String(rowItemId)));
    } else {
      setCheckedRows([...checkedRows, rowItemId]);
    }
  };

  const getPayRunDetails = () => {
    if (!loading) {
      setLoading(true);
    }
    getSinglePayRunDetails(id, pageNumber)
      .then((res) => {
        console.log('res.invoices', res.invoices);
        setInvoices(res.invoices);
        setPayRunDetails(res.payRunDetails);
        setLoading(false);
      })
      .catch(() => {
        pushNotification('Can not get Pay Run details');
        setLoading(false);
      });
  };

  const actionButton = {
    classes: 'outline green',
    disabled: !checkedRows.length,
    onClick: () => {
      setLoading(true);
      const { payRunId } = payRunDetails;
      acceptInvoices(payRunId, checkedRows)
        .then(() => pushNotification('Accepted success'))
        .catch(() => pushNotification('Accepted fail'));
    },
    text: 'Accept all selected',
  };

  const submitPayRun = () => {
    setLoading(true);
    const { payRunId } = payRunDetails;
    if (!payRunDetails.submitted) {
      submitPayRunForApproval(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run approved');
          setLoading(false);
        })
        .catch(() => pushNotification('Can not submit for approve'));
    } else {
      approvePayRunForPayment(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run approved');
          setLoading(false);
        })
        .catch(() => pushNotification('Can not submit for approve'));
    }
  };

  const onDeletePayRunDraft = () => {
    setLoading(true);
    const { payRunId } = payRunDetails;
    console.log(payRunDetails);
    if (payRunDetails.draft) {
      deleteDraftPayRun(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run draft deleted', 'success');
          setLoading(false);
        })
        .catch(() => {
          pushNotification('Can not delete Pay Run draft');
          setLoading(false);
        });
    } else {
      kickPayRunBackToDraft(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run kick back success', 'success');
          setLoading(false);
        })
        .catch(() => {
          pushNotification('Can not kick back Pay Run');
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    getSinglePayRunInsights(id)
      .then((res) => {
        setLevelInsights(res);
      })
      .catch(() => pushNotification('Can not get Insights'));

    getPayRunDetails()
  }, []);

  useEffect(() => {
    getInvoicePaymentStatuses()
      .then((res) => setInvoicePaymentStatuses(res))
      .catch(() => pushNotification('Can not get invoice payment statuses'));

    getAllInvoiceStatuses()
      .then((res) => setInvoiceStatuses(res))
      .catch(() => pushNotification('Can not get all invoice statuses'));
  }, []);

  const changeInvoiceStatus = ({ displayName }, item) => {
    if(displayName === 'Accept') {
      acceptInvoice(id, item.invoiceId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Accept invoice success');
        })
        .catch(() => pushNotification('Accept invoice fail'));
    }
    if(displayName === 'Hold') {
      holdInvoicePayment(id, item.invoiceId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Hold invoice success');
        })
        .catch(() => pushNotification('Hold invoice fail'));
    }
  }

  const rowRules = {
    invoiceCheckbox: {
      type: 'checkbox',
      onChange: (value, item) => onCheckRow(item.invoiceId),
      getValue: (value, item) => !!checkedRows.find((invoiceId) => String(invoiceId) === String(item.invoiceId)),
    },
    totalAmount: {
      getValue: (value) => value ? `${currency.euro}${value}` : '-',
    },
    invoiceStatusId: {
      getComponent: (item) => {
        const { invoiceStatusId, invoiceId } = item;
        return (
          <CustomDropDown
            onOptionSelect={(value) => changeInvoiceStatus(value, item)}
            key={invoiceId}
            options={invoiceStatuses}
            className="table__row-item"
            fields={{
              value: 'statusId',
              text: 'displayName',
            }}
            initialText="Status"
            selectedValue={invoiceStatuses.find(status => String(status.id) === String(invoiceStatusId))}
          />
        );
      },
    }
  }

  return (
    <div className="pay-runs pay-run">
      {openedPopup === popupTypes.holdPayments && (
        <PopupHoldPayment
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
      {openedPopup === popupTypes.createPayRun && (
        <PopupCreatePayRun
          changeHocAndRelease={changeHocAndRelease}
          changeRegularCycles={changeRegularCycles}
          hocAndRelease={hocAndRelease}
          regularCycles={regularCycles}
          closePopup={closeCreatePayRun}
          date={date}
          setDate={setDate}
        />
      )}
      {!!breadcrumbs.length && <Breadcrumbs className="p-3" values={breadcrumbs} />}
      <PayRunHeader
        filter={getPayRunDetails}
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <Table
        fields={{
          invoiceCheckbox: 'invoiceCheckbox',
          serviceUser: 'serviceUserName',
          id: 'invoiceId',
          packageType: 'packageTypeName',
          supplier: 'supplierName',
          total: 'totalAmount',
          status: 'invoiceStatusId',
        }}
        getCollapsedContainer={(item) => <PayRunCollapsedContent invoice={item} />}
        rowsRules={rowRules}
        rows={invoices?.invoices}
        checkedRows={checkedRows}
        sortBy={sortBy}
        sorts={sorts}
        canCollapseRows
        changeAllChecked={setCheckedRows}
      />
      <Pagination
        pathname={pathname}
        changePagination={(newPageNumber) => setPageNumber(newPageNumber)}
        actionButton={actionButton}
        totalPages={invoices?.pagingMetaData.totalPages}
        currentPage={invoices?.pagingMetaData.currentPage}
        itemsCount={invoices?.pagingMetaData.pageSize}
        totalCount={invoices?.pagingMetaData.totalCount}
      />
      <PayRunsLevelInsight
        firstButton={{
          text: payRunDetails?.submitted ? 'Approve for payment' : 'Submit pay run for approval',
          onClick: () => submitPayRun(),
        }}
        secondButton={{
          text: payRunDetails.kickBack ? 'Kick back' : 'Delete draft pay run',
          onClick: () => onDeletePayRunDraft(),
        }}
        levelInsights={levelInsights}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default PayRunPage;
