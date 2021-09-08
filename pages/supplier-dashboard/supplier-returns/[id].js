import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Breadcrumbs from 'components/Breadcrumbs';
import PopupInvoiceChat from 'components/Chat/PopupInvoiceChat';
import Pagination from 'components/Payments/Pagination';
import SupplierReturnsLevelInsight from 'components/SupplierDashboard/SupplierReturnsLevelInsight';
import SupplierReturnsDashboardInnerHeader from 'components/SupplierDashboard/SupplierReturnsDashboardInnerHeader';
import ChatButton from 'components/PayRuns/ChatButton';
import { getUserSession } from 'service/helpers';
import withSession from 'lib/session';
import { supplierReturnsDashboardTableData, testDataHelpMessages } from '../../../testData/testDataPayRuns';
import Table from '../../../components/Table'

export const getServerSideProps = withSession(async ({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return {
    props: {}, // will be passed to the page component as props
  };
});

const SupplierReturnsDashboard = () => {
  const router = useRouter();
  const { id } = router.query;
  const [pathname] = useState(`/supplier-dashboard/supplier-returns/${id}`);
  const [sorts] = useState([
    { name: 'serviceUser', text: 'Service User' },
    { name: 'packageId', text: 'Package ID' },
    { name: 'packageType', text: 'Package Type' },
    { name: 'weeklyValue', text: 'Weekly Value' },
    { name: 'status', text: 'Status' },
  ]);
  const [openedPopup, setOpenedPopup] = useState('');
  const [checkedRows, setCheckedRows] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');
  const [openedHelpChat, setOpenedHelpChat] = useState({});

  const [breadcrumbs] = useState([
    { text: 'Supplier dashboard', onClick: () => router.push('/supplier-dashboard') },
    { text: `Supplier return ${router.query.id}` },
  ]);

  const [sort, setSort] = useState({
    value: 'ascending',
    name: 'serviceUser',
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const onCheckRow = (id) => {
    if (checkedRows.includes(id)) {
      setCheckedRows(checkedRows.filter((item) => String(item) !== String(id)));
    } else {
      setCheckedRows([...checkedRows, id]);
    }
  };

  const actionButton = {
    classes: 'outline green mr-auto',
    onClick: () => alert('Accept all selected', checkedRows),
    text: 'Accept all selected',
  };

  const closeHelpChat = () => {
    setOpenedPopup('');
    setNewMessageText('');
  };

  const openChat = (item) => {
    setOpenedPopup('help-chat');
    setOpenedHelpChat(item);
  };

  const makeServiceAction = (item, service, actionName) => {
    if (actionName === 'submit') {
      alert(`make service action ${actionName} with item: `, item);
      alert(`service: `, service);
    } else if (actionName === 'resubmit') {
      alert(`make service action ${actionName} with item: `, item);
      alert(`service: `, service);
    } else {
      alert('make service action not found');
    }
  };

  const [chatActions] = useState([
    { id: 'action1', onClick: (item) => openChat(item), className: 'chat-icon', Component: ChatButton },
  ]);

  const [actions] = useState({
    'not-submitted': {
      text: 'Submit',
      actionName: 'submit',
    },
    disputed: {
      text: 'Resubmit',
      actionName: 'resubmit',
    },
  });

  const [chatStatuses] = useState(['disputed']);

  return (
    <div className="supplier-returns max-desktop-width">
      {openedPopup === 'help-chat' && (
        <PopupInvoiceChat
          closePopup={closeHelpChat}
          newMessageText={newMessageText}
          setNewMessageText={setNewMessageText}
          currentUserInfo={openedHelpChat}
          currentUserId={1}
          messages={testDataHelpMessages}
        />
      )}
      {!!breadcrumbs.length && <Breadcrumbs className="p-3" values={breadcrumbs} />}
      <SupplierReturnsDashboardInnerHeader />
      <Table
        rows={supplierReturnsDashboardTableData}
        rowsRules={{
          id: {
            type: 'checkbox',
            onChange: (_, item) => onCheckRow(item.id),
            getValue: (value) => checkedRows.includes(value),
          },
          services: {
            getHide: () => true,
          },
          status: {
            getClassName: (item) => `${item} table__row-item-status`,
            getValue: (value) => formatStatus(value).slice(0,1).toUpperCase() + formatStatus(value).slice(1, value.length),
          }
        }}
        fields={{
          id: 'id',
          serviceUser: 'serviceUser',
          packageId: 'packageId',
          packageType: 'packageType',
          weeklyValue: 'weeklyValue',
          status: 'status',
          services: 'services',
        }}
        getCollapsedContainer={(supplierReturn) => (
          <SupplierReturnsCollapsedContainer
            makeAction={makeServiceAction}
            openChat={openChat}
            actions={actions}
            chatStatuses={chatStatuses}
            supplierReturn={supplierReturn}
          />
        )}
        checkedRows={checkedRows}
        changeAllChecked={setCheckedRows}
        canCollapseRows
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination pathname={pathname} actionButton={actionButton} from={1} to={10} pageSize={10} totalCount={30} />
      <SupplierReturnsLevelInsight packages="832" totalValue="£92,321" returned="700" inDispute="42" accepted="678" />
    </div>
  );
};

export default SupplierReturnsDashboard;
