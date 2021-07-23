import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import useSWR from 'swr';
import { selectBrokerage } from '../../../../reducers/brokerageReducer'
import { uniqueID } from '../../../../service/helpers'
import { getHomeCareSummaryData } from '../../../../api/CarePackages/HomeCareApi'
import PackagesNursingCare from '../../../../components/packages/nursing-care'
import Layout from '../../../../components/Layout/Layout'
import { getAgeFromDateString, getEnGBFormattedDate, } from '../../../../api/Utils/FuncUtils'

import {
  createNursingCareBrokerageInfo,
  getNursingCareBrokerageStages,
  getNursingCarePackageApprovalHistory,
  getNursingCarePackageDetailsForBrokerage,
  nursingCareChangeStatus,
  nursingCareChangeStage,
} from '../../../../api/CarePackages/NursingCareApi'
import { mapBrokerageSupplierOptions, mapNursingCareStageOptions, } from '../../../../api/Mappers/NursingCareMapper'
import { getSupplierList } from '../../../../api/CarePackages/SuppliersApi'
import { CARE_PACKAGE_ROUTE } from '../../../../routes/RouteConstants'
import PackageHeader from '../../../../components/CarePackages/PackageHeader'

// start before render
const getNursingCareBrokering = async (nursingCarePackageId) => {
  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    const nursingCarePackage = await getNursingCarePackageDetailsForBrokerage(nursingCarePackageId);
    const newAdditionalNeedsEntries = nursingCarePackage.nursingCareAdditionalNeeds.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );
    data.nursingCarePackage = nursingCarePackage;
    data.additionalNeedsEntries = newAdditionalNeedsEntries;
  } catch(error) {
    data.errorData.push(`Retrieve nursing care package details failed. ${error.message}`);
  }

  try {
    data.approvalHistoryEntries = await getNursingCarePackageApprovalHistory(nursingCarePackageId)
      .map(
        (historyItem) => ({
          eventDate: new Date(historyItem.approvedDate).toLocaleDateString(
            "en-GB"
          ),
          eventMessage: historyItem.logText,
          eventSubMessage: undefined
        })
      );
  } catch(error) {
    data.errorData.push(`Retrieve nursing care approval history failed. ${error.message}`)
  }

  return data;
}

const NursingCareBrokering = () => {
  const router = useRouter();
  const nursingCarePackageId = router.query.id;
  const { data } = useSWR(nursingCarePackageId, getNursingCareBrokering);

  let nursingCarePackage,
    additionalNeedsEntries,
    approvalHistoryEntries;

  if (data) {
    approvalHistoryEntries = data.approvalHistoryEntries;
    additionalNeedsEntries = data.additionalNeedsEntriesData;
    nursingCarePackage = data.nursingCarePackage;
  }

  const [initialPackageReclaim] = useState({
    type: "",
    notes: "",
    from: "",
    category: "",
    amount: "",
    id: "1",
  });
  const [errors, setErrors] = useState([]);
  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState("approvalHistory");
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);

  useEffect(() => {
    if (!supplierOptions.length || supplierOptions.length === 1)
      retrieveSupplierOptions();
    if (!stageOptions.length || stageOptions.length === 1)
      retrieveNursingCareBrokerageStages();
  }, [supplierOptions, stageOptions]);

  const retrieveSupplierOptions = () => {
    getSupplierList()
      .then((response) => {
        setSupplierOptions(mapBrokerageSupplierOptions(response));
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve supplier options failed. ${error.message}`,
        ]);
      });
  };

  const retrieveNursingCareBrokerageStages = () => {
    getNursingCareBrokerageStages()
      .then((response) => {
        setStageOptions(mapNursingCareStageOptions(response));
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve nursing care brokerage stages failed. ${error.message}`,
        ]);
      });
  };

  const createBrokerageInfo = (nursingCarePackageId, brokerageInfoForCreation) => {
    createNursingCareBrokerageInfo(nursingCarePackageId, brokerageInfoForCreation)
      .then(() => {
        alert("Package saved.");
        router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Create brokerage info failed. ${error.message}`);
        setErrors([
          ...errors,
          `Create brokerage info failed. ${error.message}`,
        ]);
      });
  };

  const changePackageBrokeringStatus = (
    nursingCarePackageId,
    brokeringStatusId
  ) => {
    nursingCareChangeStatus(nursingCarePackageId, brokeringStatusId)
      .then(() => {
        alert("Status changed.");
      })
      .catch((error) => {
        alert(`Change brokerage status failed. ${error.message}`);
        setErrors([
          ...errors,
          `Change package status failed. ${error.message}`,
        ]);
      });
  };

  const changePackageBrokeringStage = (
    nursingCarePackageId,
    stageId
  ) => {
    nursingCareChangeStage(nursingCarePackageId, stageId)
      .then(() => {
        alert("Stage changed.");
      })
      .catch((error) => {
        alert(`Change brokerage stage failed. ${error.message}`);
        setErrors([
          ...errors,
          `Change brokerage stage failed. ${error.message}`,
        ]);
      });
  };

  const addPackageReclaim = () => {
    setPackagesReclaimed([
      ...packagesReclaimed,
      { ...initialPackageReclaim, id: uniqueID() },
    ]);
  };

  const removePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter(
      (item) => item.id !== id
    );
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => item.id === id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeTab = (tab) => {
    if (tab === "packageDetails") {
      setSummaryData(getHomeCareSummaryData());
    }
    setTab(tab);
  };

  return (
    <Layout clientSummaryInfo={{
      client: nursingCarePackage?.nursingCarePackage?.clientName,
      hackneyId: nursingCarePackage?.nursingCarePackage?.clientHackneyId,
      age: nursingCarePackage?.nursingCarePackage && getAgeFromDateString(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth),
      preferredContact: nursingCarePackage?.nursingCarePackage?.clientPreferredContact,
      canSpeakEnglish: nursingCarePackage?.nursingCarePackage?.clientCanSpeakEnglish,
      packagesCount: 4,
      dateOfBirth: nursingCarePackage?.nursingCarePackage && getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth),
      postcode: nursingCarePackage?.nursingCarePackage?.clientPostCode,
    }} headerTitle="Nursing Care Brokering">
      <PackageHeader title='Proposed Package' />
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
          additionalNeedsEntries: additionalNeedsEntries,
          needToAddress: nursingCarePackage?.nursingCarePackage?.needToAddress,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
        changePackageBrokeringStage={changePackageBrokeringStage}
      />
    </Layout>
  );
};

export default NursingCareBrokering;
