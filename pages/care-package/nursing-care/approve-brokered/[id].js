import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HASC_TOKEN_ID } from 'api/BaseApi';
import {
  getNursingCarePackageApprovalHistory,
  getNursingCarePackageApproveCommercial,
  nursingCareApproveCommercials,
  nursingCareChangeStatus,
  nursingCareClarifyCommercial,
} from 'api/CarePackages/NursingCareApi';
import { stringIsNullOrEmpty } from 'api/Utils/FuncUtils';
import PackageCostBox from 'components/DayCare/PackageCostBox';
import Layout from 'components/Layout/Layout';
import NursingCareSummary from 'components/NursingCare/NursingCareSummary';
import PackageApprovalHistorySummary from 'components/PackageApprovalHistorySummary';
import TitleHeader from 'components/TitleHeader';
import withSession from 'lib/session';
import { addNotification } from 'reducers/notificationsReducer';
import { APPROVER_HUB_ROUTE } from 'routes/RouteConstants';
import { formatCareDatePeriod, getErrorResponse, getUserSession } from 'service/helpers';
import ClientSummaryItem from 'components/CarePackages/ClientSummaryItem';
import { Button } from 'components/Button';
import RequestMoreInformation from 'components/Approver/RequestMoreInformation';
import { mapCareAdditionalNeedsEntries } from 'api/Mappers/CarePackageMapper';
import fieldValidator from 'service/inputValidator';

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
    const newAdditionalNeedsEntries =
      mapCareAdditionalNeedsEntries(nursingCarePackage?.nursingCarePackage?.nursingCareAdditionalNeeds);

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
  const [errorFields, setErrorFields] = useState({
    requestInformationText: '',
  });
  const [requestInformationText, setRequestInformationText] = useState(undefined);

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
    const { validFields, hasErrors } = fieldValidator([{
      name: 'requestMreInformation', value: requestInformationText, rules: ['empty'],
    }]);
    setErrorFields(validFields);

    if(hasErrors) return;

    nursingCareClarifyCommercial(nursingCarePackageId, requestInformationText)
      .then(() => {
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
        setErrors([...errors, `Status change failed. ${error.message}`]);
      });
  };

  const datePeriod = formatCareDatePeriod(
    nursingCarePackage?.nursingCarePackage.startDate,
    nursingCarePackage?.nursingCarePackage.endDate
  );

  return (
    <Layout
      clientSummaryInfo={{
        whoIsSourcing: 'hackney',
        client: 'James Stephens',
        title: `Nursing Care (${datePeriod.startDate} - ${datePeriod.endDate})`,
        hackneyId: '#786288',
        age: '91',
        dateOfBirth: '09/12/1972',
        postcode: 'E9 6EY',
      }}
      headerTitle="NURSING CARE BROKERED">
      <div className="hackney-text-black font-size-12px">
        <div className="client-summary">
          <ClientSummaryItem
            itemName="STARTS"
            itemDetail={datePeriod.startDate}
          />
          <ClientSummaryItem
            itemName="ENDS"
            itemDetail={datePeriod.endDate}
          />
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
          <ClientSummaryItem />
          <ClientSummaryItem />
        </div>

        <div className="package-cost-box__group mb-5">
          <PackageCostBox
            boxClass="hackney-package-cost-light-green-box"
            title="COST OF CARE / WK"
            cost={nursingCarePackage?.costOfCare}
            costType="ACTUAL"
          />
          <PackageCostBox
            boxClass="hackney-package-cost-light-green-box"
            title="ANP / WK"
            cost={nursingCarePackage?.costOfAdditionalNeeds}
            costType="ACTUAL"
          />
          <PackageCostBox
            boxClass="hackney-package-cost-green-box"
            title="TOTAL / WK"
            cost={nursingCarePackage?.totalPerWeek}
            costType="ACTUAL"
          />
        </div>

        <PackageApprovalHistorySummary approvalHistoryEntries={approvalHistoryEntries} />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <NursingCareSummary
                startDate={datePeriod.startDate}
                endDate={datePeriod.endDate}
                additionalNeedsEntries={additionalNeedsEntries}
                setAdditionalNeedsEntries={setAdditionalNeedsEntries}
                needToAddress={nursingCarePackage?.nursingCarePackage.needToAddress}
              />
            </div>
          </div>
        </div>

        <div className='button-group is-justify-content-flex-end'>
          <Button className="gray" onClick={handleRejectPackage}>
            Deny
          </Button>
          <Button className="button hackney-btn-green" onClick={handleApprovePackageCommercials}>
            Approve Commercials
          </Button>
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

export default NursingCareApproveBrokered;
