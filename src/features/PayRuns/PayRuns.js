import React, {useEffect, useState} from "react";
import { useLocation, useHistory } from 'react-router-dom';
import PayRunsHeader from "./components/PayRunsHeader";
import PaymentsTabs from "../Payments/components/PaymentsTabs";
import PayRunTable from "./components/PayRunTable";
import Pagination from "../Payments/components/Pagination";
import {payRunsHeldPaymentsTableDate, payRunsTableDate, testDataHelpMessages} from "../../testData/TestDataPayRuns";
import PopupCreatePayRun from "./components/PopupCreatePayRun";
import ChatButton from "./components/ChatButton";
import PayRunsLevelInsight from "./components/PayRunsLevelInsight";
import PopupHelpChat from "../Chat/components/PopupHelpChat";

const sortsTab = {
  'pay-runs': [
    {name: 'id', text: 'ID'},
    {name: 'date', text: 'Date'},
    {name: 'type', text: 'Type'},
    {name: 'cadence', text: 'Cadence'},
    {name: 'paid', text: 'Paid'},
    {name: 'held', text: 'Held'},
    {name: 'status', text: 'Status'},
  ],
  'held-payments': [
    {name: 'payRunDate', text: 'Pay run date'},
    {name: 'payRunId', text: 'Pay run ID'},
    {name: 'serviceUser', text: 'Service User'},
    {name: 'packageType', text: 'Package Type'},
    {name: 'supplier', text: 'Supplier'},
    {name: 'amount', text: 'Amount'},
    {name: 'status', text: 'Status'},
    {name: 'waitingFor', text: 'Waiting for'},
  ],
};

const tabsClasses = {
  'pay-runs': 'pay-runs__tab-class',
  'held-payments': 'pay-runs__held-payments-class',
};

const PayRuns = () => {
  const location = useLocation();
  const pushRoute = useHistory().push;
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
    setSort({value, name: field});
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

  const onCheckRows = id => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => item != id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  }

  const release = (item, care) => {
    console.log('release payment item and care ', item, care);
  };

  const openChat = item => {
    setOpenedPopup('help-chat');
    setOpenedHelpChat(item);
  }

  const onClickTableRow = (rowItems) => {
    pushRoute(`${location.pathname}/${rowItems.id}`)
  };

  const heldActions = [
    {id: 'action1', onClick: (item) => openChat(item), className: 'chat-icon', Component: ChatButton}
  ];

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  return (
    <div className={`pay-runs ${tab}__tab-class`}>
      {openedPopup === 'create-pay-run' &&
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
      {openedPopup === 'help-chat' &&
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
      }
      <PayRunsHeader tab={tab} setOpenedPopup={setOpenedPopup} />
      <PaymentsTabs
        tab={tab}
        changeTab={changeTab}
        tabs={[
          {text: 'Pay Runs', value: 'pay-runs'},
          {text: 'Held Payments', value: 'held-payments'}
        ]}
      />
      <PayRunTable
        tableActionButtons={isHeldTab && <ChatButton onClick={() => setOpenedPopup('chat')} />}
        checkedRows={isHeldTab && checkedRows}
        setCheckedRows={onCheckRows}
        isIgnoreId={isHeldTab}
        classes={tabsClasses[tab]}
        additionalActions={isHeldTab && heldActions}
        canCollapseRows={isHeldTab}
        release={isHeldTab && release}
        onClickTableRow={isPayRunsTab && onClickTableRow}
        rows={isPayRunsTab ? payRunsTableDate : payRunsHeldPaymentsTableDate}
        careType='Residential'
        sortBy={sortBy}
        sorts={sortsTab[tab]}
      />
      <Pagination from={1} to={10} itemsCount={10} totalCount={30} />
      <PayRunsLevelInsight
        firstButton={{
          text: 'Approve for payment',
          onClick: () => {}
        }}
        secondButton={{
          text: 'Kick back',
          onClick: () => {},
        }}
        cost='£42,827'
        suppliersCount='100'
        servicesUsersCount='1000'
        costIncrease='£897'
        holdsCount='48'
        holdsPrice='£32,223'
      />
      <div className='payments__footer'>
        <div className='payments__footer-info'>
          <p>Hackney Adult Social Care Services  ·  2021</p>
        </div>
      </div>
    </div>
  )
};

export default PayRuns;
