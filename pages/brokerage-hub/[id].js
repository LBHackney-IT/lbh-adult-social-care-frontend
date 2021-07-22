import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux'
import Pagination from "../../components/Payments/Pagination";
import HackneyFooterInfo from "../../components/HackneyFooterInfo";
import { addNotification } from '../../reducers/notificationsReducer'
import DashboardTabs from "../../components/Dashboard/Tabs";
import Table from "../../components/Table";
import Inputs from "../../components/Inputs";
import {
  getBrokeredPackagesBrokeredDone,
  getBrokeredPackagesBrokeredInProgress,
  getBrokeredPackagesBrokeredNew,
  getBrokeredPackagesStages, putBrokeredPackagesAssign,
} from '../../api/Dashboard/brokeredPackages'
import { formatDateWithSign } from '../../service/helpers'
import { currency } from '../../constants/strings'
import CustomDropDown from '../../components/CustomDropdown'

const BrokerageHubPage = () => {
  const dispatch = useDispatch();
  const [initialFilters] = useState({
    PackageId: '',
    TypeOfCare: '',
    Stage: '',
    SocialWorker: '',
    Client: '',
    HackneyId: '',
  });

  const [filters, setFilters] = useState({...initialFilters});
  const [timer, setTimer] = useState(null);
  const [stageOptions, setStagesOptions] = useState([]);

  const [sorts] = useState([
    {name: 'packageType', text: 'Package Type'},
    {name: 'startDate', text: 'Start Date'},
    {name: 'serviceUser', text: 'Service User'},
    {name: 'stage', text: 'Stage', className: 'table__row-item-justify-center'},
    {name: 'owner', text: 'OWNER'},
    {name: 'hackneyReferenceNumber', text: 'HACKNEY REFERENCE NUMBER'},
    {name: 'lastUpdated', text: 'LAST UPDATED'},
    {name: 'daysSinceApproval', text: 'DAYS SINCE APPROVAL'},
  ]);

  const [tab, setTab] = useState('new');
  const [page, setPage] = useState(1);
  const [pagingMetaData, setPagingMetaData] = useState({
    new: {},
    inProgress: {},
    done: {},
  });

  const [tabsRequests] = useState({
    new: getBrokeredPackagesBrokeredNew,
    inProgress: getBrokeredPackagesBrokeredInProgress,
    done: getBrokeredPackagesBrokeredDone,
  });

  const [tabsTable, setTabsTable] = useState({
    new: [],
    inProgress: [],
    done: [],
  });

  const tabs = [
    {value: 'new', text: `New${tabsTable.new.length ? ` (${tabsTable.new.length})` : ''}`},
    {value: 'inProgress', text: `In Progress ${tabsTable.inProgress.length ? ` (${tabsTable.inProgress.length})` : ''}`},
    {value: 'done', text: `Done${tabsTable.done.length ? ` (${tabsTable.done.length})` : ''}`},
  ];

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const sortBy = (field, value) => {
    setSort({value, name: field});
  };

  const brokeredPackagesAssign = (option) => {
    console.log(option);
    putBrokeredPackagesAssign(option.creatorId)
      .then(() => dispatch(addNotification({ text: 'Assigned success'})))
      .catch(() => dispatch(addNotification({ text: 'Assigned fail'})))
  }

  const makeTabRequest = () => {
    if(timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout(() => {
      getBrokeredPackagesStages()
        .then(res => setStagesOptions(res))
        .catch(() => dispatch(addNotification({ text: 'Can not get stages' })))
      tabsRequests[tab]({
        ...filters,
        PageNumber: page,
        OrderBy: sort.name
      })
        .then(res => {
          setTabsTable({
            ...tabsTable,
            [tab]: res.data,
          });
          setPagingMetaData({
            ...pagingMetaData,
            [tab]: res.pagingMetaData,
          });
        })
    }, 500));
  }

  useEffect(() => {
    makeTabRequest();
  }, [page, tab, sort]);

  const tableRows = tabsTable[tab];

  const rowsRules = {
    packageId: {
      hide: true,
    },
    startDate: {
      getValue: (value) => `${formatDateWithSign(value, '.')}`
    },
    hackneyId: {
      getValue: (value) => `${currency.euro}${value}`
    },
    lastUpdated: {
      getValue: (value) => `${formatDateWithSign(value, '.')}`
    },
    owner: {
      getComponent: (item) => {
        return (
          <CustomDropDown
            onOptionSelect={brokeredPackagesAssign}
            key={item.packageId}
            fullOptions={stageOptions}
            options={stageOptions}
            className='table__row-item'
            fields={{
              value: 'creatorId',
              text: 'stageName',
            }}
            initialText=''
            selectedValue={item.stage}
          />
        )
      },
    },
    stage: {
      getClassName: (value) => `${value} table__row-item-status`,
    },
  }

  const inputs = {
    inputs: [
      {label: 'Search', name: 'HackneyId', placeholder: 'Search...', search: () => makeTabRequest(), className: 'mr-3'}
    ],
    dropdowns: [
      {options: [], initialText: 'Type of care', name: 'typeOfCare', className: 'mr-3'},
      {options: [], initialText: 'Stage', name: 'stage', className: 'mr-3'},
      {options: [], initialText: 'Social Worker', name: 'socialWorker', className: 'mr-3'},
      {options: [], initialText: 'Client', name: 'client', className: 'mr-3'},
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto', onClick: () => makeTabRequest()}
    ]
  };

  const changeInputs = (field, value) => {
    setFilters({
      ...filters,
      [field]: value
    })
  }

  const { pageSize, totalCount, totalPages } = pagingMetaData[tab];

  return (
    <div className="brokerage-hub-page">
      <Inputs
        inputs={inputs}
        changeInputs={changeInputs}
        values={filters}
        title='Brokerage Hub'
      />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        rows={tableRows}
        rowsRules={rowsRules}
        fields={{
          id: 'packageId',
          packageType: 'packageType',
          startDate: 'startDate',
          serviceUser: 'serviceUser',
          stage: 'stage',
          owner: 'owner',
          hackneyReferenceNumber: 'hackneyId',
          lastUpdated: 'lastUpdated',
          daysSinceApproval: 'daysSinceApproval',
        }}
        sortBy={sortBy}
        sorts={sorts}
      />
      <Pagination
        changePagination={setPage}
        totalPages={totalPages}
        currentPage={page}
        itemsCount={pageSize}
        totalCount={totalCount}
      />
      <HackneyFooterInfo />
    </div>
  )
};

export default BrokerageHubPage;
