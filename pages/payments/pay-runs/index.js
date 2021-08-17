import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { pick } from 'lodash';
import {
  createNewPayRun,
  PAY_RUN_TYPES,
  releaseHeldInvoices,
  releaseSingleHeldInvoice,
} from '../../../api/Payments/PayRunApi';
import PopupInvoiceChat from '../../../components/Chat/PopupInvoiceChat';
import PayRunsHeader from '../../../components/PayRuns/PayRunsHeader';
import PaymentsTabs from '../../../components/Payments/PaymentsTabs';
import PayRunTable from '../../../components/PayRuns/PayRunTable';
import Pagination from '../../../components/Payments/Pagination';
import Table from '../../../components/Table';
import { addNotification } from '../../../reducers/notificationsReducer';
import PopupCreatePayRun from '../../../components/PayRuns/PopupCreatePayRun';
import ChatButton from '../../../components/PayRuns/ChatButton';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { formatStatus, getLoggedInUser, getUserSession } from '../../../service/helpers'
import withSession from '../../../lib/session';
import { getEnGBFormattedDate, sortArray } from '../../../api/Utils/FuncUtils';
import { DATA_TYPES } from '../../../api/Utils/CommonOptions';
import { mapPayRunStatuses, mapPayRunSubTypeOptions, mapPayRunTypeOptions } from '../../../api/Mappers/PayRunMapper';
import { useHeldInvoicePayments, usePaymentDepartments } from '../../../api/SWR';
import { usePayRunSubTypes, usePayRunTypes, useUniquePayRunStatuses } from '../../../api/SWR/transactions/payrun/usePayRunApi';
import usePayRunsSummaryList from '../../../api/SWR/transactions/usePayRunsSummaryList';
import useGroupedData from '../../../service/useGroupPayRun';

const PAYMENT_TABS = [
  { text: 'Pay Runs', value: 'pay-runs' },
  { text: 'Held Payments', value: 'held-payments' },
];

const SORTS_TAB = {
  'pay-runs': [
    { name: 'payRunId', text: 'ID', dataType: DATA_TYPES.STRING },
    { name: 'dateCreated', text: 'Date', dataType: DATA_TYPES.DATE },
    { name: 'payRunTypeName', text: 'Type', dataType: DATA_TYPES.STRING },
    { name: 'totalAmountPaid', text: 'Paid', dataType: DATA_TYPES.NUMBER },
    { name: 'totalAmountHeld', text: 'Held', dataType: DATA_TYPES.NUMBER },
    { name: 'payRunStatusName', text: 'Status', dataType: DATA_TYPES.STRING },
  ],
  'held-payments': [
    { name: 'payRunDate', text: 'Pay run date', dataType: DATA_TYPES.DATE },
    { name: 'payRunId', text: 'Pay run ID', dataType: DATA_TYPES.STRING },
    { name: 'serviceUserName', text: 'Service User', dataType: DATA_TYPES.STRING },
    { name: 'packageTypeName', text: 'Package Type', dataType: DATA_TYPES.STRING },
    { name: 'supplierName', text: 'Supplier', dataType: DATA_TYPES.STRING },
    { name: 'totalAmount', text: 'Amount', dataType: DATA_TYPES.NUMBER },
    { name: 'invoiceStatusId', text: 'Status', dataType: DATA_TYPES.NUMBER },
    { name: 'waitingFor', text: 'Waiting for', dataType: DATA_TYPES.STRING },
  ],
};

const PAY_RUN_FIELDS = {
  id: 'payRunId',
  date: 'dateCreated',
  type: 'payRunTypeName',
  paid: 'totalAmountPaid',
  held: 'totalAmountHeld',
  status: 'payRunStatusName',
};

const TABS_CLASSES = {
  'pay-runs': 'pay-runs__tab-class',
  'held-payments': 'pay-runs__held-payments-class',
};

