import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { uniqBy, last } from 'lodash';
import useSWR from 'swr';
import {
  createNewPayRun,
  getAllInvoiceStatuses,
  getHeldInvoicePayments,
  getPaymentDepartments,
  getPayRunSummaryList,
  PAY_RUN_ENDPOINTS,
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
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import {
  getEnGBFormattedDate,
  sortArrayOfObjectsByDateAscending,
  sortArrayOfObjectsByDateDescending,
  sortArrayOfObjectsByNumberAscending,
  sortArrayOfObjectsByNumberDescending,
  sortArrayOfObjectsByStringAscending,
  sortArrayOfObjectsByStringDescending,
  stringIsNullOrEmpty,
} from '../../../api/Utils/FuncUtils';
import { axiosFetcher } from '../../../api/Utils/ApiUtils';
import { DATA_TYPES, SWR_OPTIONS } from '../../../api/Utils/CommonOptions';
import { mapPayRunStatuses, mapPayRunSubTypeOptions, mapPayRunTypeOptions } from '../../../api/Mappers/PayRunMapper';

const PAYMENT_TABS = [
  { text: 'Pay Runs', value: 'pay-runs' },
  { text: 'Held Payments', value: 'held-payments' },
];

const SORTS_TAB = {
  'pay-runs': [
    { name: 'id', text: 'ID', dataType: DATA_TYPES.STRING },
    { name: 'date', text: 'Date', dataType: DATA_TYPES.DATE },
    { name: 'type', text: 'Type', dataType: DATA_TYPES.STRING },
    { name: 'paid', text: 'Paid', dataType: DATA_TYPES.NUMBER },
    { name: 'held', text: 'Held', dataType: DATA_TYPES.NUMBER },
    { name: 'status', text: 'Status', dataType: DATA_TYPES.STRING },
  ],
  'held-payments': [
    { name: 'payRunDate', text: 'Pay run date', dataType: DATA_TYPES.DATE },
    { name: 'payRunId', text: 'Pay run ID', dataType: DATA_TYPES.STRING },
    { name: 'serviceUser', text: 'Service User', dataType: DATA_TYPES.STRING },
    { name: 'packageType', text: 'Package Type', dataType: DATA_TYPES.STRING },
    { name: 'supplier', text: 'Supplier', dataType: DATA_TYPES.STRING },
    { name: 'amount', text: 'Amount', dataType: DATA_TYPES.NUMBER },
    { name: 'status', text: 'Status', dataType: DATA_TYPES.STRING },
    { name: 'waitingFor', text: 'Waiting for', dataType: DATA_TYPES.STRING },
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
    holdPayments: {},
  });
  const [page] = useState(1);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
    dataType: DATA_TYPES.STRING,
  });
  const paginationInfo = listData[tab === 'pay-runs' ? 'payRun' : 'holdPayments']?.pagingMetaData || {};

  const [payRunFields] = useState({
    id: 'payRunId',
    date: 'dateCreated',
    type: 'payRunTypeName',
    paid: 'totalAmountPaid',
    held: 'totalAmountHeld',
    status: 'payRunStatusName',
  });

  const isPayRunsTab = tab === 'pay-runs';

  const filterOptions = useHeldPaymentsFilterOptions(listData.holdPayments.data);

  const sortBy = (field, value, dataType) => {
    setSort({ value, name: field, dataType });
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

  const getHeldInvoices = async (filters = {}) => {
    try {
      const { dateRange = '', serviceType, serviceUser, supplier, waitingOn } = filters;
      const [dateFrom, dateTo] = dateRange.split(' - ');

      const result = await getHeldInvoicePayments({
        dateTo,
        dateFrom,
        pageNumber: page,
        supplierId: supplier,
        waitingOnId: waitingOn,
        packageTypeId: serviceType,
        serviceUserId: serviceUser,
      });

      changeListData('holdPayments', result);
    } catch (error) {
      dispatch(addNotification({ text: 'Can not get hold payments' }));
    }
  };

  const getLists = (filters) => {
    const { id = '', type = '', status = '' } = filters || {};
    let payRunTypeId = '';
    let payRunSubTypeId = '';
    if (!stringIsNullOrEmpty(type)) {
      [payRunTypeId, payRunSubTypeId] = type.split(' - ');
    }
    if (tab === 'pay-runs') {
      getPayRunSummaryList({
        pageNumber: page,
        dateFrom: new Date(2021, 1, 1).toJSON(),
        dateTo: new Date(2021, 8, 31).toJSON(),
        payRunId: id,
        payRunTypeId,
        payRunSubTypeId,
        payRunStatusId: status,
      })
        .then((payRuns) => {
          changeListData('payRuns', payRuns);
        })
        .catch((err) => {
          dispatch(addNotification({ text: `Can not get hold payments: ${err?.message}` }));
        });
    } else {
      getHeldInvoices(filters);
    }
  };

  const getHelds = () => {
    getHeldInvoices();

    getPaymentDepartments()
      .then((res) => changeWaitingOn(res))
      .catch(() => dispatch(addNotification({ text: 'Fail get departments' })));
  };

  useEffect(() => {
    const { value = '', name = '', dataType = DATA_TYPES.STRING } = sort || {};
    let fieldName = '';
    let sortedList = [];
    if (tab === 'pay-runs') {
      const { data = [], pagingMetaData } = listData?.payRuns || {};
      fieldName = payRunFields[name];
      if (value === 'increase') {
        if (dataType === DATA_TYPES.STRING) sortedList = sortArrayOfObjectsByStringAscending(data, fieldName);
        else if (dataType === DATA_TYPES.DATE) sortedList = sortArrayOfObjectsByDateAscending(data, fieldName);
        else if (dataType === DATA_TYPES.NUMBER) sortedList = sortArrayOfObjectsByNumberAscending(data, fieldName);
      } else if (value === 'decrease') {
        if (dataType === DATA_TYPES.STRING) sortedList = sortArrayOfObjectsByStringDescending(data, fieldName);
        else if (dataType === DATA_TYPES.DATE) sortedList = sortArrayOfObjectsByDateDescending(data, fieldName);
        else if (dataType === DATA_TYPES.NUMBER) sortedList = sortArrayOfObjectsByNumberDescending(data, fieldName);
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
      await getHeldInvoices();
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
      dispatch(addNotification({ text: 'Release Success', className: 'success' }));
      setCheckedRows([]);

      await getHeldInvoices();
    } catch (error) {
      dispatch(addNotification({ text: 'Release Fail' }));
    }
  };

  const { data: payRunTypes = [] } = useSWR(
    PAY_RUN_ENDPOINTS.GET_ALL_PAY_RUN_TYPES,
    axiosFetcher,
    SWR_OPTIONS.REVALIDATE_ON_MOUNT
  );
  const { data: payRunSubTypes = [] } = useSWR(
    PAY_RUN_ENDPOINTS.GET_ALL_PAY_RUN_SUB_TYPES,
    axiosFetcher,
    SWR_OPTIONS.REVALIDATE_ON_MOUNT
  );
  const { data: uniquePayRunStatuses = [] } = useSWR(
    PAY_RUN_ENDPOINTS.GET_ALL_UNIQUE_PAY_RUN_STATUSES,
    axiosFetcher,
    SWR_OPTIONS.REVALIDATE_ON_MOUNT
  );

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
        typeOptions={[...mapPayRunTypeOptions(payRunTypes), ...mapPayRunSubTypeOptions(payRunSubTypes)]}
        statusOptions={mapPayRunStatuses(uniquePayRunStatuses)}
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
          releaseAllSelected={releaseAllSelected}
          rows={listData.holdPayments.data}
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

const useHeldPaymentsFilterOptions = (data = []) => {
  const createUniqueOptions = (values) => uniqBy(values, 'value');
  const getAllInvoiceValues = (key) =>
    data.reduce((acc, { invoices }) => {
      invoices.forEach((invoice) => acc.push({ value: invoice[`${key}Id`], text: invoice[`${key}Name`] }));
      return acc;
    }, []);

  const dateRangeOptions = uniqBy(
    data.map(({ dateFrom, dateTo }) => ({
      value: `${dateFrom} - ${dateTo}`,
      text: `${getEnGBFormattedDate(dateFrom)} - ${getEnGBFormattedDate(dateTo)}`,
    })),
    'value'
  );
  const serviceTypesOptions = createUniqueOptions(getAllInvoiceValues('packageType'));
  const serviceUserOptions = createUniqueOptions(getAllInvoiceValues('serviceUser'));
  const supplierOptions = createUniqueOptions(getAllInvoiceValues('supplier'));

  const waitingOnOptions = createUniqueOptions(
    data.reduce((acc, { invoices }) => {
      invoices.forEach(({ disputedInvoiceChat }) => {
        acc.push({
          value: last(disputedInvoiceChat).actionRequiredFromId,
          text: last(disputedInvoiceChat).actionRequiredFromName,
        });
      });
      return acc;
    }, [])
  );

  return {
    dateRangeOptions,
    serviceTypesOptions,
    waitingOnOptions,
    serviceUserOptions,
    supplierOptions,
  };
};

export default PayRunsPage;
