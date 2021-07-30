import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HASC_TOKEN_ID } from '../../../../api/BaseApi';
import {
  getNursingCarePackageApprovalHistory,
  getNursingCarePackageApprovalPackageContent,
  nursingCareApprovePackageContent,
  nursingCareChangeStatus,
  nursingCareRequestClarification,
} from '../../../../api/CarePackages/NursingCareApi';
import { getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils';
import ApprovalClientSummary from '../../../../components/ApprovalClientSummary';
import PackageCostBox from '../../../../components/DayCare/PackageCostBox';
import Layout from '../../../../components/Layout/Layout';
import NursingCareApprovalTitle from '../../../../components/NursingCare/NursingCareApprovalTitle';
import NursingCareSummary from '../../../../components/NursingCare/NursingCareSummary';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import TextArea from '../../../../components/TextArea';
import TitleHeader from '../../../../components/TitleHeader';
import withSession from '../../../../lib/session';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { CARE_PACKAGE_ROUTE } from '../../../../routes/RouteConstants';
import { getUserSession } from '../../../../service/helpers';

// start before render
export const getServerSideProps = withSession(async ({ req, res, query: { id: nursingCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const data = {
    errorData: [],
  };

  try {
    const nursingCarePackage = await getNursingCarePackageApprovalPackageContent(
      nursingCarePackageId,
      req.cookies[HASC_TOKEN_ID]
    );
    const newAdditionalNeedsEntries = nursingCarePackage.nursingCarePackage.nursingCareAdditionalNeeds.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );

    data.additionalNeedsEntriesData = newAdditionalNeedsEntries.slice();
    data.nursingCarePackage = nursingCarePackage;
  } catch (error) {
    data.errorData.push(`Retrieve nursing care package details failed. ${error}`);
  }

  try {
    const result = await getNursingCarePackageApprovalHistory(nursingCarePackageId, req.cookies[HASC_TOKEN_ID]);
    const newApprovalHistoryItems = result.map((historyItem) => ({
      eventDate: new Date(historyItem.approvedDate).toLocaleDateString('en-GB'),
      eventMessage: historyItem.logText,
      eventSubMessage: historyItem.logSubText,
    }));

    data.approvalHistoryEntries = newApprovalHistoryItems.slice();
  } catch (error) {
    data.errorData.push(`Retrieve nursing care approval history failed. ${error.message}`);
  }

  return { props: { ...data } };
});

const NursingCareApprovePackage = ({
  nursingCarePackage,
  approvalHistoryEntries,
  additionalNeedsEntriesData,
  errorData,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nursingCarePackageId = router.query.id;
  const [errors, setErrors] = useState(errorData);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(undefined);

  const handleRejectPackage = () => {
    nursingCareChangeStatus(nursingCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleApprovePackageContents = () => {
    nursingCareApprovePackageContent(nursingCarePackageId)
      .then(() => {
        dispatch(addNotification({ text: `Package contents approved successfully`, className: 'success' }));
        router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        dispatch(addNotification({ text: `Status change failed. ${error.message}` }));
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    nursingCareRequestClarification(nursingCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        // router.push(`${CARE_PACKAGE_ROUTE}`);
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
          endDate={
            nursingCarePackage?.nursingCarePackage.endDate !== null
              ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.endDate)
              : 'Ongoing'
          }
        />
        <ApprovalClientSummary />

        <div className="columns">
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">STARTS</p>
                    <p className="font-size-14px">
                      {getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.startDate)}
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
                        ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.endDate)
                        : 'Ongoing'}
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
                    <p className="font-weight-bold hackney-text-green">DAYS/WEEK</p>
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
            <PackageCostBox title="COST OF CARE / WK" cost={nursingCarePackage?.costOfCare} costType="ESTIMATE" />
          </div>
          <div className="column">
            <PackageCostBox title="ANP / WK" cost={nursingCarePackage?.costOfAdditionalNeeds} costType="ESTIMATE" />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-yellow-box"
              title="ONE OFF COSTS"
              cost={nursingCarePackage?.costOfOneOff}
              costType="ESTIMATE"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-yellow-box"
              title="TOTAL / WK"
              cost={nursingCarePackage?.totalPerWeek}
              costType="ESTIMATE"
            />
          </div>
        </div>

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <NursingCareSummary
                startDate={nursingCarePackage?.nursingCarePackage.startDate}
                endDate={
                  nursingCarePackage?.nursingCarePackage.endDate !== null
                    ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.endDate)
                    : 'Ongoing'
                }
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
                  <button type="button" className="button hackney-btn-light" onClick={handleRejectPackage}>
                    Deny
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button
                    onClick={() => setDisplayMoreInfoForm(!displayMoreInfoForm)}
                    className="button hackney-btn-light"
                    type="button"
                  >
                    {displayMoreInfoForm ? 'Hide Request more information' : 'Request More Information'}
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button type="button" className="button hackney-btn-green" onClick={handleApprovePackageContents}>
                    Approve to be brokered
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="mt-1">
              <p className="font-size-16px font-weight-bold">Request more information</p>
              <TextArea label="" rows={5} placeholder="Add details..." onChange={setRequestInformationText} />
              <button type="button" className="button hackney-btn-green" onClick={handleRequestMoreInformation}>
                Request more information
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NursingCareApprovePackage;