const PAY_RUN_ROWS_RULES = {
  payRunId: {
    getClassName: () => 'link-button',
  },
  payRunStatusName: {
    getClassName: (value) => `${formatStatus(value)} table__row-item-status`,
    getValue: (value) => formatStatus(value, ' ', true),
  },
  dateCreated: {
    getValue: (value) => getEnGBFormattedDate(value),
  },
};

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const user = getLoggedInUser({ req });

  return {
    props: { loggedInUserId: user.userId, loggedInUserName: user.name }, // will be passed to the page component as props
  };
});

const PayRunsPage = ({ loggedInUserId, loggedInUserName }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [openedPopup, setOpenedPopup] = useState('');
  const [date, setDate] = useState(new Date());
  const [checkedRows, setCheckedRows] = useState([]);
  const [openedInvoiceChat, setOpenedInvoiceChat] = useState({});
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [newPayRunType, setNewPayRunType] = useState('');
  const [waitingOn, changeWaitingOn] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');
  const [tab, setTab] = useState('pay-runs');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    value: 'ascending',
    name: 'payRunId',
    dataType: DATA_TYPES.STRING,
  });

  const [filters, setFilters] = useState({});

  const isPayRunsTab = tab === 'pay-runs';

  useEffect(() => {
    setPage(1);
  }, [tab]);

  const { data: payRunTypes } = usePayRunTypes();
  const { data: payRunSubTypes } = usePayRunSubTypes();
  const { options: waitingOnOptions } = usePaymentDepartments();
  const { data: uniquePayRunStatuses } = useUniquePayRunStatuses();

  const { data: heldPayments, mutate: refetchHeldPayments } = useHeldInvoicePayments({
    params: pick(filters, ['dateStart', 'dateEnd', 'serviceType', 'serviceUser', 'supplier', 'waitingOn']),
    shouldFetch: !isPayRunsTab,
  });

  const { data: summaryList, mutate: refetchSummaryList } = usePayRunsSummaryList({
    params: {
      ...pick(filters, ['id', 'dateStart', 'dateEnd', 'type', 'status']),
      pageNumber: page,
    },
  });

  const {
    pagingMetaData: { pageSize, totalCount, totalPages },
  } = isPayRunsTab ? summaryList : heldPayments;

  const sortBy = (field, value, dataType) => {
    setSort({ value, name: field, dataType });
  };

  const changeTab = newTab => {
    setSort({
      value: 'ascending',
      name: SORTS_TAB[newTab][0].name,
      dataType: SORTS_TAB[newTab][0].dataType
    });
    setTab(newTab);
  }

  const closeCreatePayRun = async () => {
    setOpenedPopup('');
    changeHocAndRelease('');
    changeRegularCycles('');
    setDate(new Date());
    await refetchSummaryList();
  };

  const closeHelpChat = () => {
    setOpenedPopup('');
    changeWaitingOn('');
    setNewMessageText('');
  };

  const onCheckRows = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((item) => String(item) !== String(id)));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const onClickTableRow = (rowItem) => {
    router.push(`${router.pathname}/${rowItem.payRunId}`);
  };

  const openInvoiceChatItem = item => {
    const findItem = heldPayments?.data?.find(payRun => payRun.payRunId === item.payRunId);
    setOpenedInvoiceChat({
      ...findItem?.invoices[0],
      payRunId: item.payRunId,
      packageId: item.packageId,
      loggedInUserName,
    });
  }

  const heldActions = [
    {
      id: 'action1',
      onClick: (item) => {
        setOpenedPopup('help-chat');
        openInvoiceChatItem(item);
      },
      className: 'chat-icon',
      Component: ChatButton,
    },
  ];

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const sortedTableData = useMemo(() => {
    const tabData = isPayRunsTab ? summaryList.data : useGroupedData(heldPayments.data);
    return sortArray(tabData, sort)
  }, [sort, summaryList, heldPayments, isPayRunsTab]);

  const releaseOne = async (item, invoice) => {
    try {
      await releaseSingleHeldInvoice(item.payRunId, invoice.invoiceId);
      pushNotification(`Release invoice ${item.invoiceId}`, 'success');
      await refetchHeldPayments();
    } catch (error) {
      pushNotification(error);
    }
  };

  const payReleasedHolds = async () => {
    try {
      await createNewPayRun(PAY_RUN_TYPES.RESIDENTIAL_RELEASE_HOLDS, date);
      pushNotification(`Paid released holds`, 'success');
    } catch (error) {
      pushNotification(error);
    }
  };

  const releaseAllSelected = async (data) => {
    try {
      const selectedRows = checkedRows.reduce((acc, key) => {
        // find selected row
        const row = data.find((el) => el.key === key);

        // add all invoices of that row
        row.invoices.forEach((el) => {
          acc.push({ payRunId: row.payRunId, invoiceId: el.invoiceId });
        });

        return acc;
      }, []);

      await releaseHeldInvoices(selectedRows);
      pushNotification('Release Success','success');
      setCheckedRows([]);

      await refetchHeldPayments();
    } catch (error) {
      pushNotification(error);
    }
  };

  useEffect(() => {
    if(openedInvoiceChat) {
      openInvoiceChatItem(openedInvoiceChat);
    }
  }, [heldPayments]);

  const loading = !pageSize;

  return (
    <div className={`pay-runs ${tab}__tab-class`}>
      {openedPopup === 'create-pay-run' && (
        <PopupCreatePayRun
          changeHocAndRelease={changeHocAndRelease}
          changeRegularCycles={changeRegularCycles}
          hocAndRelease={hocAndRelease}
          regularCycles={regularCycles}
          closePopup={closeCreatePayRun}
          date={date}
          newPayRunType={newPayRunType}
          setNewPayRunType={setNewPayRunType}
          setDate={setDate}
        />
      )}
      {openedPopup === 'help-chat' && (
        <PopupInvoiceChat
          closePopup={closeHelpChat}
          newMessageText={newMessageText}
          setNewMessageText={setNewMessageText}
          waitingOn={waitingOn}
          changeWaitingOn={changeWaitingOn}
          currentUserInfo={openedInvoiceChat}
          updateChat={refetchHeldPayments}
          currentUserId={loggedInUserId}
          messages={openedInvoiceChat.disputedInvoiceChat}
          waitingOnOptions={waitingOnOptions}
        />
      )}
      <PayRunsHeader
        typeOptions={[...mapPayRunTypeOptions(payRunTypes), ...mapPayRunSubTypeOptions(payRunSubTypes)]}
        statusOptions={mapPayRunStatuses(uniquePayRunStatuses)}
        apply={setFilters}
        releaseHolds={payReleasedHolds}
        checkedItems={checkedRows}
        tab={tab}
        setOpenedPopup={setOpenedPopup}
      />
      <PaymentsTabs tab={tab} changeTab={changeTab} tabs={PAYMENT_TABS} />
      {isPayRunsTab ? (
        <Table
          rows={sortedTableData}
          rowsRules={PAY_RUN_ROWS_RULES}
          fields={PAY_RUN_FIELDS}
          sorts={SORTS_TAB[tab]}
          loading={loading}
          sortBy={sortBy}
          onClickTableRow={onClickTableRow}
        />
      ) : (
        <PayRunTable
          checkedRows={checkedRows}
          setCheckedRows={onCheckRows}
          isIgnoreId
          loading={loading}
          className={TABS_CLASSES[tab]}
          additionalActions={heldActions}
          changeAllChecked={setCheckedRows}
          canCollapseRows
          release={releaseOne}
          releaseAllSelected={releaseAllSelected}
          rows={sortedTableData}
          sortBy={sortBy}
          sorts={SORTS_TAB[tab]}
        />
      )}
      <Pagination
        from={page * pageSize - (pageSize - 1)}
        to={page * pageSize > totalCount ? totalCount : page * pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
        changePagination={setPage}
        currentPage={page}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default PayRunsPage;
