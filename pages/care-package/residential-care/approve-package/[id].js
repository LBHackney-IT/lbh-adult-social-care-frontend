import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { HASC_TOKEN_ID } from 'api/BaseApi'
import {
  getResidentialCarePackageApprovalHistory,
  getResidentialCarePackageApprovalPackageContent,
  residentialCareApprovePackageContent,
  residentialCareChangeStatus,
  residentialCareRequestClarification,
} from 'api/CarePackages/ResidentialCareApi'
import { getAgeFromDateString, getEnGBFormattedDate } from 'api/Utils/FuncUtils'
import Layout from 'components/Layout/Layout'
import ResidentialCareSummary from 'components/ResidentialCare/ResidentialCareSummary'
import TitleHeader from 'components/TitleHeader'
import withSession from 'lib/session'
import { getErrorResponse, getUserSession } from 'service/helpers'
import { APPROVER_HUB_ROUTE } from 'routes/RouteConstants'
import { addNotification } from 'reducers/notificationsReducer'
import { Button } from 'components/Button'
import ApprovalHistory from 'components/ProposedPackages/ApprovalHistory'
import fieldValidator from 'service/inputValidator'
import RequestMoreInformation from 'components/Approver/RequestMoreInformation'
import { mapCareAdditionalNeedsEntries } from '../../../../api/Mappers/CarePackageMapper'

// start before render
export const getServerSideProps = withSession(async ({ req, res, query: { id: residentialCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const data = {
    errorData: [],
  };

  try {
    data.residentialCarePackage = await getResidentialCarePackageApprovalPackageContent(
      residentialCarePackageId,
      req.cookies[HASC_TOKEN_ID]
    );
  } catch (error) {
    data.errorData.push(`Retrieve residential care package details failed. ${error}`);
  }

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

  return { props: { ...data } };
});

const ResidentialCareApprovePackage = ({ residentialCarePackage }) => {
  const { residentialCarePackage: carePackage } = residentialCarePackage;
  const additionalNeedsEntriesData = mapCareAdditionalNeedsEntries(carePackage?.residentialCareAdditionalNeeds);
  const router = useRouter();
  const dispatch = useDispatch();
  const residentialCarePackageId = router.query.id;
  const residentialCarePackageData = residentialCarePackage?.residentialCarePackage;
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
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

  const updateErrorFields = (errors) => {
    setErrorFields({
      ...errorFields,
      ...getErrorResponse(errors),
    });
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  }

  const handleRejectPackage = () => {
    residentialCareChangeStatus(residentialCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const handleApprovePackageContents = () => {
    residentialCareApprovePackageContent(residentialCarePackageId)
      .then(() => {
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([
      { name: 'requestInformationText', value: requestInformationText, rules: ['empty'] },
    ]);
    if (hasErrors) {
      setErrorFields(validFields);
      return;
    }

    residentialCareRequestClarification(residentialCarePackageId, requestInformationText)
      .then(() => {
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error);
      });
  };

  return (
    <Layout
      clientSummaryInfo={{
        client: residentialCarePackage?.clientName,
        hackneyId: residentialCarePackage?.hackneyId,
        age: residentialCarePackage && getAgeFromDateString(residentialCarePackage?.dateOfBirth),
        preferredContact: residentialCarePackage?.preferredContact,
        canSpeakEnglish: residentialCarePackage?.canSpeakEnglish,
        packagesCount: 4,
        dateOfBirth: residentialCarePackage && getEnGBFormattedDate(residentialCarePackage?.dateOfBirth),
        postcode: residentialCarePackage?.clientPostCodeId,
        title: "RESIDENTIAL CARE APPROVAL",
        whoIsSourcing: "hackney",
      }}
    >
      <div className="hackney-text-black font-size-12px">
        <ApprovalHistory
          approvalData={residentialCarePackageData}
          costSummary={{
            costOfCare: residentialCarePackage?.coreOfCare,
            costOfAdditionalNeeds: residentialCarePackage?.costOfAdditionalNeeds,
            costOfOneOff: residentialCarePackage?.costOfOneOff,
            totalPerWeek: residentialCarePackage?.totalPerWeek,
          }}
        />
        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <ResidentialCareSummary
                startDate={residentialCarePackage?.startDate}
                endDate={residentialCarePackage?.endDate}
                additionalNeedsEntries={additionalNeedsEntries}
                setAdditionalNeedsEntries={setAdditionalNeedsEntries}
                needToAddress={residentialCarePackageData?.needToAddress}
              />
            </div>
          </div>
        </div>

        <div className="button-group mb-5">
          <Button className="gray" onClick={handleRejectPackage}>Deny</Button>
          <Button onClick={handleApprovePackageContents}>Approve to be brokered</Button>
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

export default ResidentialCareApprovePackage;
