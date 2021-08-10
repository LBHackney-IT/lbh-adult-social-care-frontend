import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router';
import {
  acceptInvoice,
  acceptInvoices,
  approvePayRunForPayment,
  deleteDraftPayRun,
  getInvoicePaymentStatuses, getPaymentDepartments,
  getSinglePayRunDetails,
  getSinglePayRunInsights, holdInvoicePayment,
  kickPayRunBackToDraft, rejectInvoicePayment,
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
import { formatStatus, getUserSession } from '../../../service/helpers'
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
  const [paymentDepartments, setPaymentDepartments] = useState([]);
  const [invoice, setInvoice] = useState(null);
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
  const [filters, setFilters] = useState({});
  const [levelInsights, setLevelInsights] = useState();
  const [pathname] = useState(`/payments/pay-runs/${id}`);
  const [date, setDate] = useState(new Date());
  const [invoiceStatuses, setInvoiceStatuses] = useState([]);
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');

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
    console.log(filters);
    getSinglePayRunDetails({
      payRunId: id,
      pageNumber,
      searchTerm: filters?.serviceUser,
      invoiceStatusId: filters?.invoiceNo,
      dateFrom: filters?.dateFrom,
      dateTo: filters?.dateTo || new Date(),
    })
      .then((res) => {
        setInvoices(res.invoices);
        setPayRunDetails(res.payRunDetails);
        setLoading(false);
      })
      .catch((e) => {
        pushNotification(e || 'Can not get Pay Run details');
        setLoading(false);
      });
  };

  const actionButton = {
    classes: 'outline green',
    disabled: !checkedRows.length,
    onClick: () => {
      setLoading(true);
      const { payRunId } = payRunDetails;
      acceptInvoices(payRunId, { invoiceIds: checkedRows })
        .then(async () => {
          await getPayRunDetails();
          setCheckedRows([]);
          pushNotification('Accepted success', 'success')
        })
        .catch((e) => {
          pushNotification(e)
        });
    },
    text: 'Accept all selected',
  };

  const submitPayRun = () => {
    setLoading(true);
    const { payRunId } = payRunDetails;
    if (payRunDetails.payRunStatusName === 'Draft') {
      submitPayRunForApproval(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run submitted for approval', 'success');
          setLoading(false);
        })
        .catch(() => pushNotification('Can not submit for approve'));
    } else {
      approvePayRunForPayment(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run approved', 'success');
          setLoading(false);
        })
        .catch(() => pushNotification('Can not submit for approve'));
    }
  };

  const onDeletePayRunDraft = () => {
    setLoading(true);
    const { payRunId } = payRunDetails;
    if (payRunDetails.payRunStatusName === 'Draft') {
      deleteDraftPayRun(payRunId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Pay Run draft deleted', 'success');
          setLoading(false);
          router.replace('/payments/pay-runs');
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
    getPayRunDetails()
  }, [pageNumber]);

  useEffect(() => {
    getPaymentDepartments()
      .then(res => setPaymentDepartments(res))
      .catch(() => pushNotification('Fail get Departments'))
    getSinglePayRunInsights(id)
      .then((res) => {
        setLevelInsights(res);
      })
      .catch(() => pushNotification('Can not get Insights'));
  }, []);

  useEffect(() => {
    getInvoicePaymentStatuses()
      .then((res) => setInvoiceStatuses(res))
      .catch((e) => pushNotification(e || 'Can not get invoice payment statuses'));
  }, []);

  const holdInvoice = () => {
    const holdReason = {
      actionRequiredFromId: actionRequiredBy.departmentId,
      reasonForHolding: reason,
    };
    holdInvoicePayment(id, invoice.invoiceId, holdReason)
      .then(async () => {
        await getPayRunDetails();
        closeCreatePayRun();
        pushNotification('Hold invoice success', 'success');
      })
      .catch((e) => pushNotification(e || 'Hold invoice fail'));
  }

  const changeInvoiceStatus = ({ statusName }, item) => {
    if(statusName === 'Accepted') {
      acceptInvoice(id, item.invoiceId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Accept invoice success', 'success');
        })
        .catch((e) => pushNotification(e || 'Accept invoice fail'));
    } else if(statusName === 'Held') {
      setInvoice(item);
      setOpenedPopup(popupTypes.holdPayments);
    } else if(statusName === 'Rejected') {
      rejectInvoicePayment(id, item.invoiceId)
        .then(async () => {
          await getPayRunDetails();
          pushNotification('Accept invoice success', 'success');
        })
        .catch((e) => pushNotification(e || 'Reject invoice fail'));
    }
  }

  const rowRules = {
    getClassName: (item) => {
      const { invoiceStatusId } = item;
      const statusItem = invoiceStatuses.find(status => status.statusId === invoiceStatusId);
      if(statusItem) return formatStatus(statusItem.statusName).toLowerCase();
    },
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
        const statusItem = invoiceStatuses.find(status => status.statusId === invoiceStatusId);
        return (
          <CustomDropDown
            onlyEmptyText
            onOptionSelect={(value) => changeInvoiceStatus(value, item)}
            key={invoiceId}
            options={invoiceStatuses}
            className={`table__row-item table__row-item-status${statusItem ? ` ${statusItem.statusName.toLowerCase()}` : ''}`}
            fields={{
              value: 'statusId',
              text: 'statusName',
            }}
            initialText="Status"
            selectedValue={statusItem}
          />
        );
      },
    }
  }

  const statusOptions = invoiceStatuses.map(item => ({
    value: item.statusId,
    text: item.statusName,
  }))

  statusOptions.unshift({
    value: '0.1',
    text: 'Status',
  });

  return (
    <div className="pay-runs pay-run">
      {openedPopup === popupTypes.holdPayments && (
        <PopupHoldPayment
          reason={reason}
          holdInvoice={holdInvoice}
          actionRequiredBy={actionRequiredBy}
          actionRequiredByOptions={paymentDepartments}
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
      <PayRunHeader changeFilters={setFilters} statusOptions={statusOptions} filter={getPayRunDetails} />
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
          text: payRunDetails.payRunStatusName === 'Draft' ? 'Submit pay run for approval' : 'Approve for payment',
          onClick: () => submitPayRun(),
        }}
        secondButton={{
          text: payRunDetails.payRunStatusName === 'Draft' ? 'Delete draft pay run' : 'Kick back',
          onClick: () => onDeletePayRunDraft(),
        }}
        levelInsights={levelInsights}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default PayRunPage;
