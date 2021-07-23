import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Pagination from "../../components/Payments/Pagination";
import HackneyFooterInfo from "../../components/HackneyFooterInfo";
import DashboardTabs from "../../components/Dashboard/Tabs";
import Table from '../../components/Table'
import { formatDateWithSign, formatStatus } from '../../service/helpers'
import { addNotification } from '../../reducers/notificationsReducer'
import {
  getApprovedPackagesApprovers,
  getApprovedPackagesAwaitingBrokerage,
  getApprovedPackagesClarificationNeed,
  getApprovedPackagesCompleted,
  getApprovedPackagesNew, getApprovedPackagesPackageTypes,
  getApprovedPackagesReviewCommercial, getApprovedPackagesSocialWorkers
} from '../../api/Dashboard/approvedPackages'
import Inputs from '../../components/Inputs'

const ApproverHubPage = () => {
  const dispatch = useDispatch();
  const [initialFilters] = useState({
    HackneyId: '',
    PackageTypeId: '',
    SocialWorkerId: '',
    ApproverId: '',
    // ByValue: ''
  });

  const [filters, setFilters] = useState({...initialFilters});
  const [timer, setTimer] = useState(null);
  const [page, setPage] = useState(1);

  const [sorts] = useState([
    {name: 'service-user', text: 'SERVICE USER'},
    {name: 'package-type', text: 'PACKAGE TYPE'},
    {name: 'care-value', text: 'CARE VALUE'},
    {name: 'Approver', text: 'APPROVER'},
    {name: 'submitted-by', text: 'SUBMITTED BY'},
    {name: 'id', text: 'ID'},
    {name: 'last-updated', text: 'LAST UPDATED'},
  ]);

  const [tab, setTab] = useState('new');
  
  const tabsRequests = {
    new: getApprovedPackagesNew,
    clarification: getApprovedPackagesClarificationNeed,
    awaitingBrokerage: getApprovedPackagesAwaitingBrokerage,
    reviewCommercials: getApprovedPackagesReviewCommercial,
    completed: getApprovedPackagesCompleted,
  }

  const [pagingMetaData, setPagingMetaData] = useState({
    new: {},
    clarification: {},
    awaitingBrokerage: {},
    reviewCommercials: {},
    completed: {},
  });

  const [tabsTable, setTabsTable] = useState({
    new: [],
    clarification: [],
    awaitingBrokerage: [],
    reviewCommercials: [],
    completed: [],
  });

  const [tabs] = useState([
    {className: 'border-2', value: 'new', text: `New ${tabsTable.new.length ? `(${tabsTable.new.length})` : ''}`},
    {value: 'clarification', text: `Clarification ${tabsTable.clarification?.length ? `(${tabsTable.clarification.length})` : ''}`},
    {className: 'border-2', value: 'awaitingBrokerage', text: `Awaiting Brokerage ${tabsTable.awaitingBrokerage.length ? `(${tabsTable.awaitingBrokerage.length})` : ''}`},
    {className: 'border-2', value: 'reviewCommercials', text: `Review Commercials ${tabsTable.reviewCommercials.length ? `(${tabsTable.reviewCommercials.length})` : ''}`},
    {value: 'completed', text: `Completed ${tabsTable.completed.length ? `(${tabsTable.completed.length})` : ''}`},
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }))
  }

  const makeTabRequest = () => {
    if(timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      getApprovedPackagesPackageTypes()
        .then(res => changeInputs('PackageType', res))
        .catch(() => pushNotification('Can not get Package Types'))

      getApprovedPackagesSocialWorkers()
        .then(res => changeInputs('SocialWorker', res))
        .catch(() => pushNotification('Get social workers fail'))

      getApprovedPackagesApprovers()
        .then(res => changeInputs('Approver', res))
        .catch(() => pushNotification('Get approvers fail'))

      tabsRequests[tab]({
        PageNumber: page,
        OrderBy: sort.name,
        ...filters,
      })
        .then((res) => {
          setTabsTable({
            ...tabsTable,
            [tabsTable[tab]]: res.data
          })
          setPagingMetaData({
            ...pagingMetaData,
            [tab]: res.pagingMetaData,
          });
        })
        .catch(() => dispatch(addNotification()))
    }, 500));
  }

  useEffect(() => {
    makeTabRequest()
  }, [tab, sort]);

  const rowsRules = {
    packageType: {
      getClassName: () => 'link-button',
      onClick: (cellItem, cellValue) => changeInputs('PackageType', cellValue),
      getValue: (value) => formatStatus(value),
    },
    careValue: {
      getClassName: () => 'text-bold',
    },
    lastUpdated: {
      getValue: (value) => formatDateWithSign(value, '.'),
    }
  }

  const inputs = {
    inputs: [
      {
        label: 'Search',
        placeholder: 'Enter name or Hackney ID',
        search: () => makeTabRequest(),
        className: 'mr-3',
        name: 'HackneyId',
      }
    ],
    dropdowns: [
      {options: [], initialText: 'Package Type', name: 'PackageType', className: 'mr-3'},
      {options: [], initialText: 'Social Worker', name: 'SocialWorker', className: 'mr-3'},
      {options: [], initialText: 'Approver', name: 'Approver', className: 'mr-3'},
      // {options: [], initialText: 'By Value', name: 'ByValue', className: 'mr-3'},
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto', onClick: () => makeTabRequest()}
    ]
  };

  const changeInputs = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  const {pageSize, totalCount, totalPages } = pagingMetaData[tab];

  return (
    <div className="approver-hub-page">
      <Inputs
        inputs={inputs}
        changeInputs={changeInputs}
        className='approver-hub__inputs'
        values={filters}
        title='Approver Hub'
      />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        classes='p-4'
        fields={{
          serviceUser: 'serviceUser',
          packageType: 'packageType',
          careValue: 'careValue',
          approver: 'approver',
          submittedBy: 'submittedBy',
          id: 'packageId',
          lastUpdated: 'lastUpdated',
        }}
        rowsRules={rowsRules}
        rows={tabsTable[tab]}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination
        currentPage={page}
        changePagination={setPage}
        itemsCount={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
      />
      <HackneyFooterInfo />
    </div>
  )
};

export default ApproverHubPage;
