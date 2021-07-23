import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { useDispatch } from 'react-redux'
import Breadcrumbs from "../../../components/Breadcrumbs";
import PayRunTable from "../../../components/PayRuns/PayRunTable";
import Pagination from "../../../components/Payments/Pagination";
import PopupCreatePayRun from "../../../components/PayRuns/PopupCreatePayRun";
import PayRunsLevelInsight from "../../../components/PayRuns/PayRunsLevelInsight";
import PayRunHeader from "../../../components/PayRuns/PayRunHeader";
import PopupHoldPayment from "../../../components/PayRuns/PopupHoldPayment";
import HackneyFooterInfo from "../../../components/HackneyFooterInfo";
import { addNotification } from '../../../reducers/notificationsReducer'
import {
  acceptInvoice,
  acceptInvoices,
  approvePayRunForPayment,
  deleteDraftPayRun,
  getAllInvoiceStatuses,
  getInvoicePaymentStatuses,
  getSinglePayRunDetails,
  getSinglePayRunInsights,
  kickPayRunBackToDraft,
  submitPayRunForApproval
} from '../../../api/Payments/PayRunApi'

const serverPayRunsId = async () => {};

const PayRunPage = () => {
  const { data } = useSWR('', serverPayRunsId);
  const [sorts] = useState([
    {name: 'serviceUser', text: 'Service User'},
    {name: 'invId', text: 'INV ID'},
    {name: 'packageType', text: 'Package Type'},
    {name: 'supplier', text: 'SupplierDashboard'},
    {name: 'total', text: 'Total'},
    {name: 'status', text: 'Status'},
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
  const [levelInsights, setLevelInsights] = useState();
  const [pathname] = useState(`/payments/pay-runs/${id}`);
  const [date, setDate] = useState(new Date());
  const [invoiceStatuses, setInvoiceStatuses] = useState([])
  const [invoicePaymentStatuses, setInvoicePaymentStatuses] = useState([])
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');

  const [headerOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
    },
  });

  const [breadcrumbs] = useState([
    {text: 'Payments', onClick: () => router.push('/payments/pay-runs')},
    {text: `Pay Run ${id}`}
  ]);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'serviceUser',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const changeStatus = (item, status) => {
    console.log(item, status);
    acceptInvoice(id, item.invoiceId)
      .then(() => dispatch(addNotification({ text: 'Accept invoice success' })))
      .catch(() => dispatch(addNotification({ text: 'Accept invoce fail' })))
  }

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    setReason('');
    setActionRequiredBy('');
  };

  const onCheckRow = (rowItemId) => {
    if(checkedRows.includes(rowItemId)) {
      setCheckedRows(checkedRows.filter(item => String(item) !== String(rowItemId)));
    } else {
      setCheckedRows([...checkedRows, rowItemId]);
    }
  };

  const getPayRunDetails = () => {
    if(!loading) {
      setLoading(true);
    }
    getSinglePayRunDetails()
      .then(res => {
        setInvoices(res.invoices)
        setPayRunDetails(res.payRunDetails);
        setLoading(false);
      })
      .catch(() => {
        dispatch(addNotification({ text: 'Can not get Pay Run details' }))
        setLoading(false);
      })
  }

  const actionButton = {
    classes: 'outline green',
    disabled: !checkedRows.length,
    onClick: () => {
      setLoading(true);
      const { payRunId } = payRunDetails;
      acceptInvoices(payRunId, checkedRows)
        .then(() => pushNotification('Accepted success'))
        .catch(() => pushNotification('Accepted fail'))
    },
    text: 'Accept all selected',
  }

  const submitPayRun = () => {
    setLoading(true)
    const {payRunId} = payRunDetails;
    if(!payRunDetails.submitted) {
      submitPayRunForApproval(payRunId)
        .then(async () => {
          await getPayRunDetails();
          dispatch(addNotification({ text: 'Pay Run approved' }))
          setLoading(false);
        })
        .catch(() => dispatch(addNotification({ text: 'Can not submit for approve'})))
    } else {
        approvePayRunForPayment(payRunId).then(async () => {
          await getPayRunDetails();
          dispatch(addNotification({ text: 'Pay Run approved' }))
          setLoading(false);
        })
        .catch(() => dispatch(addNotification({ text: 'Can not submit for approve'})))
    }

  }

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const onDeletePayRunDraft = () => {
    setLoading(true);
    const {payRunId} = payRunDetails;
    if(payRunDetails.draft) {
      deleteDraftPayRun(payRunId)
        .then(async () => {
          await getPayRunDetails()
          dispatch(addNotification({ text: 'Pay Run draft deleted', className: 'success' }))
          setLoading(false)
        })
        .catch(() => {
          dispatch(addNotification({ text: 'Can not delete Pay Run draft' }))
          setLoading(false);
        });
    } else {
      kickPayRunBackToDraft(payRunId)
        .then(async () => {
          await getPayRunDetails()
          dispatch(addNotification({ text: 'Pay Run kick back success', className: 'success' }))
          setLoading(false)
        })
        .catch(() => {
          dispatch(addNotification({ text: 'Can not kick back Pay Run' }))
          setLoading(false);
        });
    }

  }

  useEffect(() => {
    getSinglePayRunInsights(id)
      .then(res => {
        setLevelInsights(res);
      })
      .catch(() => dispatch(addNotification({ text: 'Can not get Insights'})))
  }, []);

  useEffect(() => {
    getInvoicePaymentStatuses()
      .then(res => setInvoicePaymentStatuses(res))
      .catch(() => pushNotification('Can not get invoice payment statuses'))

    getAllInvoiceStatuses()
      .then(res => setInvoiceStatuses(res))
      .catch(() => pushNotification('Can not get all invoice statuses'))
  }, []);

  return (
    <div className='pay-runs pay-run'>
      {openedPopup === popupTypes.holdPayments &&
        <PopupHoldPayment
          reason={reason}
          actionRequiredBy={actionRequiredBy}
          actionRequiredByOptions={[{text: 'Brokerage', value: 'brokerage'}, {text: 'Testage', value: 'testage'}]}
          changeActionRequiredBy={(value) => setActionRequiredBy(value)}
          closePopup={closeCreatePayRun}
          changeReason={value => setReason(value)}
        />
      }
      {openedPopup === popupTypes.createPayRun &&
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
      {!!breadcrumbs.length && <Breadcrumbs className='p-3' values={breadcrumbs} />}
      <PayRunHeader
        filter={getPayRunDetails}
        actionButtonText={headerOptions.actionButtonText}
        clickActionButton={headerOptions.clickActionButton}
      />
      <PayRunTable
        rows={invoices}
        careType='Residential'
        isStatusDropDown
        changeAllChecked={setCheckedRows}
        checkedRows={checkedRows}
        selectStatus={changeStatus}
        setCheckedRows={onCheckRow}
        isIgnoreId
        canCollapseRows
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination
        pathname={pathname}
        actionButton={actionButton}
        totalPages={invoices?.pagingMetaData.totalPages}
        currentPage={invoices?.pagingMetaData.currentPage}
        itemsCount={invoices?.pagingMetaData.pageSize}
        totalCount={invoices?.pagingMetaData.totalCount}
      />
      {
        invoices &&
        <PayRunsLevelInsight
          firstButton={{
            text: payRunDetails?.submitted ? 'Approve for payment' : 'Submit pay run for approval',
            onClick: () => submitPayRun()
          }}
          secondButton={{
            text: payRunDetails.kickBack ? 'Kick back' : 'Delete draft pay run',
            onClick: () => onDeletePayRunDraft(),
          }}
          cost='£42,827'
          suppliersCount='100'
          servicesUsersCount='1000'
          costIncrease='£897'
          holdsCount='48'
          holdsPrice='£32,223'
        />
      }
      <HackneyFooterInfo />
    </div>
  )
};

export default PayRunPage;