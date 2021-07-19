import React, { useEffect, useState } from "react";
import Pagination from "../../components/Payments/Pagination";
import HackneyFooterInfo from "../../components/HackneyFooterInfo";
import { getUserSession } from "../../service/helpers";
import withSession from "../../lib/session";
import DashboardTabs from "../../components/Dashboard/Tabs";
import { newItems, inProgressItems, doneItems } from "../../testData/testDateBrokerageHub";
import Table from "../../components/Table";
import Inputs from "../../components/Inputs";

export const getServerSideProps = withSession(async function({ req }) {
  const user = getUserSession({ req });
  if(user.redirect) {
    return user;
  }

  return {
    props: {}, // will be passed to the page component as props
  }
});

const BrokerageHubPage = () => {
  const [initialFilters] = useState({
    id: '',
    typeOfCare: '',
    stage: '',
    socialWorker: '',
    client: '',
  });

  const [filters, setFilters] = useState({...initialFilters});
  const [timer, setTimer] = useState(null);

  const [sorts] = useState([
    {name: 'type-of-care', text: 'TYPE OF CARE'},
    {name: 'start-date', text: 'START DATE'},
    {name: 'stage', text: 'STAGE'},
    {name: 'owner', text: 'OWNER'},
    {name: 'client', text: 'CLIENT'},
    {name: 'hackney-reference-number', text: 'HACKNEY REFERENCE NUMBER'},
    {name: 'last-updated', text: 'LAST UPDATED'},
    {name: 'days-since-approval', text: 'DAYS SINCE APPROVAL'},
  ]);

  const [tab, setTab] = useState('new');

  const tabsTable = {
    new: newItems,
    inProgress: inProgressItems,
    done: doneItems,
  };

  const [tabs] = useState([
    {value: 'new', text: `New ${newItems.length ? `(${newItems.length})` : ''}`},
    {value: 'inProgress', text: `In Progress ${inProgressItems.length ? `(${inProgressItems.length})` : ''}`},
    {value: 'done', text: `Done ${doneItems.length ? `(${doneItems.length})` : ''}`},
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  useEffect(() => {
    console.log('change brokerage-hub sort', sort);
  }, [sort]);

  useEffect(() => {
    setFilters({...initialFilters});
  }, []);

  useEffect(() => {
    if(timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      console.log('request with filters');
    }, 500));
  }, [filters]);

  const tableRows = tabsTable[tab];

  const rowsRules = {
    typeOfCare: {
      getClassName: () => 'link-button',
      onClick: (item, prop) => console.log(item, prop),
      fieldName: 'typeOfCare',
    },
    id: {
      hide: true,
    },
    stage: {
      getClassName: (value) => `${value} table__row-item-status`,
    },
    owner: {
      getClassName: (value) => `${value} table__row-item-status border-radius-0`,
    },
  }

  const inputs = {
    inputs: [
      {label: 'Search', placeholder: 'Search...', search: () => console.log('search for item'), className: 'mr-3'}
    ],
    dropdowns: [
      {options: [], initialText: 'Type of care', name: 'typeOfCare', className: 'mr-3'},
      {options: [], initialText: 'Stage', name: 'stage', className: 'mr-3'},
      {options: [], initialText: 'Social Worker', name: 'socialWorker', className: 'mr-3'},
      {options: [], initialText: 'Client', name: 'client', className: 'mr-3'},
    ],
  };

  return (
    <div className="brokerage-hub-page">
      <Inputs
        inputs={inputs}
        changeInputs={setFilters}
        values={filters}
        title='Brokerage Hub'
      />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        rows={tableRows}
        rowsRules={rowsRules}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination from={1} to={50} itemsCount={tabsTable[tab].length} totalCount={tabsTable[tab].length} />
      <HackneyFooterInfo />
    </div>
  )
};

export default BrokerageHubPage;
