import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HASC_TOKEN_ID } from '../../../../api/BaseApi';
import {
  getNursingCarePackageApprovalHistory,
  getNursingCarePackageApproveCommercial,
  nursingCareApproveCommercials,
  nursingCareChangeStatus,
  nursingCareClarifyCommercial,
} from '../../../../api/CarePackages/NursingCareApi';
import { getEnGBFormattedDate, stringIsNullOrEmpty } from '../../../../api/Utils/FuncUtils';
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
import { APPROVER_HUB_ROUTE } from '../../../../routes/RouteConstants';
import { getUserSession } from '../../../../service/helpers';
import ClientSummaryItem from '../../../../components/CarePackages/ClientSummaryItem';

export const getServerSideProps = withSession(async ({ req, res, query: { id: nursingCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const data = {
    errorData: [],
  };

  try {
    const nursingCarePackage = await getNursingCarePackageApproveCommercial(
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

    data.nursingCarePackage = nursingCarePackage;
    data.additionalNeedsEntriesData = newAdditionalNeedsEntries.slice();
  } catch (error) {
    data.errorData.push(`Retrieve nursing care package details failed. ${error.message}`);
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

const NursingCareApproveBrokered = ({ nursingCarePackage, additionalNeedsEntriesData, approvalHistoryEntries }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nursingCarePackageId = router.query.id;
  const [errors, setErrors] = useState([]);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(undefined);

  const {
    hasDischargePackage = false,
    hasRespiteCare = false,
    isThisAnImmediateService = false,
    isThisUserUnderS117 = false,
    typeOfStayOptionName = '',
  } = nursingCarePackage?.nursingCarePackage || {};

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleRejectPackage = () => {
    nursingCareChangeStatus(nursingCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
        pushNotification('Status change success.','success');
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    nursingCareApproveCommercials(nursingCarePackageId)
      .then(() => {
        pushNotification('Status change success.','success');
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    nursingCareClarifyCommercial(nursingCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  return (
    <Layout headerTitle="NURSING CARE BROKERED">
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
          <ClientSummaryItem
            itemName="STARTS"
            itemDetail={getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.startDate)}
          />
          <ClientSummaryItem
            itemName="ENDS"
            itemDetail={
              nursingCarePackage?.nursingCarePackage.endDate !== null
                ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.endDate)
                : 'Ongoing'
            }
          />
          <ClientSummaryItem itemName="DAYS/WEEK" itemDetail="3" />
          <ClientSummaryItem itemName="RESPITE CARE" itemDetail={hasRespiteCare === true ? 'yes' : 'no'} />
          <ClientSummaryItem itemName="DISCHARGE PACKAGE" itemDetail={hasDischargePackage === true ? 'yes' : 'no'} />
        </div>

        <div className="columns mt-4 flex flex-wrap">
          <ClientSummaryItem
            itemName="IMMEDIATE / RE-ENABLEMENT PACKAGE"
            itemDetail={isThisAnImmediateService === true ? 'Immediate' : 'Re-enablement'}
          />
          <ClientSummaryItem itemName="S117 CLIENT" itemDetail={isThisUserUnderS117 === true ? 'yes' : 'no'} />
          <ClientSummaryItem
            itemName="TYPE OF STAY"
            itemDetail={!stringIsNullOrEmpty(typeOfStayOptionName) ? typeOfStayOptionName : ''}
          />
          <div className="column" />
          <div className="column" />
        </div>

        <div className="columns">
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-green-box"
              title="COST OF CARE / WK"
              cost={nursingCarePackage?.costOfCare}
              costType="ACTUAL"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-green-box"
              title="ANP / WK"
              cost={nursingCarePackage?.costOfAdditionalNeeds}
              costType="ACTUAL"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-green-box"
              title="TOTAL / WK"
              cost={nursingCarePackage?.totalPerWeek}
              costType="ACTUAL"
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
                    type="button"
                    onClick={() => setDisplayMoreInfoForm(!displayMoreInfoForm)}
                    className="button hackney-btn-light"
                  >
                    {displayMoreInfoForm ? 'Hide Request more information' : 'Request More Information'}
                  </button>
                </div>
                <div className="level-item  mr-2">
                  <button type="button" className="button hackney-btn-green" onClick={handleApprovePackageCommercials}>
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
                <p className="font-size-16px font-weight-bold">Request more information</p>
                <TextArea label="" rows={5} placeholder="Add details..." onChange={setRequestInformationText} />
                <button type="button" className="button hackney-btn-green" onClick={handleRequestMoreInformation}>
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
