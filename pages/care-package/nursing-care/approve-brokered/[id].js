import React, { useState } from "react";
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
  nursingCareClarifyCommercial,
  nursingCareChangeStatus,
  nursingCareApproveCommercials
} from "../../../../api/CarePackages/NursingCareApi";
import useSWR from 'swr';
import { addNotification } from '../../../../reducers/notificationsReducer'
import { useDispatch } from 'react-redux'

const getNursingCareApproveBrokered = async (nursingCarePackageId) => {
  const data = {
    errorData: [],
  };

  try {
    const nursingCarePackage = await getNursingCarePackageApproveCommercial(nursingCarePackageId);
    const newAdditionalNeedsEntries = nursingCarePackage.nursingCarePackage.nursingCareAdditionalNeeds.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );

    data.nursingCarePackage = nursingCarePackage;
    data.additionalNeedsEntriesData = newAdditionalNeedsEntries.slice();

  } catch(error) {
    data.errorData.push(`Retrieve nursing care package details failed. ${error.message}`);
  }

  try {
    const res = await getNursingCarePackageApprovalHistory(nursingCarePackageId);
    const newApprovalHistoryItems = res.map(
      (historyItem) => ({
        eventDate: new Date(historyItem.approvedDate).toLocaleDateString(
          "en-GB"
        ),
        eventMessage: historyItem.logText,
        eventSubMessage: undefined
      })
    );

    data.approvalHistoryEntries = newApprovalHistoryItems.slice();

  } catch(error) {
    data.errorData.push(`Retrieve nursing care approval history failed. ${error.message}`);
  }

  return data;
}

const NursingCareApproveBrokered = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nursingCarePackageId = router.query.id;
  const { data } = useSWR(nursingCarePackageId, getNursingCareApproveBrokered);

  let nursingCarePackage;
  let additionalNeedsEntriesData;
  let approvalHistoryEntries;

  if(data) {
    approvalHistoryEntries = data.approvalHistoryEntries;
    additionalNeedsEntriesData = data.additionalNeedsEntriesData;
    nursingCarePackage = data.nursingCarePackage;
  }

  const [errors, setErrors] = useState([]);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(
    undefined
  );

  const handleRejectPackage = () => {
    nursingCareChangeStatus(nursingCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
        dispatch(addNotification({ text: 'Status change success.', className: 'success' }));
      })
      .catch((error) => {
        dispatch(addNotification({ text: `Status change failed. ${error.message}` }));
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    nursingCareApproveCommercials(nursingCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
        dispatch(addNotification({ text: 'Status change success.', className: 'success' }));
      })
      .catch((error) => {
        dispatch(addNotification({ text: `Status change failed. ${error.message}` }));
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    nursingCareClarifyCommercial(nursingCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        dispatch(addNotification({ text: `Status change failed. ${error.message}`}));
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  return (
    <Layout headerTitle="NURSING CARE BROKERED">
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
              cost={nursingCarePackage?.costOfCare}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-green-box"
              title="ANP / WK"
              cost={nursingCarePackage?.costOfAdditionalNeeds}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-green-box"
              title="TOTAL / WK"
              cost={nursingCarePackage?.totalPerWeek}
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
