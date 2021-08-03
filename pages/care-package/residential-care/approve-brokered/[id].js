import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { HASC_TOKEN_ID } from '../../../../api/BaseApi';
import {
  getResidentialCarePackageApprovalHistory,
  getResidentialCarePackageApproveBrokered,
  residentialCareApproveCommercials,
  residentialCareChangeStatus,
  residentialCareClarifyCommercial,
} from '../../../../api/CarePackages/ResidentialCareApi';
import { getEnGBFormattedDate, stringIsNullOrEmpty } from '../../../../api/Utils/FuncUtils';
import ApprovalClientSummary from '../../../../components/ApprovalClientSummary';
import PackageCostBox from '../../../../components/DayCare/PackageCostBox';
import Layout from '../../../../components/Layout/Layout';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import ResidentialCareApprovalTitle from '../../../../components/ResidentialCare/ResidentialCareApprovalTitle';
import ResidentialCareSummary from '../../../../components/ResidentialCare/ResidentialCareSummary';
import TextArea from '../../../../components/TextArea';
import TitleHeader from '../../../../components/TitleHeader';
import withSession from '../../../../lib/session';
import { getUserSession } from '../../../../service/helpers';
import { APPROVER_HUB_ROUTE } from '../../../../routes/RouteConstants';
import ClientSummaryItem from '../../../../components/CarePackages/ClientSummaryItem';

// start before render
export const getServerSideProps = withSession(async ({ req, res, query: { id: residentialCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const data = {
    errorData: [],
  };

  try {
    const result = await getResidentialCarePackageApprovalHistory(residentialCarePackageId, req.cookies[HASC_TOKEN_ID]);
    const newApprovalHistoryItems = result.map((historyItem) => ({
      eventDate: new Date(historyItem.approvedDate).toLocaleDateString('en-GB'),
      eventMessage: historyItem.logText,
      eventSubMessage: historyItem.logSubText,
    }));

    data.approvalHistoryEntries = newApprovalHistoryItems.slice();
  } catch (error) {
    data.errorData.push(`Retrieve residential care approval history failed. ${error}`);
  }

  try {
    const residentialCarePackage = await getResidentialCarePackageApproveBrokered(
      residentialCarePackageId,
      req.cookies[HASC_TOKEN_ID]
    );
    const newAdditionalNeedsEntries = residentialCarePackage.residentialCarePackage.residentialCareAdditionalNeeds.map(
      (additionalneedsItem) => ({
        id: additionalneedsItem.id,
        isWeeklyCost: additionalneedsItem.isWeeklyCost,
        isOneOffCost: additionalneedsItem.isOneOffCost,
        needToAddress: additionalneedsItem.needToAddress,
      })
    );

    data.additionalNeedsEntriesData = newAdditionalNeedsEntries.slice();
    data.residentialCarePackage = residentialCarePackage;
  } catch (error) {
    data.errorData.push(`Retrieve residential care package details failed. ${error}`);
  }

  return { props: { ...data } };
});

const ResidentialCareApproveBrokered = ({
  residentialCarePackage,
  approvalHistoryEntries,
  additionalNeedsEntriesData,
  errorData,
}) => {
  const router = useRouter();
  const residentialCarePackageId = router.query.id;

  const [errors, setErrors] = useState(errorData);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(undefined);

  const {
    hasDischargePackage = false,
    hasRespiteCare = false,
    isThisAnImmediateService = false,
    isThisUserUnderS117 = false,
    typeOfStayOptionName = '',
  } = residentialCarePackage?.residentialCarePackage;

  const handleRejectPackage = () => {
    residentialCareChangeStatus(residentialCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error}`);
        setErrors([...errors, `Status change failed. ${error}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    residentialCareApproveCommercials(residentialCarePackageId)
      .then(() => {
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error}`);
        setErrors([...errors, `Status change failed. ${error}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    residentialCareClarifyCommercial(residentialCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error}`);
        setErrors([...errors, `Status change failed. ${error}`]);
      });
  };

  return (
    <Layout headerTitle="RESIDENTIAL CARE BROKERED">
      <div className="hackney-text-black font-size-12px">
        <ResidentialCareApprovalTitle
          startDate={residentialCarePackage?.residentialCarePackage.startDate}
          endDate={
            residentialCarePackage?.residentialCarePackage.endDate !== null
              ? getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage.endDate)
              : 'Ongoing'
          }
        />
        <ApprovalClientSummary />
        <div className="columns">
          <ClientSummaryItem
            itemName="STARTS"
            itemDetail={getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage.startDate)}
          />
          <ClientSummaryItem
            itemName="ENDS"
            itemDetail={
              residentialCarePackage?.residentialCarePackage.endDate !== null
                ? getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage.endDate)
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
            <PackageCostBox title="COST OF CARE / WK" cost={residentialCarePackage?.costOfCare} costType="ACTUAL" />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-light-green-box"
              title="ANP / WK"
              cost={residentialCarePackage?.costOfAdditionalNeeds}
              costType="ACTUAL"
            />
          </div>
          <div className="column">
            <PackageCostBox
              boxClass="hackney-package-cost-green-box"
              title="TOTAL / WK"
              cost={residentialCarePackage?.totalPerWeek}
              costType="ACTUAL"
            />
          </div>
        </div>

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <ResidentialCareSummary
                startDate={residentialCarePackage?.residentialCarePackage.startDate}
                endDate={
                  residentialCarePackage?.residentialCarePackage.endDate !== null
                    ? getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage.endDate)
                    : 'Ongoing'
                }
                typeOfStayText={residentialCarePackage?.residentialCarePackage.typeOfStayOptionName}
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
                  <button type="button" className="button hackney-btn-green" onClick={handleApprovePackageCommercials}>
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

export default ResidentialCareApproveBrokered;
