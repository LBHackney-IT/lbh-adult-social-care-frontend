import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PayRunsHeader from '../../../components/PayRuns/PayRunsHeader';
import PaymentsTabs from '../../../components/Payments/PaymentsTabs';
import PayRunTable from '../../../components/PayRuns/PayRunTable';
import Pagination from '../../../components/Payments/Pagination';
import { payRunsHeldPaymentsTableData, testDataHelpMessages } from '../../../testData/testDataPayRuns';
import PopupCreatePayRun from '../../../components/PayRuns/PopupCreatePayRun';
import ChatButton from '../../../components/PayRuns/ChatButton';
import PayRunsLevelInsight from '../../../components/PayRuns/PayRunsLevelInsight';
import PopupHelpChat from '../../../components/Chat/PopupHelpChat';
import HackneyFooterInfo from '../../../components/HackneyFooterInfo';
import { getUserSession } from '../../../service/helpers';
import withSession from '../../../lib/session';
import usePayRunSummary from '../../../api/Payments/hooks/usePayRunSummary';

export const getServerSideProps = withSession(async ({ req }) => {
  const user = getUserSession({ req });
  if (user.redirect) {
    return user;
  }

  return {
    props: {}, // will be passed to the page component as props
  };
});

const PayRunsPage = () => {
  // eslint-disable-next-line no-unused-vars
  const { data: payRunsTableData, requestStatus, errors, retrievePayRunSummaryList } = usePayRunSummary();
  const [sortsTab] = useState({
    'pay-runs': [
      { name: 'id', text: 'ID' },
      { name: 'date', text: 'Date' },
      { name: 'type', text: 'Type' },
      { name: 'cadence', text: 'Cadence' },
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
  const [openedHelpChat, setOpenedHelpChat] = useState({});
  const [hocAndRelease, changeHocAndRelease] = useState('');
  const [waitingOn, changeWaitingOn] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [regularCycles, changeRegularCycles] = useState('');
  const [tab, changeTab] = useState('pay-runs');
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const isHeldTab = tab === 'held-payments';
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
    console.log('release payment item and care ', item, care);
  };

  const openChat = (item) => {
    setOpenedPopup('help-chat');
    setOpenedHelpChat(item);
  };

  const onClickTableRow = (rowItems) => {
    router.push(`${router.pathname}/${rowItems.id}`);
  };

  const heldActions = [
    {
      id: 'action1',
      onClick: (item) => openChat(item),
      className: 'chat-icon',
      Component: ChatButton,
    },
  ];

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  useEffect(() => {
    router.replace(`${router.pathname}?page=1`);
  }, []);

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
          setDate={setDate}
        />
      )}
      {openedPopup === 'help-chat' && (
        <PopupHelpChat
          closePopup={closeHelpChat}
          newMessageText={newMessageText}
          setNewMessageText={setNewMessageText}
          waitingOn={waitingOn}
          changeWaitingOn={changeWaitingOn}
          currentUserInfo={openedHelpChat}
          currentUserId={1}
          messages={testDataHelpMessages}
        />
      )}
      <PayRunsHeader tab={tab} setOpenedPopup={setOpenedPopup} />
      <PaymentsTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          { text: 'Pay Runs', value: 'pay-runs' },
          { text: 'Held Payments', value: 'held-payments' },
        ]}
      />
      <PayRunTable
        tableActionButtons={isHeldTab && <ChatButton onClick={() => setOpenedPopup('chat')} />}
        checkedRows={isHeldTab && checkedRows}
        setCheckedRows={onCheckRows}
        isIgnoreId={isHeldTab}
        className={tabsClasses[tab]}
        additionalActions={isHeldTab && heldActions}
        canCollapseRows={isHeldTab}
        release={isHeldTab && release}
        onClickTableRow={isPayRunsTab && onClickTableRow}
        rows={isPayRunsTab ? payRunsTableData : payRunsHeldPaymentsTableData}
        careType="Residential"
        sortBy={sortBy}
        sorts={sortsTab[tab]}
      />
      <Pagination from={1} to={10} itemsCount={10} totalCount={30} />
      <PayRunsLevelInsight
        firstButton={{
          text: 'Approve for payment',
          onClick: () => {},
        }}
        secondButton={{
          text: 'Kick back',
          onClick: () => {},
        }}
        cost="£42,827"
        suppliersCount="100"
        servicesUsersCount="1000"
        costIncrease="£897"
        holdsCount="48"
        holdsPrice="£32,223"
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default PayRunsPage;
