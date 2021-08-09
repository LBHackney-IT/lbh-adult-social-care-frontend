import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { uniq, last } from 'lodash';
import {
  createNewPayRun,
  getAllInvoiceStatuses,
  getHeldInvoicePayments,
  getPaymentDepartments,
  getPayRunSummaryList,
  PAY_RUN_TYPES,
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
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import { getEnGBFormattedDate } from '../../../api/Utils/FuncUtils';

const PAYMENT_TABS = [
  { text: 'Pay Runs', value: 'pay-runs' },
  { text: 'Held Payments', value: 'held-payments' },
];

const SORTS_TAB = {
  'pay-runs': [
    { name: 'id', text: 'ID' },
    { name: 'date', text: 'Date' },
    { name: 'type', text: 'Type' },
    { name: 'paid', text: 'Paid' },
    { name: 'held', text: 'Held' },
    { name: 'status', text: 'Status' },
  ],
  'held-payments': [
    { name: 'payRunDate', text: 'Pay run date' },
    { name: 'payRunId', text: 'Pay run ID' },
    { name: 'serviceUser', text: 'Service User' },
    { name: 'packageType', text: 'Package Type' },
    { name: 'supplier', text: 'Supplier' },
    { name: 'amount', text: 'Amount' },
    { name: 'status', text: 'Status' },
    { name: 'waitingFor', text: 'Waiting for' },
  ],
};

const TABS_CLASSES = {
  'pay-runs': 'pay-runs__tab-class',
  'held-payments': 'pay-runs__held-payments-class',
};

const PAY_RUN_ROWS_RULES = {
  payRunId: {
    getClassName: () => 'button-link',
  },
  payRunStatusName: {
    getClassName: (value) => `${value} table__row-item-status`,
  },
  dateCreated: {
    getValue: (value) => getEnGBFormattedDate(value),
  },
};

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PayRunsPage = () => {
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
  const [tab, changeTab] = useState('pay-runs');
  const [invoiceStatuses, setInvoiceStatuses] = useState([]);
  const [listData, setListData] = useState({
    payRuns: {},
    holdPayments: [],
  });
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });
  const paginationInfo = listData[tab]?.pagingMetaData || {};

  const [payRunFields] = useState({
    id: 'payRunId',
    date: 'dateCreated',
    type: 'payRunTypeName',
    paid: 'totalAmountPaid',
    held: 'totalAmountHeld',
    status: 'payRunStatusName',
  });

  const isPayRunsTab = tab === 'pay-runs';

  const filterOptions = useHeldPaymentsFilterOptions(listData.holdPayments, invoiceStatuses);

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    changeHocAndRelease('');
    changeRegularCycles('');
    setDate(new Date());
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

  const heldActions = [
    {
      id: 'action1',
      onClick: (item) => {
        setOpenedPopup('help-chat');
        setOpenedInvoiceChat(item);
      },
      className: 'chat-icon',
      Component: ChatButton,
    },
  ];

  const changeListData = (field, value) => {
    setListData({
      ...listData,
      [field]: value,
    });
  };

  const getHeldInvoices = async () => {
    try {
      const result = await getHeldInvoicePayments({ pageNumber: page });
      changeListData('holdPayments', result);
    } catch (error) {
      dispatch(addNotification({ text: 'Can not get hold payments' }));
    }
  };

  const getLists = (filters) => {
    const { id = '', type = '', status = '' } = filters || {};
    if (tab === 'pay-runs') {
      getPayRunSummaryList({
        pageNumber: page,
        dateFrom: new Date(2021, 1, 1).toJSON(),
        dateTo: new Date(2021, 8, 31).toJSON(),
        payRunId: id,
        payRunTypeId: type,
        payRunSubTypeId: '',
        payRunStatusId: status,
      })
        .then((payRuns) => {
          changeListData('payRuns', payRuns);
        })
        .catch((err) => {
          dispatch(addNotification({ text: `Can not get hold payments: ${err?.message}` }));
        });
    } else {
      getHeldInvoices();
    }
  };

  const getHelds = () => {
    getHeldInvoices();

    getPaymentDepartments()
      .then((res) => changeWaitingOn(res))
      .catch(() => dispatch(addNotification({ text: 'Fail get departments' })));
  };

  useEffect(() => {
    const { value = '', name = '' } = sort || {};
    let fieldName = '';
    let sortedList = [];
    if (tab === 'pay-runs') {
      const { data = [], pagingMetaData } = listData?.payRuns || {};
      fieldName = payRunFields[name];
      if (value === 'increase') {
        sortedList = data.sort((a, b) => `${a[fieldName]}`.localeCompare(b[fieldName]));
      } else if (value === 'decrease') {
        sortedList = data.sort((a, b) => `${b[fieldName]}`.localeCompare(a[fieldName]));
      }
      changeListData('payRuns', { data: sortedList, pagingMetaData });
    } else if (tab === 'held-payments') {
      console.log(listData?.holdPayments?.data);
    }
  }, [sort]);

  useEffect(() => {
    if (tab === 'pay-runs') {
      getPayRunSummaryList({ pageNumber: page })
        .then((payRuns) => {
          changeListData('payRuns', payRuns);
        })
        .catch(() => {
          dispatch(addNotification({ text: 'Can not get hold payments' }));
        });
    } else {
      getHelds();
    }
  }, [tab, page]);

  useEffect(() => {
    getAllInvoiceStatuses()
      .then(setInvoiceStatuses)
      .catch(() => dispatch(addNotification({ text: 'Can not get all invoice statuses' })));
  }, []);

  const releaseOne = async (item, invoice) => {
    try {
      await releaseSingleHeldInvoice(item.payRunId, invoice.invoiceId);
      dispatch(addNotification({ text: `Release invoice ${item.invoiceId}`, className: 'success' }));
    } catch (error) {
      dispatch(addNotification({ text: 'Can not release invoices' }));
    }
  };

  const payReleasedHolds = async () => {
    try {
      await createNewPayRun(PAY_RUN_TYPES.RESIDENTIAL_RELEASE_HOLDS, date);
      dispatch(addNotification({ text: `Paid released holds`, className: 'success' }));
    } catch (error) {
      dispatch(addNotification({ text: 'Can not pay released holds' }));
    }
  };

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
          updateChat={getHelds}
          currentUserId={openedInvoiceChat.creatorId}
          messages={openedInvoiceChat.disputedInvoiceChat}
        />
      )}

      <PayRunsHeader
        apply={getLists}
        releaseHolds={payReleasedHolds}
        checkedItems={checkedRows}
        tab={tab}
        setOpenedPopup={setOpenedPopup}
        dateRangeOptions={filterOptions.dateRangeOptions}
        waitingOnOptions={filterOptions.waitingOnOptions}
        serviceTypesOptions={filterOptions.serviceTypesOptions}
        serviceUserOptions={filterOptions.serviceUserOptions}
        supplierOptions={filterOptions.supplierOptions}
        statusOptions={filterOptions.statusOptions}
      />

      <PaymentsTabs tab={tab} changeTab={changeTab} tabs={PAYMENT_TABS} />

      {isPayRunsTab ? (
        <Table
          rows={listData?.payRuns?.data}
          rowsRules={PAY_RUN_ROWS_RULES}
          fields={payRunFields}
          sorts={SORTS_TAB[tab]}
          sortBy={sortBy}
          onClickTableRow={onClickTableRow}
        />
      ) : (
        <PayRunTable
          checkedRows={checkedRows}
          setCheckedRows={onCheckRows}
          isIgnoreId
          className={TABS_CLASSES[tab]}
          additionalActions={heldActions}
          changeAllChecked={setCheckedRows}
          canCollapseRows
          release={releaseOne}
          rows={listData.holdPayments}
          sortBy={sortBy}
          sorts={SORTS_TAB[tab]}
          invoiceStatuses={invoiceStatuses}
        />
      )}

      <Pagination
        from={paginationInfo?.currentPage}
        to={paginationInfo?.pageSize}
        itemsCount={paginationInfo?.pageSize}
        totalCount={paginationInfo?.totalCount}
      />

      <HackneyFooterInfo />
    </div>
  );
};

