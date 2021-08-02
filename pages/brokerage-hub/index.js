import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { addNotification } from '../../reducers/notificationsReducer';
import DashboardTabs from '../../components/Dashboard/Tabs';
import Table from '../../components/Table';
import Inputs from '../../components/Inputs';
import {
  getBrokeredPackagesBrokeredDone,
  getBrokeredPackagesBrokeredInProgress,
  getBrokeredPackagesBrokeredNew,
  getBrokeredPackagesPackageTypes,
  getBrokeredPackagesSocialWorkers,
  getBrokeredPackagesStages,
  putBrokeredPackagesAssign,
} from '../../api/Dashboard/brokeredPackages';
import { formatDate } from '../../service/helpers';
import { currency } from '../../constants/strings';
import CustomDropDown from '../../components/CustomDropdown';
import Pagination from '../../components/Payments/Pagination';
import { useRouter } from 'next/router';
import { RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE, RESIDENTIAL_CARE_BROKERING_ROUTE, NURSING_CARE_BROKERING_ROUTE, NURSING_CARE_APPROVE_BROKERED_ROUTE } from '../../routes/RouteConstants';

const BrokerageHubPage = () => {
  const dispatch = useDispatch();
  const [initialFilters] = useState({
    PackageId: '',
    TypeOfCare: '',
    Stage: '',
    SocialWorker: '',
    HackneyId: '',
  });

  const router = useRouter();

  const onClickTableRow = (rowItems) => {
    if(rowItems.packageTypeId === 3)
    {
      if(tab === "new")
      router.push(`${RESIDENTIAL_CARE_BROKERING_ROUTE}/${rowItems.packageId}`)
      else if(tab === "inProgress")
      router.push(`${RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`)
      else if(tab === "done")
      router.push(`${RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`)
    }
    else{
      if(tab === "new")
      router.push(`${NURSING_CARE_BROKERING_ROUTE}/${rowItems.packageId}`)
      else if(tab === "inProgress")
      router.push(`${NURSING_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`)
      else if(tab === "done")
      router.push(`${NURSING_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`)
    }
  };

  const [filters, setFilters] = useState({ ...initialFilters });
  const [timer, setTimer] = useState(null);
  const [stageOptions, setStagesOptions] = useState([]);
  const [socialWorkerOptions, setSocialWorkersOptions] = useState([]);
  const [packageId, setPackageValue] = useState();

  const [sorts] = useState([
    { name: 'packageType', text: 'Package Type' },
    { name: 'startDate', text: 'Start Date' },
    { name: 'serviceUser', text: 'Service User' },
    { name: 'stage', text: 'Stage', className: 'table__row-item-justify-center' },
    { name: 'owner', text: 'OWNER' },
    { name: 'hackneyReferenceNumber', text: 'HACKNEY REFERENCE NUMBER' },
    { name: 'lastUpdated', text: 'LAST UPDATED' },
    { name: 'daysSinceApproval', text: 'DAYS SINCE APPROVAL' },
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
    { value: 'new', text: `New${tabsTable.new.length ? ` (${tabsTable.new.length})` : ''}` },
    {
      value: 'inProgress',
      text: `In Progress ${tabsTable.inProgress.length ? ` (${tabsTable.inProgress.length})` : ''}`,
    },
    { value: 'done', text: `Done${tabsTable.done.length ? ` (${tabsTable.done.length})` : ''}` },
  ];

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const setPackageId = (packageId) => {
    setPackageValue(packageId);
  };

  const brokeredPackagesAssign = (option) => {
    putBrokeredPackagesAssign(packageId, option.id)
      .then(() => pushNotification('Assigned success'))
      .catch(() => pushNotification('Assign fail'));
  };

  const makeTabRequest = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        getBrokeredPackagesStages()
          .then((res) => setStagesOptions(res))
          .catch(() => pushNotification('Can not get stages'));

        getBrokeredPackagesPackageTypes()
          .then((res) => changeInputs('TypeOfCare', res))
          .catch(() => pushNotification('Can not get Package Type'));

        getBrokeredPackagesSocialWorkers()
        .then((res) => setSocialWorkersOptions(res))
        .catch(() => pushNotification('Can not get social workers'));

        tabsRequests[tab]({
          ...filters,
          PageNumber: page,
          OrderBy: sort.name,
          PageSize : 50,
        }).then((res) => {
          setTabsTable({
            ...tabsTable,
            [tab]: res.data,
          });
          setPagingMetaData({
            ...pagingMetaData,
            [tab]: res.pagingMetaData,
          });
        });
      }, 500)
    );
  };

  useEffect(() => {
    makeTabRequest();
  }, [page, tab, sort]);

  const tableRows = tabsTable[tab];

  const rowsRules = {
    packageId: {
      hide: true,
    },
    startDate: {
      getValue: (value) => `${formatDate(value, '/')}`,
    },
    lastUpdated: {
      getValue: (value) => `${formatDate(value, '/')}`,
    },
    owner: {
      getComponent: (item) => {
        return (
          <CustomDropDown
            onOptionSelect={brokeredPackagesAssign}
            key={setPackageId(item.packageId)}
            options={socialWorkerOptions}
            className="table__row-item"
            fields={{
              value: 'id',
              text: 'userName',
            }}
            initialText=""
            selectedValue={item.stage}
          />
        );
      },
    },
    stage: {
      getClassName: (value) => `${value} table__row-item-status`,
    },
  };

  const inputs = {
    inputs: [
      {
        label: 'Search',
        name: 'clientName',
        placeholder: 'Search...',
        search: () => makeTabRequest(),
        className: 'mr-3',
      },
    ],
    dropdowns: [
      { options: [], initialText: 'Type of care', name: 'TypeOfCare', className: 'mr-3' },
      { options: [], initialText: 'Stage', name: 'Stage', className: 'mr-3' },
      { options: [], initialText: 'Social Worker', name: 'SocialWorker', className: 'mr-3' },
    ],
    buttons: [{ initialText: 'Filter', name: 'button-1', className: 'mt-auto', onClick: () => makeTabRequest() }],
  };

  const changeInputs = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

    //todo refactor
    const changePage = (page) => {
      setPage(page);
      makeTabRequest()
    };
  

  const { pageSize, totalCount, totalPages } = pagingMetaData[tab];

  return (
    <div className="brokerage-hub-page">
      <Inputs inputs={inputs} changeInputs={changeInputs} values={filters} title="Brokerage Hub" />
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
        onClickTableRow={onClickTableRow}
      />
      <Pagination
        changePagination={changePage}
        totalPages={totalPages}
        currentPage={page}
        itemsCount={pageSize}
        totalCount={totalCount}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default BrokerageHubPage;
