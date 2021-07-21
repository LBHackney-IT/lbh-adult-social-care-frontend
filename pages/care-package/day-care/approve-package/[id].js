import Layout from "../../../../components/Layout/Layout";
import React, { useState } from "react";
import DayCareApprovalTitle from "../../../../components/DayCare/DayCareApprovalTitle";
import ApprovalClientSummary from "../../../../components/ApprovalClientSummary";
import PackageCostBox from "../../../../components/DayCare/PackageCostBox";
import DayCarePackageBreakdown from "../../../../components/DayCare/DayCarePackageBreakdown";
import DayCarePackageElementCostings from "../../../../components/DayCare/DayCarePackageElementCostings";
import PackageApprovalHistorySummary from "../../../../components/PackageApprovalHistorySummary";
import TitleHeader from "../../../../components/TitleHeader";
import DayCareSummary from "../../../../components/DayCare/DayCareSummary";
import TextArea from "../../../../components/TextArea";
import {
  approveDayCarePackageContents,
  dayCarePackageContentsRequestClarification,
  dayCarePackageRejectContents,
  getDayCarePackageApprovalDetails,
} from "../../../../api/CarePackages/DayCareApi";
import { useRouter } from "next/router"
import { getSelectedDate } from "../../../../api/Utils/CommonOptions";
import { getEnGBFormattedDate } from "../../../../api/Utils/FuncUtils";
import { getErrorResponse } from "../../../../service/helpers";
import fieldValidator from "../../../../service/inputValidator";
import useSWR from 'swr';

// start before render
const serverDayCareApprovePackage = async (dayCarePackageId) => {
  const data = {
    errorData: [],
  };
  try {
    const dayCarePackage = await getDayCarePackageApprovalDetails(dayCarePackageId);
    data.dayCarePackage = dayCarePackage;

    // Update approve-package state
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

    data.approvalHistoryEntries([...newApprovalHistoryItems]);
    data.opportunityEntries([...newOpportunityEntries]);

    // Set days selected

    data.daysSelected = getSelectedDate(dayCarePackage)
  } catch(error) {
    data.errorData.push(`Retrieve day care package details failed. ${error.message}`);
  }

  return data;
}

const DayCareApprovePackage = () => {
  // Parameters
  const router = useRouter();
  const dayCarePackageId = router.query.id;
  const { data } = useSWR(dayCarePackageId, serverDayCareApprovePackage);

  let opportunityEntries,
    daysSelected,
    approvalHistoryEntries,
    dayCarePackage,
    errorData;

  if(data) {
    approvalHistoryEntries = data.approvalHistoryEntries;
    opportunityEntries = data.opportunityEntries;
    daysSelected = data.daysSelected;
    dayCarePackage = data.dayCarePackage;
    errorData = data.errorData;
  }

  const [errors, setErrors] = useState([]);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(
    undefined
  );

  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    })
  };

  const updateErrorFields = (errors) => {
    setErrorFields({
      ...errorFields,
      ...getErrorResponse(errors)
    });
  }

  const handleRejectPackage = () => {
    dayCarePackageRejectContents(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };
  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([{name: 'requestInformationText', value: requestInformationText, rules: ['empty']}]);
    if(hasErrors) {
      setErrorFields(validFields);
      return;
    }
    dayCarePackageContentsRequestClarification(
      dayCarePackageId,
      requestInformationText
    )
      .then(() => {
        setDisplayMoreInfoForm(false);
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        updateErrorFields(error)
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };
  const handleApprovePackageContents = () => {
    approveDayCarePackageContents(dayCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        updateErrorFields(error)
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
                title="COST OF CARE / WK"
                cost={dayCarePackage?.costSummary.costOfCarePerWeek}
                costType="ESTIMATE"
              />

              <PackageCostBox
                title="ANP / WK"
                cost={dayCarePackage?.costSummary.anpPerWeek}
                costType="ESTIMATE"
              />

              <PackageCostBox
                title="TRANSPORT / WK"
                cost={dayCarePackage?.costSummary.transportCostPerWeek}
                costType="ESTIMATE"
              />

              <PackageCostBox
                title="TOTAL / WK"
                cost={dayCarePackage?.costSummary.totalCostPerWeek}
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
                  error={errorFields.requestInformationText}
                  setError={() => changeErrorFields('requestInformationText')}
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
