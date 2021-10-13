import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HASC_TOKEN_ID } from 'api/BaseApi';
import {
  getNursingCarePackageApprovalHistory,
  getNursingCarePackageApprovalPackageContent,
  nursingCareApprovePackageContent,
  nursingCareChangeStatus,
  nursingCareRequestClarification,
} from 'api/CarePackages/NursingCareApi';
import { getEnGBFormattedDate, stringIsNullOrEmpty } from 'api/Utils/FuncUtils';
import PackageCostBox from 'components/DayCare/PackageCostBox';
import Layout from 'components/Layout/Layout';
import NursingCareSummary from 'components/NursingCare/NursingCareSummary';
import PackageApprovalHistorySummary from 'components/PackageApprovalHistorySummary';
import TitleHeader from 'components/TitleHeader';
import withSession from 'lib/session';
import { addNotification } from 'reducers/notificationsReducer';
import { APPROVER_HUB_ROUTE } from 'routes/RouteConstants';
import { getErrorResponse, getUserSession } from 'service/helpers';
import ClientSummaryItem from 'components/CarePackages/ClientSummaryItem';
import formValidator from 'service/formValidator';
import RequestMoreInformation from 'components/Approver/RequestMoreInformation';

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
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const nursingCarePackageId = router.query.id;
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
  const [requestInformationText, setRequestInformationText] = useState(undefined);
  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });

  const changeErrorFields = (field) => {
    setErrorFields({
      ...errorFields,
      [field]: '',
    });
  };

  const updateErrorFields = (errors, field) => {
    const newErrors = field ? {[field]: errors} : getErrorResponse(errors);
    setErrorFields({
      ...errorFields,
      ...newErrors,
    });
  };

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
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const handleApprovePackageContents = () => {
    nursingCareApprovePackageContent(nursingCarePackageId)
      .then(() => {
        pushNotification(`Package contents approved successfully`,'success');
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = formValidator({ form: { requestInformationText } });
    setErrorFields(validFields);

    if(hasErrors) return;

    nursingCareRequestClarification(nursingCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };

  const datePeriod = {
    startDate: getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.startDate, 'No Date'),
    endDate:
      nursingCarePackage?.nursingCarePackage.endDate !== null
      ? getEnGBFormattedDate(nursingCarePackage?.nursingCarePackage.endDate, 'No Date')
      : 'Ongoing'
  };

  return (
    <Layout
      clientSummaryInfo={{
        whoIsSourcing: 'hackney',
        client: 'James Stephens',
        hackneyId: '#786288',
        title: `Nursing Care (${datePeriod.startDate} - ${datePeriod.endDate})`,
        age: '91',
        dateOfBirth: '09/12/1972',
        postcode: 'E9 6EY',
      }}
      headerTitle="NURSING CARE APPROVAL">
      <div className="hackney-text-black font-size-12px">
        <div className="client-summary mt-5 mb-5">
          <ClientSummaryItem itemName="STARTS" itemDetail={datePeriod.startDate} />
          <ClientSummaryItem itemName="ENDS" itemDetail={datePeriod.endDate} />
          <ClientSummaryItem itemName="DAYS/WEEK" itemDetail="3" />
          <ClientSummaryItem itemName="RESPITE CARE" itemDetail={hasRespiteCare === true ? 'yes' : 'no'} />
          <ClientSummaryItem itemName="DISCHARGE PACKAGE" itemDetail={hasDischargePackage === true ? 'yes' : 'no'} />
          <ClientSummaryItem
            itemName="IMMEDIATE / RE-ENABLEMENT PACKAGE"
            itemDetail={isThisAnImmediateService === true ? 'Immediate' : 'Re-enablement'}
          />
          <ClientSummaryItem itemName="S117 CLIENT" itemDetail={isThisUserUnderS117 === true ? 'yes' : 'no'} />
          <ClientSummaryItem
            itemName="TYPE OF STAY"
            itemDetail={!stringIsNullOrEmpty(typeOfStayOptionName) ? typeOfStayOptionName : ''}
          />
        </div>

        <div className='package-cost-box__group'>
          <PackageCostBox className='mb-5' title="COST OF CARE / WK" cost={nursingCarePackage?.costOfCare} costType="ESTIMATE" />
          <PackageCostBox className='mb-5' title="ANP / WK" cost={nursingCarePackage?.costOfAdditionalNeeds} costType="ESTIMATE" />
          <PackageCostBox className='mb-5'
            boxClass="hackney-package-cost-yellow-box"
            title="ONE OFF COSTS"
            cost={nursingCarePackage?.costOfOneOff}
            costType="ESTIMATE"
          />
          <PackageCostBox className='mb-5'
            boxClass="hackney-package-cost-yellow-box"
            title="TOTAL / WK"
            cost={nursingCarePackage?.totalPerWeek}
            costType="ESTIMATE"
          />
        </div>

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <NursingCareSummary
                startDate={nursingCarePackage?.nursingCarePackage.startDate}
                endDate={datePeriod.endDate}
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
        <RequestMoreInformation
          requestMoreInformationText={requestInformationText}
          setRequestInformationText={setRequestInformationText}
          errorFields={errorFields}
          changeErrorFields={changeErrorFields}
          handleRequestMoreInformation={handleRequestMoreInformation}
        />
      </div>
    </Layout>
  );
};

export default NursingCareApprovePackage;
