import React, { useEffect, useState } from "react";
import NursingCareApprovalTitle from "../../../../components/NursingCare/NursingCareApprovalTitle";
import ApprovalClientSummary from "../../../../components/ApprovalClientSummary";
import Layout from "../../../../components/Layout/Layout";
import PackageCostBox from "../../../../components/DayCare/PackageCostBox";
import PackageApprovalHistorySummary from "../../../../components/PackageApprovalHistorySummary";
import TitleHeader from "../../../../components/TitleHeader";
import NursingCareSummary from "../../../../components/NursingCare/NursingCareSummary";
import TextArea from "../../../../components/TextArea";
import { useRouter } from "next/router";
import {
  getNursingCarePackageApproveCommercial,
  getNursingCarePackageApprovalHistory,
  nursingCareRequestClarification,
  nursingCareChangeStatus,
} from "../../../../api/CarePackages/NursingCareApi";

const NursingCareApproveBrokered = ({ history }) => {
  const router = useRouter();
  let { nursingCarePackageId } = router.query;

  const [errors, setErrors] = useState([]);
  const [nursingCarePackage, setNursingCarePackage] = useState(null);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(
    undefined
  );
  useEffect(() => {
    retrieveNursingCarePackageDetails(nursingCarePackageId);
    retrieveNursingCareApprovalHistory(nursingCarePackageId);
  }, [history]);

  const retrieveNursingCarePackageDetails = (nursingCarePackageId) => {
    getNursingCarePackageApproveCommercial(nursingCarePackageId)
      .then((res) => {
        setNursingCarePackage(res);

        const newAdditionalNeedsEntries = res.nursingCarePackage.nursingCareAdditionalNeeds.map(
          (additionalneedsItem) => ({
            id: additionalneedsItem.Id,
            isWeeklyCost: additionalneedsItem.IsWeeklyCost,
            isOneOffCost: additionalneedsItem.IsOneOffCost,
            needToAddress: additionalneedsItem.NeedToAddress,
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
            eventDate: new Date(historyItem.ApprovedDate).toLocaleDateString(
              "en-GB"
            ),
            eventMessage: historyItem.LogText,
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

  const handleRejectPackage = () => {
    nursingCareChangeStatus(nursingCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    nursingCareChangeStatus(nursingCarePackageId, 8)
      .then(() => {
        // router.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    nursingCareRequestClarification(
      nursingCarePackageId,
      requestInformationText
    )
      .then(() => {
        setDisplayMoreInfoForm(false);
        // router.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };


  return (
    <Layout headerTitle="NURSING CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <NursingCareApprovalTitle
        startDate={nursingCarePackage?.nursingCarePackage.startDate}
        endDate={nursingCarePackage?.nursingCarePackage.endDate !== null
          ? nursingCarePackage?.nursingCarePackage.endDate
          : "Ongoing"}
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
                        nursingCarePackage?.nursingCarePackage.startDate
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
                      {nursingCarePackage?.nursingCarePackage.endDate !== null
                        ? nursingCarePackage?.nursingCarePackage.endDate
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
              boxClass="hackney-package-cost-light-green-box"
              title="COST OF CARE / WK"
              cost={`£${nursingCarePackage?.costOfCare}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-green-box"
              title="ANP / WK"
              cost={`£${nursingCarePackage?.costOfAdditionalNeeds}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-green-box"
              title="TOTAL / WK"
              cost={`£${nursingCarePackage?.totalPerWeek}`}
              costType="ESTIMATE"
            />
          </div>
        </div>

        <PackageApprovalHistorySummary
          approvalHistoryEntries={approvalHistoryEntries}
        />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <NursingCareSummary
                startDate={nursingCarePackage?.nursingCarePackage.startDate}
                endDate={nursingCarePackage?.nursingCarePackage.endDate !== null
                  ? nursingCarePackage?.nursingCarePackage.endDate
                  : "Ongoing"}
                additionalNeedsEntries={additionalNeedsEntries}
                setAdditionalNeedsEntries={setAdditionalNeedsEntries}
                needToAddress={nursingCarePackage?.nursingCarePackage.needToAddress}
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
                    onClick={handleApprovePackageCommercials}
                  >
                    Approve Commercials
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

export default NursingCareApproveBrokered;
