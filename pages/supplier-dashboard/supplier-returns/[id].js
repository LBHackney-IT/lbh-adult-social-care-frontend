import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../../components/Breadcrumbs";
import { useRouter } from 'next/router';
import Pagination from "../../../components/Payments/Pagination";
import { supplierReturnsDashboardTableData, testDataHelpMessages } from "../../../testData/testDataPayRuns";
import SupplierReturnsLevelInsight from "../../../components/SupplierDashboard/SupplierReturnsLevelInsight";
import SupplierReturnDashboardTable from "../../../components/SupplierDashboard/SupplierReturnsDashboardTable";
import SupplierReturnsDashboardInnerHeader from "../../../components/SupplierDashboard/SupplierReturnsDashboardInnerHeader";
import ChatButton from "../../../components/PayRuns/ChatButton";
import PopupHelpChat from "../../../components/Chat/PopupHelpChat";
import useSWR from 'swr';

const serverSupplierReturnsId = async () => {};

const SupplierReturnsDashboard = () => {
  const { data } = useSWR('', serverSupplierReturnsId);
  const router = useRouter();
  const id = router.query.id;
  const [pathname] = useState(`/supplier-dashboard/supplier-returns/${id}`);
  const [sorts] = useState([
    {name: 'serviceUser', text: 'Service User'},
    {name: 'packageId', text: 'Package ID'},
    {name: 'packageType', text: 'Package Type'},
    {name: 'weeklyValue', text: 'Weekly Value'},
    {name: 'status', text: 'Status'},
  ])
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [openedHelpChat, setOpenedHelpChat] = useState({});

  const [breadcrumbs] = useState([
    {text: 'Payments', onClick: () => router.push('/payments/pay-runs')},
    {text: `Pay Run ${router.query.id}`}
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'serviceUser',
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
    console.log('change sort', sort);
  }, [sort]);

  useEffect(() => {
    router.replace(`${pathname}?page=1`);
  }, []);

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
      <SupplierReturnsDashboardInnerHeader />
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
      <Pagination pathname={pathname} actionButton={actionButton} from={1} to={10} itemsCount={10} totalCount={30} />
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