const useHeldPaymentsFilterOptions = (data, invoiceStatuses) => {
  const createUniqueOptions = (values) => uniq(values).map((el) => ({ value: el, text: el }));
  const getAllInvoiceValues = (key) =>
    data.reduce((acc, payRun) => {
      payRun.invoices.forEach((invoice) => acc.push(invoice[key]));
      return acc;
    }, []);

  const dateRangeOptions = createUniqueOptions(data.map((payRun) => getEnGBFormattedDate(payRun.payRunDate)));
  const serviceTypesOptions = createUniqueOptions(getAllInvoiceValues('packageTypeName'));
  const serviceUserOptions = createUniqueOptions(getAllInvoiceValues('serviceUserName'));
  const supplierOptions = createUniqueOptions(getAllInvoiceValues('supplierName'));

  const waitingOnOptions = createUniqueOptions(
    data.reduce((acc, payRun) => {
      payRun.invoices.forEach((invoice) => {
        acc.push(last(invoice.disputedInvoiceChat).actionRequiredFromName);
      });
      return acc;
    }, [])
  );

  const statusOptions = invoiceStatuses.map((status) => ({
    value: status.statusId,
    text: status.statusName,
  }));

  return {
    dateRangeOptions,
    serviceTypesOptions,
    waitingOnOptions,
    serviceUserOptions,
    supplierOptions,
    statusOptions,
  };
};

export default PayRunsPage;
