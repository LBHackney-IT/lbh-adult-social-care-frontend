import Layout from "../../Layout/Layout";
import React, { useEffect, useState } from "react";
import DayCareApprovalTitle from "./components/DayCareApprovalTitle";
import ApprovalClientSummary from "../../components/ApprovalClientSummary";
import PackageCostBox from "./components/PackageCostBox";
import DayCarePackageBreakdown from "./components/DayCarePackageBreakdown";
import DayCarePackageElementCostings from "./components/DayCarePackageElementCostings";
import PackageApprovalHistorySummary from "../../components/PackageApprovalHistorySummary";
import TitleHeader from "../../components/TitleHeader";
import DayCareSummary from "./components/DayCareSummary";
import TextArea from "../../components/TextArea";

const apiRes = {
  packageDetails: {
    dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
    isFixedPeriodOrOngoing: false,
    startDate: "2021-04-08T09:50:59.422+00:00",
    endDate: null,
    needToAddress: "Details of the need to be addressed",
    monday: true,
    tuesday: false,
    wednesday: true,
    thursday: false,
    friday: true,
    saturday: true,
    sunday: true,
    transportNeeded: false,
    escortNeeded: true,
    termTimeConsiderationOptionName: "Term Time",
    dayCareOpportunities: [
      {
        dayCarePackageOpportunityId: "71945799-55da-44ea-7056-08d914680886",
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
        dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      },
      {
        dayCarePackageOpportunityId: "220d9f24-5188-4d1e-7057-08d914680886",
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
        dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      },
    ],
  },
  clientDetails: {
    clientName: "Furkan  Kayar",
    hackneyId: 66666,
    dateOfBirth: "1990-05-05T00:00:00",
    postCode: "SW11",
  },
  costSummary: {
    costOfCarePerWeek: 0.0,
    anpPerWeek: 0.0,
    transportCostPerWeek: 0.0,
    totalCostPerWeek: 0.0,
  },
  packageApprovalHistory: [
    {
      historyId: "2666e607-cb13-40f6-3e62-08d91468183a",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-11T10:32:36.5209917+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 1,
      packageStatusName: "New Package",
      logText: "Package requested by Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "be1ca84a-6fd0-4aea-3e63-08d91468183a",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-11T10:32:59.9649637+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 2,
      packageStatusName: "Submitted for Approval",
      logText: "Package submitted for approval by Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "a24f60d1-e021-48f0-c785-08d915043eff",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:10:23.0460802+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 3,
      packageStatusName: "Approve Package",
      logText: "Package details approved by  Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "62918255-921c-4676-c786-08d915043eff",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:11:06.5177671+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 4,
      packageStatusName: "Reject Package",
      logText: "Package rejected by  Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "c953bb47-a30b-4083-c787-08d915043eff",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:11:42.2365287+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 6,
      packageStatusName: "Brokerage - New",
      logText: "Package moved to brokerage by  Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "2c2ecb51-a444-46fe-c788-08d915043eff",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:13:24.0380942+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 3,
      packageStatusName: "Approve Package",
      logText: "Package details approved by  Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "cb7ae20d-75c3-42f6-c789-08d915043eff",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:15:00.1683721+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 12,
      packageStatusName: "Brokerage Approval - Approved",
      logText: "Brokered deal approval - Package approved by  Duncan  Okeno",
      logSubText: null,
      creatorRole: "Broker",
    },
    {
      historyId: "df3e92dc-f997-4955-9a92-08d91506f03d",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:29:39.400725+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 5,
      packageStatusName: "Request More Information",
      logText: "Further information requested by  Duncan  Okeno",
      logSubText:
        "There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss more",
      creatorRole: "Broker",
    },
    {
      historyId: "e8533101-b169-4774-9a93-08d91506f03d",
      dayCarePackageId: "76c89c0e-71b6-4206-530b-08d91468087c",
      dateCreated: "2021-05-12T05:32:14.3548454+00:00",
      creatorId: "1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8",
      creatorName: "Duncan",
      packageStatusId: 14,
      packageStatusName: "Brokerage Approval - Request more information",
      logText:
        "Brokered deal approval - Further information requested by  Duncan  Okeno",
      logSubText:
        "There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss more",
      creatorRole: "Broker",
    },
  ],
};

const initApprovalHistoryEntries = [
  {
    eventDate: "03/12/2021",
    eventMessage: "Package requested by Martin Workman · Social Worker ",
    eventSubMessage: null,
  },
  {
    eventDate: "05/12/2021",
    eventMessage: "Futher information requested by Amecie Steadman · Approver",
    eventSubMessage:
      '"There appears to be more support than needed in the morning for Mr Stephens, please amend or call me to discuss" More',
  },
  {
    eventDate: "06/12/2021",
    eventMessage: "Package re-submitted by Martin Workman · Social Worker ",
    eventSubMessage: null,
  },
];

// Package summary
const initOpportunityEntries = [
  {
    id: 1,
    howLongValue: 1,
    timesPerMonthValue: 1,
    needToAddress:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ut nulla tristique nulla dapibus rhoncus a eu tortor. " +
      "Aliquam suscipit laoreet pharetra. Aenean vestibulum ullamcorper enim, sed rhoncus sem tempor vitae. ",
  },
];

const initDaysSelected = [
  { id: 1, short: "Mon", long: "Monday", checked: true },
  { id: 2, short: "Tue", long: "Tuesday", checked: false },
  { id: 3, short: "Wed", long: "Wednesday", checked: true },
  { id: 4, short: "Thu", long: "Thursday", checked: false },
  { id: 5, short: "Fri", long: "Friday", checked: true },
  { id: 6, short: "Sat", long: "Saturday", checked: false },
  { id: 7, short: "Sun", long: "Sunday", checked: true },
];

