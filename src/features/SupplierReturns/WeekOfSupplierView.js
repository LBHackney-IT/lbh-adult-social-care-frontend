import React, {useEffect, useState} from "react";
import Breadcrumbs from "../components/Breadcrumbs";
import { useLocation, useHistory } from 'react-router-dom';
import Pagination from "../Payments/components/Pagination";
import {testDataHelpMessages, weeklyOfSupplierTableData} from "../../testData/testDataPayRuns";
import SupplierReturnsLevelInsight from "./components/SupplierReturnsLevelInsight";
import ChatButton from "../PayRuns/components/ChatButton";
import PopupHelpChat from "../Chat/components/PopupHelpChat";
import {useSelector} from "react-redux";
import {selectSupplierReturns} from "../../reducers/supplierReturnsReducer";
import {formatDateWithSign} from "../../service/helpers";
import {Button} from "../components/Button";
import WeekOfSupplierViewInnerHeader from "./components/WeekOfSupplierViewInnerHeader";
import WeeklyOfSupplierTable from "./components/WeeklyOfSupplierTable";
import HackneyFooterInfo from "../components/HackneyFooterInfo";
import PopupDocumentUploader from "../components/PopupDocumentUploader";

const sorts = [
  {name: 'serviceUser', text: 'Service User'},
  {name: 'packageType', text: 'Package Type'},
  {name: 'packageId', text: 'Package ID'},
  {name: 'weeklyValue', text: 'Weekly Value'},
  {name: 'status', text: 'Status'},
  {name: 'action', text: 'Action'},
];

const WeekOfSupplierView = () => {
  const location = useLocation();
  const history = useHistory();
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [openedHelpChat, setOpenedHelpChat] = useState({});
  const [weeklyData, setWeeklyData] = useState([]);
  const [requestsQue, setRequestsQue] = useState([]);
  const [serviceRequestTimer, setServiceRequestTimer] = useState(null);
  const [supplierRequestTimer] = useState(null);
  const {
    supplierReturns: { weekCommencing: date, id },
    weekOfSupplier: { suppliers }
  } = useSelector(selectSupplierReturns);

  const [breadcrumbs, setBreadcrumbs] = useState([
    {text: 'Supplier Dashboard Returns', onClick: () => history.push('/payments/supplier-returns')},
    {
      text: `Return week commencing ${date ? formatDateWithSign(date, '.') : ''}`,
      onClick: () => history.push(`/payments/supplier-returns/${id}`)},
    {text: suppliers},
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const onCheckRow = (id) => {
    if(checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter(item => String(item) !== String(id)));
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

  const actionAllServices = (supplier, actionType) => {
    const serviceCustomIds = supplier.services.map(service => `${supplier.id}${service.id}`);
    setRequestsQue([...requestsQue, ...serviceCustomIds]);

    console.log(`make action ${actionType} for services`, supplier.services);

    //emit delay request
    const timer = setTimeout(() => {
      setRequestsQue([]);
    }, 5000);

    if(serviceRequestTimer) {
      clearTimeout(serviceRequestTimer);
    }
    setServiceRequestTimer(timer);
  };

  const makeAction = (supplier, service, actionType) => {
    const actionService = () => {
      setRequestsQue([...requestsQue, `${supplier.id}${service.id}`]);

      //emit delay request
      const timer = setTimeout(() => {
        setRequestsQue([]);
      }, 5000);

      if(serviceRequestTimer) {
        clearTimeout(serviceRequestTimer);
      }
      setServiceRequestTimer(timer);
    }
    const actionSupplier = () => {
      setRequestsQue([...requestsQue, supplier.id]);

      //emit request
      const timer = setTimeout(() => {
        setRequestsQue([]);
      }, 5000);

      if(supplierRequestTimer) {
        clearTimeout(supplierRequestTimer);
      }
      setServiceRequestTimer(timer);
    }

    switch (actionType) {
      case 'accept-supplier': {
        actionSupplier();
        break;
      }
      case 'dispute-supplier': {
        actionSupplier();
        break;
      }
      case 'revoke-supplier': {
        actionSupplier();
        break;
      }
      case 'accept-service': {
        actionService();
        break;
      }
      case 'dispute-service': {
        actionService();
        break;
      }
      case 'revoke-service': {
        actionService();
        break;
      }
      default: console.log('no action found');
    }
  };

  const chatActions = [
    {id: 'action1', onClick: (item) => openChat(item), className: 'chat-icon', Component: ChatButton}
  ];

  useEffect(() => {
    if(location?.query?.id) {
      setBreadcrumbs([
        {text: 'payments', route: '/payments/pay-runs', onClick: (value) => history.push(`${value.route}`)},
        {text: `Pay Run ${location.query.id}`}
      ]);
    }
  }, [location]);

  useEffect(() => {
    console.log('change sort', sort);
  }, [sort]);

  useEffect(() => {
    history.push(`${location.pathname}?page=1`);
  }, []);

  useEffect(() => {
    setWeeklyData(weeklyOfSupplierTableData.slice())
  }, []);

  return (
    <div className='supplier-returns week-of-supplier supplier-returns-dashboard'>
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
      {openedPopup === 'upload-files' &&
        <PopupDocumentUploader closePopup={() => setOpenedPopup('')} />
      }
      <div className='week-of-supplier__breadcrumbs'>
        {!!breadcrumbs.length && <Breadcrumbs values={breadcrumbs} />}
        <Button>{weeklyData.length} Actions Outstanding</Button>
      </div>
      <WeekOfSupplierViewInnerHeader clickActionButton={() => setOpenedPopup('upload-files')} />
      <WeeklyOfSupplierTable
        rows={weeklyData}
        actionAllServices={actionAllServices}
        checkedRows={checkedRows}
        setCheckedRows={onCheckRow}
        changeCheckedRowsState={setCheckedRows}
        openChat={openChat}
        makeAction={makeAction}
        requestsQue={requestsQue}
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
        paid='584'
      />
      <HackneyFooterInfo />
    </div>
  )
};

export default WeekOfSupplierView;
