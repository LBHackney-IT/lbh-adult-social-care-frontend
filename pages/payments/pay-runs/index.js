import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { uniqBy, last } from 'lodash';
import {
  createNewPayRun,
  getPayRunSummaryList,
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
import { DATA_TYPES } from '../../../api/Utils/CommonOptions';
import { mapPayRunStatuses, mapPayRunSubTypeOptions, mapPayRunTypeOptions } from '../../../api/Mappers/PayRunMapper';
import {
  useHeldInvoicePayments,
  usePaymentDepartments,
  usePayRunSubTypes,
  usePayRunTypes,
  useUniquePayRunStatuses,
} from '../../../swrAPI';
import { PAY_RUN_FIELDS, PAY_RUN_ROWS_RULES, PAYMENT_TABS, SORTS_TAB, TABS_CLASSES } from './constants';

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
    holdPayments: {},
  });
  const [page] = useState(1);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
    dataType: DATA_TYPES.STRING,
  });

  const [filters, setFilters] = useState({});

  const { data: payRunTypes } = usePayRunTypes();
  const { data: payRunSubTypes } = usePayRunSubTypes();
  const { data: paymentDepartments } = usePaymentDepartments();
  const { data: uniquePayRunStatuses } = useUniquePayRunStatuses();
  const { data: heldPayments, mutate: refetchHeldPayments } = useHeldInvoicePayments(filters);

  const isPayRunsTab = tab === 'pay-runs';

  const { pagingMetaData: paginationInfo } = isPayRunsTab ? listData.payRuns : heldPayments;

  const filterOptions = useHeldPaymentsFilterOptions(heldPayments.data);

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

  const getLists = (newFilters) => {
    setFilters(newFilters);

    const { id = '', type = '', status = '' } = newFilters || {};
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
    }
  };

  useEffect(() => {
    const { value = '', name = '', dataType = DATA_TYPES.STRING } = sort || {};
    let fieldName = '';
    let sortedList = [];
    if (tab === 'pay-runs') {
      const { data = [], pagingMetaData } = listData?.payRuns || {};
      fieldName = PAY_RUN_FIELDS[name];
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
    }
  }, [tab, page]);

  const releaseOne = async (item, invoice) => {
    try {
      await releaseSingleHeldInvoice(item.payRunId, invoice.invoiceId);
      dispatch(addNotification({ text: `Release invoice ${item.invoiceId}`, className: 'success' }));
      await refetchHeldPayments();
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

      await refetchHeldPayments();
    } catch (error) {
      dispatch(addNotification({ text: 'Release Fail' }));
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
          updateChat={refetchHeldPayments}
          currentUserId={openedInvoiceChat.creatorId}
          messages={openedInvoiceChat.disputedInvoiceChat}
          waitingOnOptions={paymentDepartments.map((el) => ({ value: el.departmentId, text: el.departmentName }))}
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
          fields={PAY_RUN_FIELDS}
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
          rows={heldPayments.data}
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
