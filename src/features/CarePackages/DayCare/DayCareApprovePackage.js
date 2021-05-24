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
import {
  approveDayCarePackageContents,
  dayCarePackageContentsRequestClarification,
  dayCarePackageRejectContents,
  getDayCarePackageApprovalDetails,
} from "../../../api/CarePackages/DayCareApi";
import { useParams } from "react-router-dom";
import { getInitDaysSelected } from "../../../api/Utils/CommonOptions";
import { getEnGBFormattedDate } from "../../../api/Utils/FuncUtils";

const DayCareApprovePackage = ({ history }) => {
  // Parameters
  const params = useParams();
  let { dayCarePackageId } = params;

  const [errors, setErrors] = useState([]);
  const [dayCarePackage, setDayCarePackage] = useState(null);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [daysSelected, setDaysSelected] = useState(getInitDaysSelected());
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(
    undefined
  );

  useEffect(() => {
    retrieveDayCarePackageDetails(dayCarePackageId);
  }, [history]);

  const retrieveDayCarePackageDetails = (dayCarePackageId) => {
    // Call to api to get package
    getDayCarePackageApprovalDetails(dayCarePackageId)
      .then((res) => {
        setDayCarePackage(res);

        // Update package state
        const newApprovalHistoryItems = res.packageApprovalHistory.map(
          (historyItem) => ({
            eventDate: new Date(historyItem.dateCreated).toLocaleDateString(
              "en-GB"
            ),
            eventMessage: `${historyItem.logText}. ${historyItem.creatorRole}`,
            eventSubMessage: historyItem.logSubText,
          })
        );

        const newOpportunityEntries = res.packageDetails.dayCareOpportunities.map(
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
          checked: res.packageDetails.monday,
        };
        let tuesday = {
          ...currentDaysSelected.find(
            (dayObj) => dayObj.long.toLowerCase() === "tuesday"
          ),
          checked: res.packageDetails.tuesday,
        };
        let wednesday = {
          ...currentDaysSelected.find(
            (dayObj) => dayObj.long.toLowerCase() === "wednesday"
          ),
          checked: res.packageDetails.wednesday,
        };
        let thursday = {
          ...currentDaysSelected.find(
            (dayObj) => dayObj.long.toLowerCase() === "thursday"
          ),
          checked: res.packageDetails.thursday,
        };
        let friday = {
          ...currentDaysSelected.find(
            (dayObj) => dayObj.long.toLowerCase() === "friday"
          ),
          checked: res.packageDetails.friday,
        };
        let saturday = {
          ...currentDaysSelected.find(
            (dayObj) => dayObj.long.toLowerCase() === "saturday"
          ),
          checked: res.packageDetails.saturday,
        };
        let sunday = {
          ...currentDaysSelected.find(
            (dayObj) => dayObj.long.toLowerCase() === "sunday"
          ),
          checked: res.packageDetails.sunday,
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
      })
      .catch((error) => {
        setErrors([
          ...errors,
          `Retrieve day care package details failed. ${error.message}`,
        ]);
      });
  };

  const handleRejectPackage = () => {
    dayCarePackageRejectContents(dayCarePackageId)
      .then(() => {
        // history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };
  const handleRequestMoreInformation = () => {
    dayCarePackageContentsRequestClarification(
      dayCarePackageId,
      requestInformationText
    )
      .then(() => {
        setDisplayMoreInfoForm(false);
        // history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };
  const handleApprovePackageContents = () => {
    approveDayCarePackageContents(dayCarePackageId)
      .then(() => {
        // history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };
  return (
    <Layout headerTitle="DAY CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <DayCareApprovalTitle
          termTimeConsiderationOption={
            dayCarePackage?.packageDetails.termTimeConsiderationOptionName
          }
          isFixedPeriodOrOngoing={
            dayCarePackage?.packageDetails.isFixedPeriodOrOngoing
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
                      {getEnGBFormattedDate(
                        dayCarePackage?.packageDetails.startDate
                      )}
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
                      {dayCarePackage?.packageDetails.endDate !== null
                        ? getEnGBFormattedDate(
                            dayCarePackage?.packageDetails.endDate
                          )
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
            <div className="is-flex is-flex-wrap-wrap">
              <PackageCostBox
                boxClass="hackney-package-cost-light-yellow-box"
                title="COST OF CARE / WK"
                cost={`£${dayCarePackage?.costSummary.costOfCarePerWeek}`}
                costType="ESTIMATE"
              />

              <PackageCostBox
                boxClass="hackney-package-cost-light-yellow-box"
                title="ANP / WK"
                cost={`£${dayCarePackage?.costSummary.anpPerWeek}`}
                costType="ESTIMATE"
              />

              <PackageCostBox
                boxClass="hackney-package-cost-light-yellow-box"
                title="TRANSPORT / WK"
                cost={`£${dayCarePackage?.costSummary.transportCostPerWeek}`}
                costType="ESTIMATE"
              />

              <PackageCostBox
                boxClass="hackney-package-cost-yellow-box"
                title="TOTAL / WK"
                cost={`£${dayCarePackage?.costSummary.totalCostPerWeek}`}
                costType="ESTIMATE"
              />
            </div>
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
                needToAddress={dayCarePackage?.packageDetails.needToAddress}
                transportNeeded={dayCarePackage?.packageDetails.transportNeeded}
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
                  <button
                    className="button hackney-btn-light"
                    onClick={handleRejectPackage}
                  >
                    Deny
                  </button>
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
                  <button
                    className="button hackney-btn-green"
                    onClick={handleApprovePackageContents}
                  >
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
                <TextArea
                  label=""
                  rows={5}
                  placeholder="Add details..."
                  onChange={setRequestInformationText}
                />
                <button
                  className="button hackney-btn-green"
                  onClick={handleRequestMoreInformation}
                >
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
