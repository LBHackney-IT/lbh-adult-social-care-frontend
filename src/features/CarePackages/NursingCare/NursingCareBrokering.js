import PackagesNursingCare from "../../ProposedPackages/PackagesNursingCare";
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
  nursingCareChangeStatus,
  createNursingCareBrokerageInfo,
  getNursingCareBrokerageStages,
  getNursingCarePackageDetailsForBrokerage,
  getNursingCarePackageApprovalHistory
} from "../../../api/CarePackages/NursingCareApi";
import { useParams } from "react-router-dom";
import {
  mapBrokerageSupplierOptions,
  mapNursingCareStageOptions,
} from "../../../api/Mappers/NursingCareMapper";
import { getSupplierList } from "../../../api/CarePackages/SuppliersApi";
import { CARE_PACKAGE } from "../../../routes/RouteConstants";

const initialPackageReclaim = {
  type: "",
  notes: "",
  from: "",
  category: "",
  amount: "",
  id: "1",
};
const NursingCareBrokering = ({ history }) => {
  // Parameters
  const params = useParams();
  let { nursingCarePackageId } = params;

  const [errors, setErrors] = useState([]);
  const [nursingCarePackage, setNursingCarePackage] = useState(undefined);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
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
  });

  useEffect(() => {
    retrieveNursingCarePackageDetails(nursingCarePackageId);
    retrieveNursingCareApprovalHistory(nursingCarePackageId);
  }, [nursingCarePackageId]);

  const retrieveNursingCarePackageDetails = (nursingCarePackageId) => {
    // Call to api to get package
    getNursingCarePackageDetailsForBrokerage(nursingCarePackageId)
      .then((response) => {
        setNursingCarePackage(response);

        const newAdditionalNeedsEntries = nursingCarePackage.nursingCareAdditionalNeeds.map(
            (additionalneedsItem) => ({
              id: additionalneedsItem.id,
              isWeeklyCost: additionalneedsItem.isWeeklyCost,
              isOneOffCost: additionalneedsItem.isOneOffCost,
              needToAddress: additionalneedsItem.needToAddress,
            })
          );
  
          setAdditionalNeedsEntries([...newAdditionalNeedsEntries]);
        
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve nursing care package details failed. ${error.message}`,
        ]);
      });
  };

  const retrieveNursingCareApprovalHistory = (nursingCarePackageId) => {
    getNursingCarePackageApprovalHistory(nursingCarePackageId)
      .then((res) => {

        const newApprovalHistoryItems = res.map(
          (historyItem) => ({
            eventDate: new Date(historyItem.approvedDate).toLocaleDateString(
              "en-GB"
            ),
            eventMessage: historyItem.logText,
            eventSubMessage: undefined
          })
        );

        setApprovalHistoryEntries([...newApprovalHistoryItems]);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve nursing care approval history failed. ${error.message}`,
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
    <Layout headerTitle="Nursing Care Brokering">
      <ClientSummary
        client={nursingCarePackage?.nursingCarePackage?.clientName}
        hackneyId={nursingCarePackage?.nursingCarePackage?.clientHackneyId}
        age={nursingCarePackage?.nursingCarePackage && getAgeFromDateString(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth)}
        preferredContact={nursingCarePackage?.nursingCarePackage?.clientPreferredContact}
        canSpeakEnglish={nursingCarePackage?.nursingCarePackage?.clientCanSpeakEnglish}
        packagesCount={4}
        dateOfBirth={
          nursingCarePackage?.nursingCarePackage && getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage?.clientDateOfBirth)
        }
        postcode={nursingCarePackage?.nursingCarePackage?.clientPostCode}
      >
        Proposed Packages
      </ClientSummary>

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
      />
    </Layout>
  );
};

export default NursingCareBrokering;
