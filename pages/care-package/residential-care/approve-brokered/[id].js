import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils';
import ResidentialCareApprovalTitle from '../../../../components/ResidentialCare/ResidentialCareApprovalTitle';
import ApprovalClientSummary from '../../../../components/ApprovalClientSummary';
import Layout from '../../../../components/Layout/Layout';
import PackageCostBox from '../../../../components/DayCare/PackageCostBox';
import PackageApprovalHistorySummary from '../../../../components/PackageApprovalHistorySummary';
import TitleHeader from '../../../../components/TitleHeader';
import ResidentialCareSummary from '../../../../components/ResidentialCare/ResidentialCareSummary';
import TextArea from '../../../../components/TextArea';
import {
  getResidentialCarePackageApproveBrokered,
  getResidentialCarePackageApprovalHistory,
  residentialCareClarifyCommercial,
  residentialCareChangeStatus,
  residentialCareApproveCommercials
} from '../../../../api/CarePackages/ResidentialCareApi';
import withSession from '../../../../lib/session';
import { getUserSession } from '../../../../service/helpers';

// start before render
export const getServerSideProps = withSession(async ({ req, res: response, query: { id: residentialCarePackageId } }) => {
  getUserSession({ req, res: response });

  const data = {
    errorData: [],
  };

  try {
    const res = await getResidentialCarePackageApprovalHistory(residentialCarePackageId);
    const newApprovalHistoryItems = res.map((historyItem) => ({
      eventDate: new Date(historyItem.approvedDate).toLocaleDateString('en-GB'),
      eventMessage: historyItem.logText,
      eventSubMessage: undefined,
    }));

    data.approvalHistoryEntries = newApprovalHistoryItems.slice();
  } catch (error) {
    data.errorData.push(`Retrieve residential care approval history failed. ${error.message}`);
  }

  try {
    const residentialCarePackage = await getResidentialCarePackageApproveBrokered(residentialCarePackageId);

    const newAdditionalNeedsEntries = residentialCarePackage.residentialCareAdditionalNeeds.map(
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
    data.errorData.push(`Retrieve residential care package details failed. ${error.message}`);
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

  const handleRejectPackage = () => {
    residentialCareChangeStatus(residentialCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    residentialCareApproveCommercials(residentialCarePackageId)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        alert(`Status change failed. ${error.message}`);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    residentialCareClarifyCommercial(residentialCarePackageId, requestInformationText)
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
          <div className="column">
            <div className="level">
              <div className="level-left">
                <div className="level-item">
                  <div>
                    <p className="font-weight-bold hackney-text-green">STARTS</p>
                    <p className="font-size-14px">
                      {getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage.startDate)}
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
                        ? getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage.endDate)
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
                  <button className="button hackney-btn-light" onClick={handleRejectPackage} type="button">
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
                  <button className="button hackney-btn-green" onClick={handleApprovePackageCommercials} type="button">
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
              <button className="button hackney-btn-green" onClick={handleRequestMoreInformation} type="button">
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
