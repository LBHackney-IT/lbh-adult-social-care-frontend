import PackagesDayCare from "../../ProposedPackages/PackagesDayCare";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBrokerage } from "../../../reducers/brokerageReducer";
import { uniqueID } from "../../../service/helpers";
import { getHomeCareSummaryData } from "../../../api/CarePackages/HomeCareApi";
import ClientSummary from "../../components/ClientSummary";
import Layout from "../../Layout/Layout";
import {
  getAgeFromDateString,
  getEnGBFormattedDate,
} from "../../../api/Utils/FuncUtils";
import {
  changeDayCarePackageStatus,
  createDayCareBrokerageInfo,
  getDayCareBrokerageStages,
  getDayCarePackageDetailsForBrokerage,
} from "../../../api/CarePackages/DayCareApi";
import { useParams } from "react-router-dom";
import {
  getInitDaysSelected,
  getInitialPackageReclaim,
} from "../../../api/Utils/CommonOptions";
import {
  mapBrokerageSupplierOptions,
  mapDayCarePackageDetailsForBrokerage,
  mapDayCareStageOptions,
} from "../../../api/Mappers/DayCareMapper";
import { getSupplierList } from "../../../api/CarePackages/SuppliersApi";
import { CARE_PACKAGE } from "../../../routes/RouteConstants";

const DayCareBrokering = ({ history }) => {
  // Parameters
  const params = useParams();
  let { dayCarePackageId } = params;

  const [errors, setErrors] = useState([]);
  const [dayCarePackage, setDayCarePackage] = useState(undefined);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [daysSelected, setDaysSelected] = useState(getInitDaysSelected());
  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState("approvalHistory");
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);
  const [clientDetails, setClientDetails] = useState(undefined);
  const [supplierOptions, setSupplierOptions] = useState([]);
  const [stageOptions, setStageOptions] = useState([]);

  useEffect(() => {
    if (!supplierOptions.length || supplierOptions.length === 1)
      retrieveSupplierOptions();
    if (!stageOptions.length || stageOptions.length === 1)
      retrieveDayCareBrokerageStages();
  });

  useEffect(() => {
    retrieveDayCarePackageDetails(dayCarePackageId);
  }, [dayCarePackageId]);

  const retrieveDayCarePackageDetails = (dayCarePackageId) => {
    // Call to api to get package
    getDayCarePackageDetailsForBrokerage(dayCarePackageId)
      .then((response) => {
        setDayCarePackage(response);

        const {
          newApprovalHistoryItems,
          newOpportunityEntries,
          currentDaysSelected,
        } = mapDayCarePackageDetailsForBrokerage(response);

        setApprovalHistoryEntries([...newApprovalHistoryItems]);
        setOpportunityEntries([...newOpportunityEntries]);
        setClientDetails(response.clientDetails);

        setDaysSelected([...currentDaysSelected]);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve day care package details failed. ${error.message}`,
        ]);
      });
  };

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
        history.push(`${CARE_PACKAGE}`);
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
    <Layout headerTitle="Day Care Brokering">
      <ClientSummary
        client={clientDetails?.clientName}
        hackneyId={clientDetails?.hackneyId}
        age={clientDetails && getAgeFromDateString(clientDetails.dateOfBirth)}
        preferredContact={clientDetails?.preferredContact}
        canSpeakEnglish={clientDetails?.canSpeakEnglish}
        packagesCount={4}
        dateOfBirth={
          clientDetails && getEnGBFormattedDate(clientDetails.dateOfBirth)
        }
        postcode={clientDetails?.postCode}
      >
        Proposed Packages
      </ClientSummary>

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
          opportunityEntries: opportunityEntries,
          needToAddress: dayCarePackage?.packageDetails?.needToAddress,
          transportNeeded: dayCarePackage?.packageDetails?.transportNeeded,
          daysSelected: daysSelected,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
      />
    </Layout>
  );
};

export default DayCareBrokering;
