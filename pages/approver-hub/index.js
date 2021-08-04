import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Pagination from '../../components/Payments/Pagination';
import HackneyFooterInfo from '../../components/HackneyFooterInfo';
import DashboardTabs from '../../components/Dashboard/Tabs';
import Table from '../../components/Table';
import { formatDate, formatStatus } from '../../service/helpers';
import { addNotification } from '../../reducers/notificationsReducer';
import {
  getApprovedPackagesApprovers,
  getApprovedPackagesAwaitingBrokerage,
  getApprovedPackagesClarificationNeed,
  getApprovedPackagesCompleted,
  getApprovedPackagesNew,
  getApprovedPackagesPackageTypes,
  getApprovedPackagesReviewCommercial,
  getApprovedPackagesSocialWorkers,
} from '../../api/Dashboard/approvedPackages';
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

const ApproverHubPage = () => {
  const dispatch = useDispatch();
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
    if (rowItems.packageTypeId === 3) {
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
  const [timer, setTimer] = useState(null);
  const [page, setPage] = useState(1);

  const [sorts] = useState([
    { name: 'service-user', text: 'SERVICE USER' },
    { name: 'package-type', text: 'PACKAGE TYPE' },
    { name: 'care-value', text: 'CARE VALUE' },
    { name: 'Approver', text: 'APPROVER' },
    { name: 'submitted-by', text: 'SUBMITTED BY' },
    { name: 'id', text: 'ID' },
    { name: 'last-updated', text: 'LAST UPDATED' },
  ]);

  const [tab, setTab] = useState('new');

  const tabsRequests = {
    new: getApprovedPackagesNew,
    clarification: getApprovedPackagesClarificationNeed,
    awaitingBrokerage: getApprovedPackagesAwaitingBrokerage,
    reviewCommercials: getApprovedPackagesReviewCommercial,
    completed: getApprovedPackagesCompleted,
  };

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
    { className: 'border-2', value: 'new', text: `New ${tabsTable.new.length ? `(${tabsTable.new.length})` : ''}` },
    {
      value: 'clarification',
      text: `Clarification ${tabsTable.clarification?.length ? `(${tabsTable.clarification.length})` : ''}`,
    },
    {
      className: 'border-2',
      value: 'awaitingBrokerage',
      text: `Awaiting Brokerage ${tabsTable.awaitingBrokerage.length ? `(${tabsTable.awaitingBrokerage.length})` : ''}`,
    },
    {
      className: 'border-2',
      value: 'reviewCommercials',
      text: `Review Commercials ${tabsTable.reviewCommercials.length ? `(${tabsTable.reviewCommercials.length})` : ''}`,
    },
    { value: 'completed', text: `Completed ${tabsTable.completed.length ? `(${tabsTable.completed.length})` : ''}` },
  ]);

  const [sort, setSort] = useState({
    value: 'increase',
    name: 'id',
  });

  const [inputs] = useState({
    inputs: [
      {
        label: 'Search',
        placeholder: 'Enter name or Hackney ID',
        search: () => makeTabRequest(),
        className: 'mr-3',
        name: 'clientName',
      },
    ],
    dropdowns: [
      { options: [], initialText: 'Package Type', name: 'PackageType', className: 'mr-3' },
      { options: [], initialText: 'Social Worker', name: 'SocialWorker', className: 'mr-3' },
      { options: [], initialText: 'Approver', name: 'Approver', className: 'mr-3' },
      // { options: [], initialText: 'By Value', name: 'ByValue', className: 'mr-3' },
    ],
    buttons: [{ initialText: 'Filter', name: 'button-1', className: 'mt-auto', onClick: () => makeTabRequest() }],
  });

  const sortBy = (field, value) => {
    setSort({ value, name: field });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const makeTabRequest = () => {
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(() => {
        const setInitialOptions = (tag, response) => {
          if (tag === 'PackageType')
            inputs.dropdowns.find((el) => el.name === tag).options = response.map(({ packageType, id }) => ({
              text: packageType,
              value: id,
            }));
          else
            inputs.dropdowns.find((el) => el.name === tag).options = response.map(({ userName, id }) => ({
              text: userName,
              value: id,
            }));
        };
        getApprovedPackagesPackageTypes().then((response) => {
          setInitialOptions('PackageType', response);
          const options = response.map((option) => ({
            text: option?.packageType,
            value: option?.id,
          }));
          changeInputs('PackageType', options.text);
        });

        getApprovedPackagesSocialWorkers().then((response) => {
          setInitialOptions('SocialWorker', response);
          const options = response.map((option) => ({
            text: option?.userName,
            value: option?.id,
          }));
          changeInputs('SocialWorker', options);
        });

        getApprovedPackagesApprovers().then((response) => {
          setInitialOptions('Approver', response);
          const options = response.map((option) => ({
            text: option?.userName,
            value: option?.id,
          }));
          changeInputs('Approver', options);
        });

        tabsRequests[tab]({
          PageNumber: page,
          OrderBy: sort.name,
          PageSize: 50,
          ...filters,
        })
          .then((res) => {
            let tableData = res.data || [];
            tableData = tableData.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
            setTabsTable({
              ...tabsTable,
              [tab]: tableData,
            });
            setPagingMetaData({
              ...pagingMetaData,
              [tab]: res.pagingMetaData,
            });
          })
          .catch(() => dispatch(addNotification()));
      }, 500)
    );
  };

  useEffect(() => {
    makeTabRequest();
  }, [tab, sort]);

  const rowsRules = {
    packageType: {
      onClick: (cellItem, cellValue) => changeInputs('PackageType', cellValue),
      getValue: (value) => formatStatus(value),
    },
    lastUpdated: {
      getValue: (value) => formatDate(value, '/'),
    },
    careValue: {
      getClassName: () => 'text-bold',
      getValue: (value) => `${currency.euro}${value}`,
    },
    id: {
      getValue: (value) => "[Hackney ID]"
    }
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
    <div className="approver-hub-page">
      <Inputs
        inputs={inputs}
        changeInputs={changeInputs}
        className="approver-hub__inputs"
        values={filters}
        title="Approver Hub"
      />
      <DashboardTabs tabs={tabs} changeTab={setTab} tab={tab} />
      <Table
        classes="p-4"
        fields={{
          serviceUser: 'serviceUser',
          packageType: 'packageType',
          careValue: 'careValue',
          approver: 'approver',
          submittedBy: 'submittedBy',
          id: 'packageId',
          lastUpdated: 'lastUpdated',
          tab,
        }}
        rowsRules={rowsRules}
        rows={tabsTable[tab]}
        sortBy={sortBy}
        sorts={sorts}
        onClickTableRow={onClickTableRow}
      />
      <Pagination
        currentPage={page}
        changePagination={changePage}
        itemsCount={pageSize}
        totalCount={totalCount}
        totalPages={totalPages}
      />
      <HackneyFooterInfo />
    </div>
  );
};

export default ApproverHubPage;
