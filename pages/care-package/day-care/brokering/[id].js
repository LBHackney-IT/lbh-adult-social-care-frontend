import React, { useEffect, useState } from "react";
import { useRouter } from "next/router"
import useSWR from 'swr';
import { useDispatch, useSelector } from 'react-redux'
import { selectBrokerage, getBrokerageSuccess } from '../../../../reducers/brokerageReducer';
import { uniqueID } from "../../../../service/helpers";
import { getHomeCareSummaryData } from "../../../../api/CarePackages/HomeCareApi";
import Layout from "../../../../components/Layout/Layout";
import {
  getAgeFromDateString,
  getEnGBFormattedDate,
} from "../../../../api/Utils/FuncUtils";
import {
  changeDayCarePackageStatus,
  createDayCareBrokerageInfo,
  getDayCareBrokerageStages,
  getDayCarePackageDetailsForBrokerage,
} from "../../../../api/CarePackages/DayCareApi";
import {
  getInitialPackageReclaim,
} from "../../../../api/Utils/CommonOptions";
import {
  mapBrokerageSupplierOptions,
  mapDayCarePackageDetailsForBrokerage,
  mapDayCareStageOptions,
} from "../../../../api/Mappers/DayCareMapper";
import { getSupplierList } from "../../../../api/CarePackages/SuppliersApi";
import { CARE_PACKAGE_ROUTE } from "../../../../routes/RouteConstants";
import PackagesDayCare from "../../../../components/packages/day-care";
import PackageHeader from '../../../../components/CarePackages/PackageHeader'

// start before render
const serverBrokering = async (dayCarePackageId) => {
  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    const dayCarePackage = await getDayCarePackageDetailsForBrokerage(dayCarePackageId);
    data.dayCarePackage = dayCarePackage;

    const {
      newApprovalHistoryItems,
      newOpportunityEntries,
      currentDaysSelected,
    } = mapDayCarePackageDetailsForBrokerage(dayCarePackage);

    data.approvalHistoryEntries = [...newApprovalHistoryItems];
    data.opportunityEntries = [...newOpportunityEntries];
    data.clientDetails = dayCarePackage.clientDetails;
    data.daysSelected = [...currentDaysSelected];
  } catch(error) {
    data.errorData.push(`Retrieve day care package details failed. ${error.message}`);
  }

  return data;
}

const DayCareBrokering = () => {
  const router = useRouter();
  const dayCarePackageId = router.query.id;
  const { data } = useSWR(dayCarePackageId, serverBrokering);
  let approvalHistoryEntries,
    opportunityEntries,
    clientDetails,
    daysSelected,
    dayCarePackage,
    errorData;

  if(data) {
    approvalHistoryEntries = data.approvalHistoryEntries
    opportunityEntries = data.opportunityEntries
    clientDetails = data.clientDetails
    daysSelected = data.daysSelected
    dayCarePackage = data.dayCarePackage
    errorData = data.errorData
  }

  const dispatch = useDispatch();
  const [errors, setErrors] = useState(errorData);
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
      retrieveDayCareBrokerageStages();
  }, [supplierOptions, stageOptions]);

  useEffect(() => {
    dispatch(getBrokerageSuccess({ type: 'dayCarePackage', dayCarePackage }));
  }, []);

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

  const retrieveDayCareBrokerageStages = () => {
    getDayCareBrokerageStages()
      .then((response) => {
        setStageOptions(mapDayCareStageOptions(response));
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve day care brokerage stages failed. ${error.message}`,
        ]);
      });
  };

  const createBrokerageInfo = (dayCarePackageId, brokerageInfoForCreation) => {
    createDayCareBrokerageInfo(dayCarePackageId, brokerageInfoForCreation)
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
    dayCarePackageId,
    brokeringStatusId
  ) => {
    changeDayCarePackageStatus(dayCarePackageId, brokeringStatusId)
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

  const addPackageReclaim = () => {
    setPackagesReclaimed([
      ...packagesReclaimed,
      { ...getInitialPackageReclaim(), id: uniqueID() },
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
    <Layout
      showBackButton
      clientSummaryInfo={{
        client: clientDetails?.clientName,
        hackneyId: clientDetails?.hackneyId,
        age: clientDetails && getAgeFromDateString(clientDetails.dateOfBirth),
        preferredContact: clientDetails?.preferredContact,
        canSpeakEnglish: clientDetails?.canSpeakEnglish,
        packagesCount: 4,
        dateOfBirth: clientDetails && getEnGBFormattedDate(clientDetails.dateOfBirth),
        postcode: clientDetails?.postCode,
      }}
      headerTitle='Day Care Brokering'
    >
      <PackageHeader />
      <PackagesDayCare
        tab={tab}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={brokerage}
        changeTab={changeTab}
        summaryData={summaryData}
        approvalHistory={approvalHistoryEntries}
        dayCarePackage={dayCarePackage}
        supplierOptions={supplierOptions}
        stageOptions={stageOptions}
        dayCareSummary={{
          opportunityEntries,
          needToAddress: dayCarePackage?.packageDetails?.needToAddress,
          transportNeeded: dayCarePackage?.packageDetails?.transportNeeded,
          daysSelected,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
      />
    </Layout>
  );
};

export default DayCareBrokering;
