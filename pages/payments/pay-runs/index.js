import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useSWR from 'swr';
import {
  getHeldInvoicePayments,
  getPaymentDepartments,
  getPayRunSummaryList,
  PAY_RUN_ENDPOINTS,
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
import { getEnGBFormattedDate, stringIsNullOrEmpty } from '../../../api/Utils/FuncUtils';
import { axiosFetcher } from '../../../api/Utils/ApiUtils';
import { SWR_OPTIONS } from '../../../api/Utils/CommonOptions';
import { mapPayRunStatuses, mapPayRunSubTypeOptions, mapPayRunTypeOptions } from '../../../api/Mappers/PayRunMapper';

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PayRunsPage = () => {
  const dispatch = useDispatch();
  const [sortsTab] = useState({
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
      { name: 'supplier', text: 'SupplierDashboard' },
      { name: 'amount', text: 'Amount' },
      { name: 'status', text: 'Status' },
      { name: 'waitingFor', text: 'Waiting for' },
    ],
  });

  const [tabsClasses] = useState({
    'pay-runs': 'pay-runs__tab-class',
    'held-payments': 'pay-runs__held-payments-class',
  });

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
    holdPayments: {},
  });
  const [page] = useState(1);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });
  const paginationInfo = listData[tab]?.pagingMetaData || {};

  const [payRunRowsRules] = useState({
    payRunId: {
      getClassName: () => 'button-link',
    },
    payRunStatusName: {
      getClassName: (value) => `${value} table__row-item-status`,
    },
    dateCreated: {
      getValue: (value) => getEnGBFormattedDate(value),
    },
  });

  const [payRunFields] = useState({
    id: 'payRunId',
    date: 'dateCreated',
    type: 'payRunTypeName',
    paid: 'totalAmountPaid',
    held: 'totalAmountHeld',
    status: 'payRunStatusName',
  });

  const isPayRunsTab = tab === 'pay-runs';

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

  const release = (item, care) => {
    releaseSingleHeldInvoice(listData.holdPayments.payRunId, item.invoiceId).then(() => {
      dispatch(addNotification({ text: `Realse invoice ${item.invoiceId}`, className: 'success' }));
    });
  };

  const openChat = (item) => {
    setOpenedPopup('help-chat');
    setOpenedInvoiceChat(item);
  };

  const onClickTableRow = (rowItem) => {
    router.push(`${router.pathname}/${rowItem.payRunId}`);
  };

  const heldActions = [
    {
      id: 'action1',
      onClick: (item) => openChat(item),
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
      getHeldInvoicePayments({ pageNumber: page })
        .then((heldInvoices) => changeListData('holdPayments', heldInvoices))
        .catch(() => {
          dispatch(addNotification({ text: 'Can not get hold payments' }));
        });
    }
  };

  const releaseHolds = () => {
    // TODO i am not sure that this api is correct for this case
    // releaseHeldInvoices(checkedRows)
    //   .then(() => {
    //     dispatch(addNotification({ text: 'Release Success', className: 'success' }));
    //     setCheckedRows([]);
    //   })
    //   .catch(() => dispatch(addNotification({ text: 'Release Fail' })))
  };

  const getHelds = () => {
    getHeldInvoicePayments({ pageNumber: page })
      .then((heldInvoices) => changeListData('holdPayments', heldInvoices))
      .catch(() => {
        dispatch(addNotification({ text: 'Can not get hold payments' }));
      });

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

  const { data: payRunTypes = [] } = useSWR(
    `${PAY_RUN_ENDPOINTS.GET_ALL_PAY_RUN_TYPES}`,
    axiosFetcher,
    SWR_OPTIONS.REVALIDATE_ON_MOUNT
  );
  const { data: payRunSubTypes = [] } = useSWR(
    `${PAY_RUN_ENDPOINTS.GET_ALL_PAY_RUN_SUB_TYPES}`,
    axiosFetcher,
    SWR_OPTIONS.REVALIDATE_ON_MOUNT
  );
  const { data: uniquePayRunStatuses = [] } = useSWR(
    `${PAY_RUN_ENDPOINTS.GET_ALL_UNIQUE_PAY_RUN_STATUSES}`,
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
        releaseHolds={releaseHolds}
        checkedItems={checkedRows}
        tab={tab}
        setOpenedPopup={setOpenedPopup}
      />
      <PaymentsTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          { text: 'Pay Runs', value: 'pay-runs' },
          { text: 'Held Payments', value: 'held-payments' },
        ]}
      />
      {isPayRunsTab ? (
        <Table
          rows={listData?.payRuns?.data}
          rowsRules={payRunRowsRules}
          fields={payRunFields}
          sorts={sortsTab[tab]}
          sortBy={sortBy}
          onClickTableRow={onClickTableRow}
        />
      ) : (
        <PayRunTable
          checkedRows={checkedRows}
          setCheckedRows={onCheckRows}
          isIgnoreId
          className={tabsClasses[tab]}
          additionalActions={heldActions}
          changeAllChecked={setCheckedRows}
          canCollapseRows
          release={release}
          rows={listData?.holdPayments?.invoices}
          careType="Residential"
          sortBy={sortBy}
          sorts={sortsTab[tab]}
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

export default PayRunsPage;
