import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import { addNotification } from '../../reducers/notificationsReducer';
import DashboardTabs from '../../components/Dashboard/Tabs';
import Table from '../../components/Table';
import Inputs from '../../components/Inputs';
import { putBrokeredPackagesAssign } from '../../api/Dashboard/brokeredPackages';
import { formatDate, formatForDropDownOptions, formatStatus } from '../../service/helpers';
import CustomDropDown from '../../components/CustomDropdown';
import Pagination from '../../components/Payments/Pagination';
import {
  NURSING_CARE_APPROVE_BROKERED_ROUTE,
  NURSING_CARE_BROKERING_ROUTE,
  RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE,
  RESIDENTIAL_CARE_BROKERING_ROUTE,
} from '../../routes/RouteConstants';
import { DEFAULT_PAGE_SIZE } from '../../constants/variables';
import { checkEmptyFields } from '../../service/inputValidator';
import { sortArray } from '../../api/Utils/FuncUtils';
import { DATA_TYPES } from '../../api/Utils/CommonOptions';
import useBrokeredPackageApi from '../../api/SWR/useBrokeredPackagesApi'

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
  const [requestFilters, setRequestFilters] = useState({
    ...initialFilters,
  })

  const { data: stageOptions } = useBrokeredPackageApi.stages();
  const { data: typeOfCareOptions } = useBrokeredPackageApi.types();
  const { data: socialWorkerOptions } = useBrokeredPackageApi.socialWorkers();

  const [sorts] = useState([
    { name: 'packageType', text: 'Package Type' },
    { name: 'startDate', text: 'Start Date', dataType: DATA_TYPES.DATE },
    { name: 'serviceUser', text: 'Service User' },
    { name: 'stage', text: 'Stage', className: 'table__row-item-justify-center' },
    { name: 'owner', text: 'OWNER' },
    { name: 'hackneyReferenceNumber', text: 'HACKNEY REFERENCE NUMBER' },
    { name: 'lastUpdated', text: 'LAST UPDATED', dataType: DATA_TYPES.DATE },
    { name: 'daysSinceApproval', text: 'DAYS SINCE APPROVAL' },
  ]);

  const checkFields = useCallback(() => {
    if(checkEmptyFields(filters)) {
      return ' display-none';
    }
    return '';
  }, [filters]);

  const inputs = {
    inputs: [
      {
        label: 'Search',
        name: 'clientName',
        placeholder: 'Enter name or Hackney ID',
        search: () => setRequestFilters(filters),
        className: 'mr-3',
      },
    ],
    dropdowns: [
      { options: formatForDropDownOptions({ text: 'packageType' }, typeOfCareOptions), initialText: 'Type of care', name: 'typeOfCare', className: 'mr-3' },
      { options: formatForDropDownOptions({ text: 'stageName' }, stageOptions), initialText: 'Stage', name: 'stageName', className: 'mr-3' },
      { options: formatForDropDownOptions({ text: 'userName' }, socialWorkerOptions), initialText: 'Social Worker', name: 'socialWorkerName', className: 'mr-3' },
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto ml-auto', onClick: () => setRequestFilters(filters) },
      { initialText: 'Clear', name: 'button-2', className: `mt-auto ml-3 outline gray${checkFields()}`, onClick: () => setFilters({...initialFilters}) }
    ],
  };

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const [tab, setTab] = useState('new');
  const [page, setPage] = useState(1);

  const { data: {
    data: brokeredNew,
    pagingMetaData: pagingMetaDataNew,
  }} = useBrokeredPackageApi.new({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const {
    data: {
      data: brokeredInProgress,
      pagingMetaData: pagingMetaDataInProgress,
    }} = useBrokeredPackageApi.inProgress({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const {
    data: {
      data: brokeredDone,
      pagingMetaData: pagingMetaDataDone,
    }} = useBrokeredPackageApi.done({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const tabsTable = {
    new: brokeredNew,
    inProgress: brokeredInProgress,
    done: brokeredDone,
  };

  const pagingMetaData = {
    new: pagingMetaDataNew,
    inProgress: pagingMetaDataInProgress,
    done: pagingMetaDataDone,
  }

  const tabs = [
    { value: 'new', text: `New${pagingMetaData.new ? ` (${pagingMetaData.new.totalCount})` : ''}` },
    {
      value: 'inProgress',
      text: `In Progress ${pagingMetaData.inProgress ? ` (${pagingMetaData.inProgress.totalCount})` : ''}`,
    },
    { value: 'done', text: `Done${pagingMetaData.done ? ` (${pagingMetaData.done.totalCount})` : ''}` },
  ];

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const brokeredPackagesAssign = (packageId, userId) => {
    putBrokeredPackagesAssign(packageId, userId)
      .then(() => pushNotification('Assigned success', 'success'))
      .catch((e) => pushNotification(e || 'Assign fail'));
  };

  const tableRows = sortArray(tabsTable[tab], sort);

  const rowsRules = {
    packageId: {
      getHide: () => true,
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
        const { packageId, serviceUser, serviceUserId } = item;
        return (
          <CustomDropDown
            onOptionSelect={() => brokeredPackagesAssign(packageId, serviceUserId)}
            key={packageId}
            options={socialWorkerOptions}
            className={`table__row-item${tableClass}`}
            initialText=""
            selectedValue={{ text: serviceUser, value: serviceUserId }}
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

  const changePage = (chosenPage) => {
    setPage(chosenPage);
  };

  const isLoadingData = Object.values(tabsTable).every((item) => !item);

  return (
    <div className="brokerage-hub-page">
      <Inputs inputs={inputs} changeInputs={changeInputs} values={filters} title="Brokerage Hub" />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        loading={isLoadingData}
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
        totalPages={pagingMetaData[tab]?.totalPages}
        currentPage={page}
        pageSize={pagingMetaData[tab]?.pageSize}
        totalCount={pagingMetaData[tab]?.totalCount}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default BrokerageHubPage;
