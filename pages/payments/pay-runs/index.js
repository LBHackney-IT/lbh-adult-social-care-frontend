import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { uniq, last } from 'lodash';
import {
  createNewPayRun,
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

  // const filterOptions = useFilterOptions(isPayRunsTab ? listData.payRuns : listData.holdPayments);
  const filterOptions = useFilterOptions(testData);

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
          // rows={listData?.holdPayments}
          rows={testData}
          sortBy={sortBy}
          sorts={SORTS_TAB[tab]}
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

const testData = [
  {
    payRunId: 'c88378e3-6deb-4429-9364-3598cb6224f0',
    payRunDate: '2021-06-16T17:14:25.528747+03:00',
    invoices: [
      {
        invoiceId: '38a8f4e9-3562-49ae-bab0-104f583471c8',
        invoiceNumber: 'INV 26',
        supplierId: 2,
        supplierName: 'XYZ Ltd',
        packageTypeId: 1,
        packageTypeName: 'Home Care Package',
        serviceUserId: '2f043f6f-09ed-42f0-ab30-c0409c05cb7e',
        serviceUserName: 'Henry Ford',
        dateInvoiced: '2021-06-16T17:06:35.509466+03:00',
        totalAmount: 100.0,
        supplierVATPercent: 0.0,
        invoiceStatusId: 4,
        creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
        updaterId: null,
        invoiceItems: [
          {
            invoiceItemId: '142c533b-d170-498a-a51d-06379747968c',
            invoiceId: '38a8f4e9-3562-49ae-bab0-104f583471c8',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Four',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: '59c4dee0-70f9-43de-af91-f00c90776cfe',
            invoiceId: '38a8f4e9-3562-49ae-bab0-104f583471c8',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item One',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: '611a19a1-9726-41ff-b269-586489c79ff6',
            invoiceId: '38a8f4e9-3562-49ae-bab0-104f583471c8',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Five',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: 'adb394c9-1720-4e1e-b1f1-94e12d03f604',
            invoiceId: '38a8f4e9-3562-49ae-bab0-104f583471c8',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Two',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: 'f24f13d5-6846-4466-bd1a-65203290eb63',
            invoiceId: '38a8f4e9-3562-49ae-bab0-104f583471c8',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Three',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
        ],
        disputedInvoiceChat: [
          {
            disputedInvoiceChatId: '381d9629-6956-468d-b53c-04433f34e663',
            disputedInvoiceId: 'cda5bed6-dd53-4b1c-8d6c-88ad0a14c0be',
            messageRead: false,
            message: 'Inaccurate amount',
            messageFromId: null,
            actionRequiredFromId: 1,
            actionRequiredFromName: 'Enzo Ferrari',
          },
        ],
      },
      {
        invoiceId: '62d10166-067d-4eb2-a239-e715b17e9d4c',
        invoiceNumber: 'INV 27',
        supplierId: 2,
        supplierName: 'XYZ Ltd',
        packageTypeId: 1,
        packageTypeName: 'Residential Care Package',
        serviceUserId: '2f043f6f-09ed-42f0-ab30-c0409c05cb7e',
        serviceUserName: 'Enzo Ferrari',
        dateInvoiced: '2021-06-16T17:06:36.064325+03:00',
        totalAmount: 100.0,
        supplierVATPercent: 0.0,
        invoiceStatusId: 4,
        creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
        updaterId: null,
        invoiceItems: [
          {
            invoiceItemId: '062901c8-3dbb-4e09-834c-9e58cae4527c',
            invoiceId: '62d10166-067d-4eb2-a239-e715b17e9d4c',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item One',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: '4966e7d5-c861-4259-baf3-392f275e74b9',
            invoiceId: '62d10166-067d-4eb2-a239-e715b17e9d4c',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Three',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: '585397db-5b35-40e6-b739-af3a2312fd1c',
            invoiceId: '62d10166-067d-4eb2-a239-e715b17e9d4c',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Four',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: 'a4bec7c4-9239-4af7-8dfd-d254a3f78462',
            invoiceId: '62d10166-067d-4eb2-a239-e715b17e9d4c',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Two',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
          {
            invoiceItemId: 'fb708268-8d4d-4b88-9ba1-b842a23e444f',
            invoiceId: '62d10166-067d-4eb2-a239-e715b17e9d4c',
            invoiceItemPaymentStatusId: 0,
            itemName: 'Item Five',
            pricePerUnit: 10.0,
            quantity: 2,
            subTotal: 20.0,
            vatAmount: 0.0,
            totalPrice: 20.0,
            supplierReturnItemId: null,
            creatorId: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8',
            updaterId: null,
          },
        ],
        disputedInvoiceChat: [
          {
            disputedInvoiceChatId: '4a8cbee5-5af0-4dbc-a060-d8c8d673c7d4',
            disputedInvoiceId: 'd872db56-4ee0-4aa0-b2e4-44eaa3433283',
            messageRead: false,
            message: 'Inaccurate amount',
            messageFromId: null,
            actionRequiredFromId: 1,
            actionRequiredFromName: 'Henri Ford',
          },
        ],
      },
    ],
  },
];

const useFilterOptions = (data) => {
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
  const statusOptions = createUniqueOptions(getAllInvoiceValues('invoiceStatusId'));

  const waitingOnOptions = createUniqueOptions(
    data.reduce((acc, payRun) => {
      payRun.invoices.forEach((invoice) => {
        acc.push(last(invoice.disputedInvoiceChat).actionRequiredFromName);
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
    statusOptions,
  };
};

export default PayRunsPage;
