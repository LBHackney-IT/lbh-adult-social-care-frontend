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
import { getDayCarePackageDetailsForBrokerage } from "../../../api/CarePackages/DayCareApi";
import { useParams } from "react-router-dom";
import { getInitDaysSelected } from "../../../api/Utils/CommonOptions";
import { mapDayCarePackageDetailsForBrokerage } from "../../../api/Mappers/DayCareMapper";

const initialPackageReclaim = {
  type: "",
  notes: "",
  from: "",
  category: "",
  amount: "",
  id: "1",
};
const initDayCarePackage = {
  packageDetails: {
    dayCarePackageId: "4ff66485-75c6-4e5e-b2d0-abb76703c4c6",
    isFixedPeriodOrOngoing: false,
    startDate: "2021-04-08T12:50:59.422+03:00",
    endDate: null,
    needToAddress: "Details of the need to be addressed",
    daysPerWeek: 7,
    dayCareOpportunitiesHoursPerWeek: 5,
    transportNeeded: true,
    transportEscortNeeded: true,
    escortNeeded: true,
    termTimeConsiderationOptionName: "Term Time",
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: true,
    sunday: true,
    dayCareOpportunities: [
      {
        dayCarePackageOpportunityId: "282002e5-4066-4ae8-adf7-9d9ebdf346a9",
        howLong: {
          opportunityLengthOptionId: 1,
          optionName: "45 minutes",
          timeInMinutes: 45,
        },
        howManyTimesPerMonth: {
          opportunityTimePerMonthOptionId: 1,
          optionName: "Daily",
        },
        opportunitiesNeedToAddress: "Opportunity Need to address",
        dayCarePackageId: "4ff66485-75c6-4e5e-b2d0-abb76703c4c6",
      },
      {
        dayCarePackageOpportunityId: "71d2883a-672c-48e6-aa0d-e4ac80cfd0dd",
        howLong: {
          opportunityLengthOptionId: 1,
          optionName: "45 minutes",
          timeInMinutes: 45,
        },
        howManyTimesPerMonth: {
          opportunityTimePerMonthOptionId: 3,
          optionName: "Monthly",
        },
        opportunitiesNeedToAddress: "Opportunity Need to address",
        dayCarePackageId: "4ff66485-75c6-4e5e-b2d0-abb76703c4c6",
      },
    ],
  },
  clientDetails: {
    clientName: "Furkan  Kayar",
    hackneyId: 66666,
    dateOfBirth: "1990-05-05T00:00:00",
    postCode: "SW11",
    preferredContact: "Phone",
    canSpeakEnglish: "Fluent",
  },
  packageApprovalHistory: [
    {
      historyId: "28c363cc-bd45-4b3b-a93d-e9384bccb545",
      dayCarePackageId: "4ff66485-75c6-4e5e-b2d0-abb76703c4c6",
      dateCreated: "2021-05-14T14:16:55.810554+03:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 2,
      packageStatusName: "Submitted for Approval",
      logText: "Package submitted for approval by Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "d6bc46de-2dd1-4c0d-9e40-7be5561868ef",
      dayCarePackageId: "4ff66485-75c6-4e5e-b2d0-abb76703c4c6",
      dateCreated: "2021-05-14T14:16:55.783487+03:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 1,
      packageStatusName: "New Package",
      logText: "Package requested by Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
  ],
};
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
  const [clientDetails, setClientDetails] = useState(
    initDayCarePackage.clientDetails
  );

  useEffect(() => {
    retrieveDayCarePackageDetails(dayCarePackageId);
  }, [dayCarePackageId]);

  useEffect(() => {
    console.log(dayCarePackage);
  }, [dayCarePackage]);

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

        setDaysSelected([...currentDaysSelected]);
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve day care package details failed. ${error.message}`,
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
    <Layout headerTitle="Rapid D2A">
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
        dayCareSummary={{
          opportunityEntries: opportunityEntries,
          needToAddress: dayCarePackage?.packageDetails.needToAddress,
          transportNeeded: dayCarePackage?.packageDetails.transportNeeded,
          daysSelected: daysSelected,
          deleteOpportunity: () => {},
        }}
      />
    </Layout>
  );
};

export default DayCareBrokering;