const DayCareApprovePackage = () => {
  const [dayCarePackage, setDayCarePackage] = useState(apiRes);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [daysSelected, setDaysSelected] = useState(initDaysSelected);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);

  useEffect(() => {
    retrieveDayCarePackageDetails("76c89c0e-71b6-4206-530b-08d91468087c");
  }, []);
  const retrieveDayCarePackageDetails = (dayCarePackageId) => {
    // Call to api to get package
    // Update package state
    const newApprovalHistoryItems = dayCarePackage.packageApprovalHistory.map(
      (historyItem) => ({
        eventDate: new Date(historyItem.dateCreated).toLocaleDateString(
          "en-GB"
        ),
        eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
        eventSubMessage: historyItem.logSubText,
      })
    );

    const newOpportunityEntries = dayCarePackage.packageDetails.dayCareOpportunities.map(
      (opportunityItem) => ({
        id: opportunityItem.dayCarePackageOpportunityId,
        howLongValue: opportunityItem.howLong.optionName,
        timesPerMonthValue: opportunityItem.howManyTimesPerMonth.optionName,
        needToAddress: opportunityItem.opportunitiesNeedToAddress,
      })
    );

    setApprovalHistoryEntries([...newApprovalHistoryItems]);
    setOpportunityEntries([...newOpportunityEntries]);

    // Set days selected
    let currentDaysSelected = [...daysSelected];
    let monday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "monday"
      ),
      checked: dayCarePackage.packageDetails.monday,
    };
    let tuesday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "tuesday"
      ),
      checked: dayCarePackage.packageDetails.tuesday,
    };
    let wednesday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "wednesday"
      ),
      checked: dayCarePackage.packageDetails.wednesday,
    };
    let thursday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "thursday"
      ),
      checked: dayCarePackage.packageDetails.thursday,
    };
    let friday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "friday"
      ),
      checked: dayCarePackage.packageDetails.friday,
    };
    let saturday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "saturday"
      ),
      checked: dayCarePackage.packageDetails.saturday,
    };
    let sunday = {
      ...currentDaysSelected.find(
        (dayObj) => dayObj.long.toLowerCase() === "sunday"
      ),
      checked: dayCarePackage.packageDetails.sunday,
    };
    currentDaysSelected = [
      monday,
      tuesday,
      wednesday,
      thursday,
      friday,
      saturday,
      sunday,
    ];

    setDaysSelected([...currentDaysSelected]);
  };
  return (
    <Layout headerTitle="DAY CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <DayCareApprovalTitle
          termTimeConsiderationOption={
            dayCarePackage.packageDetails.termTimeConsiderationOptionName
          }
          isFixedPeriodOrOngoing={
            dayCarePackage.packageDetails.isFixedPeriodOrOngoing
          }
        />
        <ApprovalClientSummary />

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      STARTS
                    </p>
                    <p className="font-size-14px">
                      {new Date(
                        dayCarePackage.packageDetails.startDate
                      ).toLocaleDateString("en-GB")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">ENDS</p>
                    <p className="font-size-14px">
                      {dayCarePackage.packageDetails.endDate !== null
                        ? dayCarePackage.packageDetails.endDate
                        : "Ongoing"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">
                      DAYS/WEEK
                    </p>
                    <p className="font-size-14px">3</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="column" />
          <div className="column" />
        </div>

        <div className="columns">
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-yellow-box"
              title="COST OF CARE / WK"
              cost={`£${dayCarePackage.costSummary.costOfCarePerWeek}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-yellow-box"
              title="ANP / WK"
              cost={`£${dayCarePackage.costSummary.anpPerWeek}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-yellow-box"
              title="TRANSPORT / WK"
              cost={`£${dayCarePackage.costSummary.transportCostPerWeek}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-yellow-box"
              title="TOTAL / WK"
              cost={`£${dayCarePackage.costSummary.totalCostPerWeek}`}
              costType="ESTIMATE"
            />
          </div>
        </div>

        <DayCarePackageBreakdown
          dayCareTime="12h"
          transportTime="4h/week"
          dayOpportunitiesTotalTime="3h"
        />
        <DayCarePackageElementCostings />

        <PackageApprovalHistorySummary
          approvalHistoryEntries={approvalHistoryEntries}
        />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-4">
              <TitleHeader>Package Details</TitleHeader>
              <DayCareSummary
                opportunityEntries={opportunityEntries}
                needToAddress={dayCarePackage.packageDetails.needToAddress}
                transportNeeded={dayCarePackage.packageDetails.transportNeeded}
                daysSelected={daysSelected}
                deleteOpportunity={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="level mt-3">
              <div className="level-left" />
              <div className="level-right">
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-light">Deny</button>
                </div>
                <div className="level-item  mr-2">
                  <button
                    onClick={() => setDisplayMoreInfoForm(!displayMoreInfoForm)}
                    className="button hackney-btn-light"
                  >
                    {displayMoreInfoForm
                      ? "Hide Request more information"
                      : "Request More Information"}
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button className="button hackney-btn-green">
                    Approve to be brokered
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {displayMoreInfoForm && (
          <div className="columns">
            <div className="column">
              <div className="mt-1">
                <p className="font-size-16px font-weight-bold">
                  Request more information
                </p>
                <TextArea label="" rows={5} placeholder="Add details..." />
                <button className="button hackney-btn-green">
                  Request more information
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DayCareApprovePackage;
