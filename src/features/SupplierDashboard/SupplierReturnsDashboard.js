import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from "../Payments/components/Pagination";
import {supplierReturnsDashboardTableData, testDataHelpMessages} from "../../testData/TestDataPayRuns";
import SupplierReturnsLevelInsight from "./components/SupplierReturnsLevelInsight";
import PopupHoldPayment from "./components/PopupHoldPayment";
import SupplierReturnDashboardTable from "./components/SupplierReturnsDashboardTable";
import SupplierReturnsDashboardInnerHeader from "./components/SupplierReturnsDashboardInnerHeader";
import ChatButton from "../PayRuns/components/ChatButton";
import PopupHelpChat from "../Chat/components/PopupHelpChat";

const sorts = [
  {name: 'serviceUser', text: 'Service User'},
  {name: 'packageId', text: 'Package ID'},
  {name: 'packageType', text: 'Package Type'},
  {name: 'weeklyValue', text: 'Weekly Value'},
  {name: 'status', text: 'Status'},
];

const popupTypes = {
  createPayRun: 'create-pay-run',
  holdPayments: 'hold-payment',
};

const SupplierReturnsDashboard = () => {
  const location = useLocation();
  const pushRoute = useHistory().push;
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [actionRequiredBy, setActionRequiredBy] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [reason, setReason] = useState('');
  const [openedHelpChat, setOpenedHelpChat] = useState({});
  const date = location.pathname.replace('/supplier-dashboard/supplier-returns/', '');

  const [headerOptions, setHeaderOptions] = useState({
    actionButtonText: 'New Pay Run',
    clickActionButton: () => {
      setOpenedPopup(popupTypes.createPayRun);
    },
  });

  useEffect(() => {
    pushRoute(`${location.pathname}?page=1`);
  }, []);

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Supplier Returns', onClick: () => pushRoute('/supplier-dashboard')},
    {text: `Supplier return ${date}`}
  ]);
  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const closeCreatePayRun = () => {
    setOpenedPopup('');
    setReason('');
    setActionRequiredBy('');
  };

  const onCheckRow = (id) => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => item != id));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const actionButton = {
    classes: 'outline green mr-auto',
    onClick: () => console.log('Accept all selected', checkedRows),
    text: 'Accept all selected',
  };

  const closeHelpChat = () => {
    setOpenedPopup('');
    setNewMessageText('');
  };

  const openChat = item => {
    setOpenedPopup('help-chat');
    setOpenedHelpChat(item);
  };

  const makeServiceAction = (item, service, actionName) => {
    if(actionName === 'submit') {
      console.log(`make service action ${actionName} with item: `, item);
      console.log(`service: `, service);
    } else if(actionName === 'resubmit') {
      console.log(`make service action ${actionName} with item: `, item);
      console.log(`service: `, service);
    } else {
      console.log('make service action not found');
    }
  };

  const chatActions = [
    {id: 'action1', onClick: (item) => openChat(item), className: 'chat-icon', Component: ChatButton}
  ];

  useEffect(() => {
    if(location?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => pushRoute(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
      ]);
    }
  }, [location]);

  return (
    <div className='supplier-returns supplier-returns-dashboard'>
      {openedPopup === 'help-chat' &&
      <PopupHelpChat
        closePopup={closeHelpChat}
        newMessageText={newMessageText}
        setNewMessageText={setNewMessageText}
        currentUserInfo={openedHelpChat}
        currentUserId={1}
        messages={testDataHelpMessages}
      />
      }
      {!!breadcrumbs.length && <Breadcrumbs classes='p-3' values={breadcrumbs} />}
      <SupplierReturnsDashboardInnerHeader clickActionButton={headerOptions.clickActionButton} />
      <SupplierReturnDashboardTable
        rows={supplierReturnsDashboardTableData}
        careType='Residential'
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        openChat={openChat}
        makeAction={makeServiceAction}
        additionalActions={chatActions}
        isIgnoreId={true}
        canCollapseRows={true}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
      <SupplierReturnsLevelInsight
        packages='832'
        totalValue='£92,321'
        returned='700'
        inDispute='42'
        accepted='678'
      />
    </div>
  )
};

export default SupplierReturnsDashboard;
