import PackagesResidentialCare from "../../../../components/packages/residential-care";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBrokerage } from "../../../../reducers/brokerageReducer";
import { uniqueID } from "../../../../service/helpers";
import { getHomeCareSummaryData } from "../../../../api/CarePackages/HomeCareApi";
import ClientSummary from "../../../../components/ClientSummary";
import Layout from "../../../../components/Layout/Layout";
import {
  getAgeFromDateString,
  getEnGBFormattedDate,
} from "../../../../api/Utils/FuncUtils";
import {
  residentialCareChangeStatus,
  createResidentialCareBrokerageInfo,
  getResidentialCareBrokerageStages,
  getResidentialCarePackageDetailsForBrokerage,
  getResidentialCarePackageApprovalHistory
} from "../../../../api/CarePackages/ResidentialCareApi";
import {
  mapBrokerageSupplierOptions,
  mapResidentialCareStageOptions,
} from "../../../../api/Mappers/ResidentialCareMapper";
import { getSupplierList } from "../../../../api/CarePackages/SuppliersApi";
import { CARE_PACKAGE_ROUTE } from "../../../../routes/RouteConstants";
import {useRouter} from "next/router";

const initialPackageReclaim = {
  type: "",
  notes: "",
  from: "",
  category: "",
  amount: "",
  id: "1",
};
const ResidentialCareBrokering = ({ history }) => {
  // Parameters
  const router = useRouter();
  const params = router.query;
  let { id: residentialCarePackageId } = params;

  const [errors, setErrors] = useState([]);
  const [residentialCarePackage, setResidentialCarePackage] = useState(undefined);
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
      retrieveResidentialCareBrokerageStages();
  });

  useEffect(() => {
    retrieveResidentialCarePackageDetails(residentialCarePackageId);
    retrieveResidentialCareApprovalHistory(residentialCarePackageId);
  }, [residentialCarePackageId]);

  const retrieveResidentialCarePackageDetails = (residentialCarePackageId) => {
    // Call to api to get package
    getResidentialCarePackageDetailsForBrokerage(residentialCarePackageId)
      .then((response) => {
        setResidentialCarePackage(response);

        const newAdditionalNeedsEntries = residentialCarePackage.residentialCareAdditionalNeeds.map(
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
          `Retrieve residential care package details failed. ${error.message}`,
        ]);
      });
  };

  const retrieveResidentialCareApprovalHistory = (residentialCarePackageId) => {
    getResidentialCarePackageApprovalHistory(residentialCarePackageId)
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
          `Retrieve residential care approval history failed. ${error.message}`,
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

  const retrieveResidentialCareBrokerageStages = () => {
    getResidentialCareBrokerageStages()
      .then((response) => {
        setStageOptions(mapResidentialCareStageOptions(response));
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve residential care brokerage stages failed. ${error.message}`,
        ]);
      });
  };

  const createBrokerageInfo = (residentialCarePackageId, brokerageInfoForCreation) => {
    createResidentialCareBrokerageInfo(residentialCarePackageId, brokerageInfoForCreation)
      .then(() => {
        alert("Package saved.");
        history.push(`${CARE_PACKAGE_ROUTE}`);
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
    residentialCarePackageId,
    brokeringStatusId
  ) => {
    residentialCareChangeStatus(residentialCarePackageId, brokeringStatusId)
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
    <Layout headerTitle="Residential Care Brokering">
      <ClientSummary
        client={residentialCarePackage?.residentialCarePackage?.clientName}
        hackneyId={residentialCarePackage?.residentialCarePackage?.clientHackneyId}
        age={residentialCarePackage?.residentialCarePackage && getAgeFromDateString(residentialCarePackage?.residentialCarePackage?.clientDateOfBirth)}
        preferredContact={residentialCarePackage?.residentialCarePackage?.clientPreferredContact}
        canSpeakEnglish={residentialCarePackage?.residentialCarePackage?.clientCanSpeakEnglish}
        packagesCount={4}
        dateOfBirth={
          residentialCarePackage?.residentialCarePackage && getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage?.clientDateOfBirth)
        }
        postcode={residentialCarePackage?.residentialCarePackage?.clientPostCode}
      >
        Proposed Packages
      </ClientSummary>

      <PackagesResidentialCare
        tab={tab}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={brokerage}
        changeTab={changeTab}
        summaryData={summaryData}
        approvalHistory={approvalHistoryEntries}
        residentialCarePackage={residentialCarePackage}
        supplierOptions={supplierOptions}
        stageOptions={stageOptions}
        residentialCareSummary={{
          additionalNeedsEntries: additionalNeedsEntries,
          needToAddress: residentialCarePackage?.residentialCarePackage?.needToAddress,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
      />
    </Layout>
  );
};

export default ResidentialCareBrokering;
