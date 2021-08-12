import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
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
import { formatDate, formatStatus, sortTableByKey } from '../../service/helpers';
import CustomDropDown from '../../components/CustomDropdown';
import Pagination from '../../components/Payments/Pagination';
import {
  NURSING_CARE_APPROVE_BROKERED_ROUTE,
  NURSING_CARE_BROKERING_ROUTE,
  RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE,
  RESIDENTIAL_CARE_BROKERING_ROUTE,
} from '../../routes/RouteConstants';

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
    if (rowItems.packageTypeId === 3) {
      if (tab === 'new') router.push(`${RESIDENTIAL_CARE_BROKERING_ROUTE}/${rowItems.packageId}`);
      else if (tab === 'inProgress') router.push(`${RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`);
      else if (tab === 'done') router.push(`${RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`);
    } else {
      if (tab === 'new') router.push(`${NURSING_CARE_BROKERING_ROUTE}/${rowItems.packageId}`);
      else if (tab === 'inProgress') router.push(`${NURSING_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`);
      else if (tab === 'done') router.push(`${NURSING_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`);
    }
  };

  const [filters, setFilters] = useState({ ...initialFilters });
  const [timer, setTimer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [stageOptions, setStagesOptions] = useState([]);
  const [typeOfCareOptions, setTypeOfCareOptions] = useState([]);
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

  const checkEmptyFields = useCallback(() => {
    for(const field in filters) {
      if(filters[field]) {
        return '';
      }
    }
    return ' display-none';
  }, [filters]);

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
      { options: typeOfCareOptions, initialText: 'Type of care', name: 'typeOfCare', className: 'mr-3' },
      { options: stageOptions, initialText: 'Stage', name: 'stageName', className: 'mr-3' },
      { options: socialWorkerOptions, initialText: 'Social Worker', name: 'socialWorkerName', className: 'mr-3' },
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto', onClick: () => makeTabRequest() },
      { initialText: 'Clear', name: 'button-2', className: `mt-auto ml-3 outline gray${checkEmptyFields()}`, onClick: () => setFilters({...initialFilters}) }
    ],
  };

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

  const setPackageId = (selectedPackageId) => {
    setPackageValue(selectedPackageId);
  };

  const brokeredPackagesAssign = (option) => {
    putBrokeredPackagesAssign(packageId, option.id)
      .then(() => pushNotification('Assigned success', 'success'))
      .catch((e) => pushNotification(e || 'Assign fail'));
  };

  function getNewOptions(field, res) {
    return res.map((item) => ({
      text: item[field],
      value: item.id,
    }));
  }

  function onGetBrokeredPackagesPackageTypes() {
    return getBrokeredPackagesPackageTypes()
      .then((res) => {
        setTypeOfCareOptions(getNewOptions('packageType', res));
      })
      .catch((e) => pushNotification(e || 'Can not get Package Type'));
  }

  function onGetBrokeredPackagesStages() {
    return getBrokeredPackagesStages().then((res) => {
      setStagesOptions(getNewOptions('stageName', res));
    })
      .catch((e) => pushNotification(e || 'Can not get stages'));
  }

  function onGetBrokeredPackagesSocialWorkers() {
    return getBrokeredPackagesSocialWorkers()
      .then((res) => {
        setSocialWorkersOptions(getNewOptions('userName', res));
      })
      .catch((e) => pushNotification(e || 'Can not get social workers'));
  }

  const makeTabRequest = () => {
    setLoading(true);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(setTimeout( () => {

      onGetBrokeredPackagesPackageTypes();
      onGetBrokeredPackagesStages();
      onGetBrokeredPackagesSocialWorkers();

      tabsRequests[tab]({
        ...filters,
        PageNumber: page,
        OrderBy: sort.name,
        PageSize: 50,
      }).then((res) => {
        sortTableByKey(res.data, sort)
        setTabsTable({
          ...tabsTable,
          [tab]: res.data,
        });
        setPagingMetaData({
          ...pagingMetaData,
          [tab]: res.pagingMetaData,
        });
        setLoading(false);
      })
        .catch(e => {
          pushNotification(e);
          setLoading(false);
        })
    }, 500));
  };

  useEffect(() => {
    makeTabRequest();
  }, [page, tab, sort]);

  const tableRows = tabsTable[tab];

  const rowsRules = {
    packageId: {
      hide: true,
    },
    hackneyId: {
      getValue: (value) => `#${value}`,
    },
    startDate: {
      getValue: (value) => `${formatDate(value, '/')}`,
    },
    lastUpdated: {
      getValue: (value) => `${formatDate(value, '/')}`,
    },
    owner: {
      getComponent: (item, b, tableClass) => {
        const { packageId: itemId, serviceUser } = item;
        return (
          <CustomDropDown
            onOptionSelect={brokeredPackagesAssign}
            key={itemId}
            options={socialWorkerOptions}
            className={`table__row-item${tableClass}`}
            initialText=""
            selectedValue={serviceUser}
          />
        );
      },
    },
    stage: {
      getClassName: (value) => `${formatStatus(value, '-', true)} table__row-item-status`,
    },
  };

  const changeInputs = (field, value) => {
    setFilters({
      ...filters,
      [field]: value,
    });
  };

  // todo refactor
  const changePage = (chosenPage) => {
    setPage(chosenPage);
    makeTabRequest();
  };

  const { pageSize, totalCount, totalPages } = pagingMetaData[tab];

  return (
    <div className="brokerage-hub-page">
      <Inputs inputs={inputs} changeInputs={changeInputs} values={filters} title="Brokerage Hub" />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        loading={loading}
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
