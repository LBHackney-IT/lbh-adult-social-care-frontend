import ApprovalClientSummary from "../../components/ApprovalClientSummary";
import Layout from "../../Layout/Layout";
import React, { useEffect, useState } from "react";
import ResidentialCareApprovalTitle from "./components/ResidentialCareApprovalTitle";
import PackageCostBox from "../DayCare/components/PackageCostBox";
import PackageApprovalHistorySummary from "../../components/PackageApprovalHistorySummary";
import TitleHeader from "../../components/TitleHeader";
import ResidentialCareSummary from "./components/ResidentialCareSummary";
import TextArea from "../../components/TextArea";
import { useParams } from "react-router-dom";
import {
  getResidentialCarePackageApprovalPackageContent,
  getResidentialCarePackageApprovalHistory,
  residentialCareRequestClarification,
  residentialCareChangeStatus,
} from "../../../api/CarePackages/ResidentialCareApi";

const ResidentialCareApprovePackage = ({ history }) => {
  const params = useParams();
  let { residentialCarePackageId } = params;

  const [errors, setErrors] = useState([]);
  const [residentialCarePackage, setResidentialCarePackage] = useState(null);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState([]);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(
    undefined
  );
  useEffect(() => {
    retrieveResidentialCarePackageDetails(residentialCarePackageId);
    retrieveResidentialCareApprovalHistory(residentialCarePackageId);
  }, [history]);

  const retrieveResidentialCarePackageDetails = (residentialCarePackageId) => {
    getResidentialCarePackageApprovalPackageContent(residentialCarePackageId)
      .then((res) => {
        setResidentialCarePackage(res);

        const newAdditionalNeedsEntries = res.residentialCarePackage.residentialCareAdditionalNeeds.map(
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
          `Retrieve residential care package details failed. ${error.message}`,
        ]);
      });
  };

  const retrieveResidentialCareApprovalHistory = (residentialCarePackageId) => {
    getResidentialCarePackageApprovalHistory(residentialCarePackageId)
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
          `Retrieve residential care approval history failed. ${error.message}`,
        ]);
      });
  };

  const handleRejectPackage = () => {
    residentialCareChangeStatus(residentialCarePackageId, 10)
      .then(() => {
        // history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    residentialCareChangeStatus(residentialCarePackageId, 8)
      .then(() => {
        // history.push(`${CARE_PACKAGE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    residentialCareRequestClarification(
      residentialCarePackageId,
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
  
  return (
    <Layout headerTitle="RESIDENTIAL CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <ResidentialCareApprovalTitle />
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
                        residentialCarePackage?.residentialCarePackage.startDate
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
                      {residentialCarePackage?.residentialCarePackage.endDate !== null
                        ? residentialCarePackage?.residentialCarePackage.endDate
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
              cost={`£${residentialCarePackage?.costOfCare}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-yellow-box"
              title="ANP / WK"
              cost={`£${residentialCarePackage?.costOfAdditionalNeeds}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-yellow-box"
              title="ONE OFF COSTS"
              cost={`£${residentialCarePackage?.CostOfOneOff}`}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-yellow-box"
              title="TOTAL / WK"
              cost={`£${residentialCarePackage?.totalPerWeek}`}
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
              <ResidentialCareSummary
                startDate={residentialCarePackage?.residentialCarePackage.startDate}
                endDate={residentialCarePackage?.residentialCarePackage.endDate !== null
                  ? residentialCarePackage?.residentialCarePackage.endDate
                  : "Ongoing"}
                typeOfStayText={residentialCarePackage?.residentialCarePackage.TypeOfStayOptionName}
                additionalNeedsEntries={additionalNeedsEntries}
                setAdditionalNeedsEntries={setAdditionalNeedsEntries}
                needToAddress={residentialCarePackage?.residentialCarePackage.needToAddress}
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
      </div>
    </Layout>
  );
};

export default ResidentialCareApprovePackage;
