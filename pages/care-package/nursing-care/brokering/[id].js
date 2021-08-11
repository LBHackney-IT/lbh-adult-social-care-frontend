import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HASC_TOKEN_ID } from '../../../../api/BaseApi';
import { getHomeCareSummaryData } from '../../../../api/CarePackages/HomeCareApi';
import {
  createNursingCareBrokerageInfo,
  getNursingCareBrokerageStages,
  getNursingCarePackageApprovalHistory,
  getNursingCarePackageDetailsForBrokerage,
  nursingCareChangeStage,
  nursingCareChangeStatus,
} from '../../../../api/CarePackages/NursingCareApi';
import { getSupplierList } from '../../../../api/CarePackages/SuppliersApi';
import { mapBrokerageSupplierOptions, mapNursingCareStageOptions } from '../../../../api/Mappers/NursingCareMapper';
import { getAgeFromDateString, getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils';
import PackageHeader from '../../../../components/CarePackages/PackageHeader';
import Layout from '../../../../components/Layout/Layout';
import PackagesNursingCare from '../../../../components/packages/nursing-care';
import withSession from '../../../../lib/session';
import { selectBrokerage } from '../../../../reducers/brokerageReducer';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { CARE_PACKAGE_ROUTE, APPROVER_HUB_ROUTE } from '../../../../routes/RouteConstants';
import { getLoggedInUser, getUserSession, uniqueID } from '../../../../service/helpers';

// start before render
export const getServerSideProps = withSession(async ({ req, res, query: { id: nursingCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const user = getLoggedInUser({ req });

  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    const result = await getNursingCarePackageDetailsForBrokerage(nursingCarePackageId, req.cookies[HASC_TOKEN_ID]);
    const newAdditionalNeedsEntries = result.nursingCarePackage.nursingCareAdditionalNeeds.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );
    data.nursingCarePackage = result;
    data.additionalNeedsEntries = newAdditionalNeedsEntries;
  } catch (error) {
    data.errorData.push(`Retrieve nursing care package details failed. ${error.message}`);
  }

  try {
    const result = await getNursingCarePackageApprovalHistory(nursingCarePackageId, req.cookies[HASC_TOKEN_ID]);
    const newApprovalHistoryItems = result.map((historyItem) => ({
      eventDate: new Date(historyItem.approvedDate).toLocaleDateString('en-GB'),
      eventMessage: historyItem.logText,
      eventSubMessage: historyItem.logSubText,
    }));

    data.approvalHistoryEntries = newApprovalHistoryItems.slice();
  } catch (error) {
    data.errorData.push(`Retrieve nursing care approval history failed. ${error.message}`);
  }

  return { props: { ...data, loggedInUserId: user.userId } };
});

const NursingCareBrokering = ({
  nursingCarePackage,
  additionalNeedsEntries,
  approvalHistoryEntries,
  loggedInUserId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [initialPackageReclaim] = useState({
    type: '',
    notes: '',
    from: '',
    category: '',
    amount: '',
    id: '1',
  });
  const [errors, setErrors] = useState([]);
  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState('approvalHistory');
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);

  useEffect(() => {
    if (!supplierOptions.length || supplierOptions.length === 1) retrieveSupplierOptions();
    if (!stageOptions.length || stageOptions.length === 1) retrieveNursingCareBrokerageStages();
  }, [supplierOptions, stageOptions]);

  const retrieveSupplierOptions = () => {
    getSupplierList()
      .then((response) => {
        setSupplierOptions(mapBrokerageSupplierOptions(response.data));
      })
      .catch((error) => {
        setErrors([...errors, `Retrieve supplier options failed. ${error.message}`]);
      });
  };

  const retrieveNursingCareBrokerageStages = () => {
    getNursingCareBrokerageStages()
      .then((response) => {
        setStageOptions(mapNursingCareStageOptions(response));
      })
      .catch((error) => {
        setErrors([...errors, `Retrieve nursing care brokerage stages failed. ${error.message}`]);
      });
  };

  const createBrokerageInfo = (nursingCarePackageId, brokerageInfoForCreation) => {
    createNursingCareBrokerageInfo(nursingCarePackageId, brokerageInfoForCreation)
      .then(() => {
        dispatch(addNotification({ text: `Package brokerage saved successfully`, className: 'success' }));
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        dispatch(addNotification({ text: `Saving package brokerage failed. ${error.message}` }));
        setErrors([...errors, `Create brokerage info failed. ${error.message}`]);
      });
  };

  const changePackageBrokeringStatus = (nursingCarePackageId, brokeringStatusId) => {
    nursingCareChangeStatus(nursingCarePackageId, brokeringStatusId)
      .then(() => {
        alert('Status changed.');
      })
      .catch((error) => {
        alert(`Change brokerage status failed. ${error.message}`);
        setErrors([...errors, `Change package status failed. ${error.message}`]);
      });
  };

  const changePackageBrokeringStage = (nursingCarePackageId, stageId) => {
    nursingCareChangeStage(nursingCarePackageId, stageId)
      .then(() => {
        alert('Stage changed.');
      })
      .catch((error) => {
        alert(`Change brokerage stage failed. ${error.message}`);
        setErrors([...errors, `Change brokerage stage failed. ${error.message}`]);
      });
  };

  const addPackageReclaim = () => {
    setPackagesReclaimed([...packagesReclaimed, { ...initialPackageReclaim, id: uniqueID() }]);
  };

  const removePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter((item) => item.id !== id);
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => item.id === id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeTab = (chosenTab) => {
    if (chosenTab === 'packageDetails') {
      setSummaryData(getHomeCareSummaryData());
    }
    setTab(chosenTab);
  };

  return (
    <Layout
      clientSummaryInfo={{
        client: nursingCarePackage?.nursingCarePackage?.clientName,
        hackneyId: nursingCarePackage?.nursingCarePackage?.clientHackneyId,
        age:
          nursingCarePackage?.nursingCarePackage &&
          getAgeFromDateString(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth),
        preferredContact: nursingCarePackage?.nursingCarePackage?.clientPreferredContact,
        canSpeakEnglish: nursingCarePackage?.nursingCarePackage?.clientCanSpeakEnglish,
        packagesCount: 4,
        dateOfBirth:
          nursingCarePackage?.nursingCarePackage &&
          getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth),
        postcode: nursingCarePackage?.nursingCarePackage?.clientPostCode,
      }}
      headerTitle="Nursing Care Brokering"
    >
      <PackageHeader title="Proposed Package" />
      <PackagesNursingCare
        tab={tab}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={brokerage}
        changeTab={changeTab}
        summaryData={summaryData}
        approvalHistory={approvalHistoryEntries}
        nursingCarePackage={nursingCarePackage}
        supplierOptions={supplierOptions}
        stageOptions={stageOptions}
        nursingCareSummary={{
          additionalNeedsEntries,
          needToAddress: nursingCarePackage?.nursingCarePackage?.needToAddress,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
        changePackageBrokeringStage={changePackageBrokeringStage}
        loggedInUserId={loggedInUserId}
      />
    </Layout>
  );
};

export default NursingCareBrokering;
