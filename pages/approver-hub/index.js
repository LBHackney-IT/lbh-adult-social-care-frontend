import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import DashboardTabs from '../../components/Dashboard/Tabs';
import Table from '../../components/Table';
import { formatDate, formatForDropDownOptions, includeString } from '../../service/helpers'
import Inputs from '../../components/Inputs';
import {
  RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE,
  RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE,
  RESIDENTIAL_CARE_BROKERING_ROUTE,
  NURSING_CARE_APPROVE_PACKAGE_ROUTE,
  NURSING_CARE_APPROVE_BROKERED_ROUTE,
  NURSING_CARE_BROKERING_ROUTE,
} from '../../routes/RouteConstants';
import { currency } from '../../constants/strings';
import { DEFAULT_PAGE_SIZE } from '../../constants/variables';
import { checkEmptyFields } from '../../service/inputValidator';
import { sortArray } from '../../api/Utils/FuncUtils';
import { DATA_TYPES } from '../../api/Utils/CommonOptions';
import useApprovedPackageApi from '../../api/SWR/useApprovedPackagesApi';

const ApproverHubPage = () => {
  const [initialFilters] = useState({
    hackneyId: '',
    packageTypeId: '',
    socialWorkerId: '',
    approverId: '',
    clientName: '',
    // ByValue: ''
  });
  const router = useRouter();

  const onClickTableRow = (rowItems) => {
    const packageType = packageTypeOptions.find(item => item.id === rowItems.packageTypeId);
    if(includeString(packageType.packageType.toLowerCase(), 'residential')) {
      switch (tab) {
        case 'new': {
          router.push(`${RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
          break;
        }
        case 'clarification': {
          router.push(`${RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
          break;
        }
        case 'awaitingBrokerage': {
          router.push(`${RESIDENTIAL_CARE_BROKERING_ROUTE}/${rowItems.packageId}`);
          break;
        }
        case 'reviewCommercials': {
          router.push(`${RESIDENTIAL_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`);
          break;
        }
        default: {
          router.push(`${RESIDENTIAL_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
          break;
        }
      }
    } else {
      switch (tab) {
        case 'new': {
          router.push(`${NURSING_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
          break;
        }
        case 'clarification': {
          router.push(`${NURSING_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
          break;
        }
        case 'awaitingBrokerage': {
          router.push(`${NURSING_CARE_BROKERING_ROUTE}/${rowItems.packageId}`);
          break;
        }
        case 'reviewCommercials': {
          router.push(`${NURSING_CARE_APPROVE_BROKERED_ROUTE}/${rowItems.packageId}`);
          break;
        }
        default: {
          router.push(`${NURSING_CARE_APPROVE_PACKAGE_ROUTE}/${rowItems.packageId}`);
          break;
        }
      }
    }
  };

  const [filters, setFilters] = useState({ ...initialFilters });
  const [requestFilters, setRequestFilters] = useState({
    ...initialFilters,
  })
  const [page, setPage] = useState(1);

  const [sorts] = useState([
    { name: 'serviceUser', text: 'SERVICE USER' },
    { name: 'packageType', text: 'PACKAGE TYPE' },
    { name: 'careValue', text: 'CARE VALUE' },
    { name: 'approver', text: 'APPROVER' },
    { name: 'submittedBy', text: 'SUBMITTED BY' },
    { name: 'packageId', text: 'ID' },
    { name: 'lastUpdated', text: 'LAST UPDATED', dataType: DATA_TYPES.DATE },
  ]);

  const [sort, setSort] = useState({
    value: 'ascending',
    name: sorts[0].name,
  });

  const [tab, setTab] = useState('new');

  const { data: approversOptions } = useApprovedPackageApi.approvers();
  const { data: packageTypeOptions } = useApprovedPackageApi.types();
  const { data: socialWorkerOptions } = useApprovedPackageApi.socialWorkers();

  const { data: {
      data: approvedNew,
      pagingMetaData: pagingMetaDataNew,
    }} = useApprovedPackageApi.new({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const { data: {
      data: approvedClarification,
      pagingMetaData: pagingMetaDataClarification,
    }} = useApprovedPackageApi.clarificationNeed({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters
    }
  );

  const { data: {
      data: approvedAwaitingBrokerage,
      pagingMetaData: pagingMetaDataAwaitingBrokerage,
    }} = useApprovedPackageApi.awaitingBrokerage({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const { data: {
      data: approvedReviewCommercials,
      pagingMetaData: pagingMetaDataReviewCommercial,
    }} = useApprovedPackageApi.reviewCommercial({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const { data: {
      data: approvedCompleted,
      pagingMetaData: pagingMetaDataCompleted,
    }} = useApprovedPackageApi.completed({
      PageNumber: page,
      OrderBy: sort.name,
      PageSize: DEFAULT_PAGE_SIZE,
      ...requestFilters,
    }
  );

  const tabsTable = {
    new: approvedNew,
    clarification: approvedClarification,
    awaitingBrokerage: approvedAwaitingBrokerage,
    reviewCommercials: approvedReviewCommercials,
    completed: approvedCompleted,
  };

  const pagingMetaData = {
    new: pagingMetaDataNew,
    clarification: pagingMetaDataClarification,
    awaitingBrokerage: pagingMetaDataAwaitingBrokerage,
    reviewCommercials: pagingMetaDataReviewCommercial,
    completed: pagingMetaDataCompleted,
  }

  const tabs = [
    { className: 'border-2', value: 'new', text: `New${pagingMetaData.new ? ` (${pagingMetaData.new.totalCount})` : ''}` },
    {
      value: 'clarification',
      text: `Clarification ${pagingMetaData.clarification ? `(${pagingMetaData.clarification.totalCount})` : ''}`,
    },
    {
      className: 'border-2',
      value: 'awaitingBrokerage',
      text: `Awaiting Brokerage ${pagingMetaData.awaitingBrokerage ? `(${pagingMetaData.awaitingBrokerage.totalCount})` : ''}`,
    },
    {
      className: 'border-2',
      value: 'reviewCommercials',
      text: `Review Commercials ${pagingMetaData.reviewCommercials ? `(${pagingMetaData.reviewCommercials.totalCount})` : ''}`,
    },
    { value: 'completed', text: `Completed ${pagingMetaData.completed ? `(${pagingMetaData.completed.totalCount})` : ''}` },
  ];

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
        placeholder: 'Enter name or Hackney ID',
        search: () => setRequestFilters(filters),
        className: 'mr-3',
        name: 'clientName',
      },
    ],
    dropdowns: [
      { options: formatForDropDownOptions({ text: 'packageType' }, packageTypeOptions), initialText: 'Package Type', name: 'PackageType', className: 'mr-3' },
      { options: formatForDropDownOptions({ text: 'userName' }, socialWorkerOptions), initialText: 'Social Worker', name: 'SocialWorker', className: 'mr-3' },
      { options: formatForDropDownOptions({ text: 'userName' }, approversOptions), initialText: 'Approver', name: 'Approver', className: 'mr-3' },
    ],
    buttons: [
      { initialText: 'Filter', name: 'button-1', className: 'mt-auto', onClick: () => setRequestFilters(filters)},
      { initialText: 'Clear', name: 'button-2', className: `mt-auto ml-3 outline gray${checkFields()}`, onClick: () => setFilters({...initialFilters}) },
    ],
  };

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const rowsRules = {
    packageType: {
      onClick: (cellItem) => {
        changeInputs('PackageType', cellItem?.packageTypeId)
      },
      getClassName: () => 'link-button',
    },
    lastUpdated: {
      getValue: (value) => formatDate(value, '/'),
    },
    careValue: {
      getClassName: () => 'text-bold',
      getValue: (value) => `${currency.euro}${value}`,
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
  };

  const isLoadingData = Object.values(tabsTable).every((item) => !item);

  return (
    <div className="approver-hub-page max-desktop-width">
      <Inputs
        inputs={inputs}
        changeInputs={changeInputs}
        className="approver-hub__inputs"
        values={filters}
        title="Approver Hub"
      />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        loading={isLoadingData}
        className='approver-hub__table'
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
        rows={sortArray(tabsTable[tab], sort)}
        sortBy={sortBy}
        sorts={sorts}
        onClickTableRow={onClickTableRow}
      />
      <Pagination
        currentPage={page}
        changePagination={changePage}
        pageSize={pagingMetaData[tab]?.pageSize}
        totalCount={pagingMetaData[tab]?.totalCount}
        totalPages={pagingMetaData[tab]?.totalPages}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default ApproverHubPage;
