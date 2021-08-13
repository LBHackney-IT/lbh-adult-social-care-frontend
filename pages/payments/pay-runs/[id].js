import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  acceptInvoice,
  acceptInvoices,
  approvePayRunForPayment,
  deleteDraftPayRun,
  holdInvoicePayment,
  kickPayRunBackToDraft,
  rejectInvoicePayment,
  submitPayRunForApproval,
} from '../../../api/Payments/PayRunApi';
import Breadcrumbs from '../../../components/Breadcrumbs';
import Pagination from '../../../components/Payments/Pagination';
import { addNotification } from '../../../reducers/notificationsReducer';
import PopupCreatePayRun from '../../../components/PayRuns/PopupCreatePayRun';
import PayRunsLevelInsight from '../../../components/PayRuns/PayRunsLevelInsight';
import PayRunHeader from '../../../components/PayRuns/PayRunHeader';
import PopupHoldPayment from '../../../components/PayRuns/PopupHoldPayment';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { formatStatus, getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import Table from '../../../components/Table';
import CustomDropDown from '../../../components/CustomDropdown';
import { currency } from '../../../constants/strings';
import PayRunCollapsedContent from '../../../components/PayRuns/PayRunCollapsedContent';
import {
  useInvoicePaymentStatuses,
  usePaymentDepartments,
} from '../../../api/SWR';
import {
  usePayRunSummaryInsights,
  useSinglePayRunDetails,
  useUniquePayRunPackageTypes,
  useUniquePayRunSuppliers
} from '../../../api/SWR/transactions/payrun/usePayRunApi';
import { DATA_TYPES } from '../../../api/Utils/CommonOptions';
import { sortArray } from '../../../api/Utils/FuncUtils';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PayRunPage = () => {
  const [sorts] = useState([
    { name: 'serviceUserName', text: 'Service User', dataType: DATA_TYPES.STRING },
    { name: 'invoiceId', text: 'INV ID', dataType: DATA_TYPES.STRING },
    { name: 'packageTypeName', text: 'Package Type', dataType: DATA_TYPES.STRING },
    { name: 'supplierName', text: 'SupplierDashboard', dataType: DATA_TYPES.STRING },
    { name: 'totalAmount', text: 'Total', dataType: DATA_TYPES.NUMBER },
    { name: 'invoiceStatusId', text: 'Status', dataType: DATA_TYPES.NUMBER },
  ]);

  const [popupTypes] = useState({
    createPayRun: 'create-pay-run',
    holdPayments: 'hold-payment',
  });
  const [invoice, setInvoice] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [reason, setReason] = useState('');
  const [pageNumber, setPageNumber] = useState(1);
  const [filters, setFilters] = useState({});
  const [pathname] = useState(`/payments/pay-runs/${id}`);
  const [date, setDate] = useState(new Date());
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');
  const [sortedInvoices, setSortedInvoices] = useState([]);

  const { data: paymentDepartments } = usePaymentDepartments();
  const { data: packageTypes } = useUniquePayRunPackageTypes(id);
  const { data: { data: suppliers } } = useUniquePayRunSuppliers(id);
  const { data: invoiceStatuses } = useInvoicePaymentStatuses();
  const { data : levelInsights } = usePayRunSummaryInsights(id)
  const { mutate: refetchSingleDetails , data : { invoices, payRunDetails } } = useSinglePayRunDetails({
    payRunId: id,
    pageNumber,
    serviceUserId: filters?.serviceUser?.id,
    invoiceStatusId: filters?.status,
    supplierId: filters?.supplier?.value,
    packageTypeId: filters?.type,
    dateFrom: filters?.dateFrom?.getTime && filters.dateFrom.toJSON(),
    dateTo: filters?.dateTo?.getTime && filters.dateTo.toJSON(),
  });

  const [breadcrumbs] = useState([
    { text: 'Payments', onClick: () => router.push('/payments/pay-runs') },
    { text: `Pay Run ${id}` },
  ]);
  const [sort, setSort] = useState({
    value: 'ascending',
    name: 'id',
    dataType: DATA_TYPES.STRING,
  });

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const sortBy = (field, value, dataType) => {
    setSort({ value, name: field, dataType });
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

  const actionButton = {
    classes: 'outline green',
    disabled: !checkedRows.length,
    onClick: () => {
      const { payRunId } = payRunDetails;
      acceptInvoices(payRunId, { invoiceIds: checkedRows })
        .then(async () => {
          setCheckedRows([]);
          pushNotification('Accepted success', 'success');
        })
        .catch((e) => {
          pushNotification(e);
        });
    },
    text: 'Accept all selected',
  };

  const submitPayRun = () => {
    const { payRunId } = payRunDetails;
    if (payRunDetails.payRunStatusName === 'Draft') {
      submitPayRunForApproval(payRunId)
        .then(async () => {
          refetchSingleDetails()
          pushNotification('Pay Run submitted for approval', 'success');
        })
        .catch((e) => {
          pushNotification(e || 'Can not submit for approve')
        });
    } else {
      approvePayRunForPayment(payRunId)
        .then(async () => {
          refetchSingleDetails();
          pushNotification('Pay Run approved', 'success');
        })
        .catch((e) => {
          pushNotification(e || 'Can not submit for approve');
        });
    }
  };

  const onDeletePayRunDraft = () => {
    const { payRunId } = payRunDetails;
    if (payRunDetails.payRunStatusName === 'Draft') {
      deleteDraftPayRun(payRunId)
        .then(async () => {
          refetchSingleDetails()
          pushNotification('Pay Run draft deleted', 'success');
          router.replace('/payments/pay-runs');
        })
        .catch(() => {
          refetchSingleDetails()
          pushNotification('Can not delete Pay Run draft');
        });
    } else {
      kickPayRunBackToDraft(payRunId)
        .then(async () => {
          refetchSingleDetails()
          pushNotification('Pay Run kick back success', 'success');
        })
        .catch(() => {
          pushNotification('Can not kick back Pay Run');
        });
    }
  };

  const sortInvoices = () => {
    if(!invoices?.invoices?.length) return;
    const data = invoices.invoices.slice();
    setSortedInvoices({ ...invoices, invoices: sortArray(data, sort) });
  }

  useEffect(() => {
    sortInvoices()
  }, [sort, invoices]);


  const holdInvoice = () => {
    const holdReason = {
      actionRequiredFromId: actionRequiredBy.departmentId,
      reasonForHolding: reason,
    };
    holdInvoicePayment(id, invoice.invoiceId, holdReason)
      .then(async () => {
        closeCreatePayRun();
        pushNotification('Hold invoice success', 'success');
      })
      .catch((e) => {
        pushNotification(e || 'Hold invoice fail');
      });
  }

  const changeInvoiceStatus = ({ statusName }, item) => {
    if (statusName === 'Accepted') {
      acceptInvoice(id, item.invoiceId)
        .then(async () => {
          refetchSingleDetails();
          pushNotification('Accept invoice success', 'success');
        })
        .catch((e) => {
          pushNotification(e || 'Accept invoice fail')
        });
    } else if (statusName === 'Held') {
      setInvoice(item);
      setOpenedPopup(popupTypes.holdPayments);
    } else if (statusName === 'Rejected') {
      rejectInvoicePayment(id, item.invoiceId)
        .then(async () => {
          refetchSingleDetails();
          pushNotification('Accept invoice success', 'success');
        })
        .catch((e) => {
          pushNotification(e || 'Reject invoice fail')
        });
    }
  };

  const rowRules = {
    getClassName: (item) => {
      const { invoiceStatusId } = item;
      const statusItem = invoiceStatuses.find((status) => status.statusId === invoiceStatusId);
      if (statusItem) return formatStatus(statusItem.statusName).toLowerCase();
    },
    invoiceCheckbox: {
      type: 'checkbox',
      onChange: (value, item) => onCheckRow(item.invoiceId),
      getValue: (value, item) => !!checkedRows.find((invoiceId) => String(invoiceId) === String(item.invoiceId)),
    },
    totalAmount: {
      getValue: (value) => (value ? `${currency.euro}${value}` : '-'),
    },
    invoiceStatusId: {
      getComponent: (item) => {
        const { invoiceStatusId, invoiceId } = item;
        const statusItem = invoiceStatuses.find((status) => status.statusId === invoiceStatusId);
        return (
          <CustomDropDown
            onlyEmptyText
            onOptionSelect={(value) => changeInvoiceStatus(value, item)}
            key={invoiceId}
            options={invoiceStatuses}
            className={`table__row-item table__row-item-status${
              statusItem ? ` ${statusItem.statusName.toLowerCase()}` : ''
            }`}
            fields={{
              value: 'statusId',
              text: 'statusName',
            }}
            initialText="Status"
            selectedValue={statusItem}
          />
        );
      },
    },
  };

  const statusOptions = invoiceStatuses.map((item) => ({
    value: item.statusId,
    text: item.statusName,
  }));

  const packageTypeOptions = packageTypes.map(item => ({
    value: item.packageTypeId,
    text: item.packageTypeName,
  }));

  const supplierOptions = !suppliers ? [] : suppliers.map(item => ({
    value: item.supplierId,
    name: item.supplierName,
  }));

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
      <PayRunHeader
        typeOptions={packageTypeOptions}
        serviceUserOptions={[]}
        changeFilters={setFilters}
        statusOptions={statusOptions}
        supplierOptions={supplierOptions}
      />
      <Table
        loading={!invoices}
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
        rows={sortedInvoices?.invoices}
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
        totalPages={invoices?.pagingMetaData?.totalPages}
        from={invoices?.pagingMetaData?.currentPage}
        to={invoices?.pagingMetaData?.pageSize}
        totalCount={invoices?.pagingMetaData?.totalCount}
      />
      <PayRunsLevelInsight
        firstButton={{
          text: payRunDetails?.payRunStatusName === 'Draft' ? 'Submit pay run for approval' : 'Approve for payment',
          onClick: () => submitPayRun(),
        }}
        secondButton={{
          text: payRunDetails?.payRunStatusName === 'Draft' ? 'Delete draft pay run' : 'Kick back',
          onClick: () => onDeletePayRunDraft(),
        }}
        levelInsights={levelInsights}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default PayRunPage;
