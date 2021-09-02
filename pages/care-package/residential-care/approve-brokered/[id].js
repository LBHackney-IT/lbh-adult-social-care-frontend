import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { HASC_TOKEN_ID } from 'api/BaseApi';
import {
  getResidentialCarePackageApprovalHistory,
  getResidentialCarePackageApproveBrokered,
  residentialCareApproveCommercials,
  residentialCareChangeStatus,
  residentialCareClarifyCommercial,
} from 'api/CarePackages/ResidentialCareApi';
import { getAgeFromDateString, getEnGBFormattedDate } from 'api/Utils/FuncUtils';
import Layout from 'components/Layout/Layout';
import ResidentialCareSummary from 'components/ResidentialCare/ResidentialCareSummary';
import TitleHeader from 'components/TitleHeader';
import withSession from 'lib/session';
import { getErrorResponse, getUserSession } from 'service/helpers';
import { APPROVER_HUB_ROUTE } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import ApprovalHistory from 'components/ProposedPackages/ApprovalHistory';
import { Button } from 'components/Button';
import RequestMoreInformation from 'components/Approver/RequestMoreInformation';
import fieldValidator from 'service/inputValidator';
import { mapCareAdditionalNeedsEntries, mapCareApprovalHistoryItems } from '../../../../api/Mappers/CarePackageMapper';

// start before render
export const getServerSideProps = withSession(async ({ req, res, query: { id: residentialCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const data = {
    errorData: [],
  };

  try {
    const result = await getResidentialCarePackageApprovalHistory(residentialCarePackageId, req.cookies[HASC_TOKEN_ID]);
    data.approvalHistoryEntries = mapCareApprovalHistoryItems(result);

  } catch (error) {
    data.errorData.push(`Retrieve residential care approval history failed. ${error}`);
  }

  try {
    data.residentialCarePackage = await getResidentialCarePackageApproveBrokered(
      residentialCarePackageId,
      req.cookies[HASC_TOKEN_ID]
    );
  } catch (error) {
    data.errorData.push(`Retrieve residential care package details failed. ${error}`);
  }

  return { props: { ...data } };
});

const ResidentialCareApproveBrokered = ({
  residentialCarePackage,
  approvalHistoryEntries,
  errorData,
}) => {
  const { residentialCarePackage: carePackage } = residentialCarePackage;
  const additionalNeedsEntriesData = mapCareAdditionalNeedsEntries(carePackage?.residentialCareAdditionalNeeds);
  const router = useRouter();
  const dispatch = useDispatch();
  const residentialCarePackageId = router.query.id;
  const [errors, setErrors] = useState(errorData);
  const [additionalNeedsEntries, setAdditionalNeedsEntries] = useState(additionalNeedsEntriesData);
  const [displayMoreInfoForm, setDisplayMoreInfoForm] = useState(false);
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

  const updateErrorFields = (errors) => {
    setErrorFields({
      ...errorFields,
      ...getErrorResponse(errors),
    });
  };

  const residentialCarePackageData = residentialCarePackage?.residentialCarePackage;

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleRejectPackage = () => {
    residentialCareChangeStatus(residentialCarePackageId, 10)
      .then(() => {
        // router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Status change failed. ${error}`]);
      });
  };

  const handleApprovePackageCommercials = () => {
    residentialCareApproveCommercials(residentialCarePackageId)
      .then(() => {
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Status change failed. ${error}`]);
      });
  };

  const handleRequestMoreInformation = () => {
    const { validFields, hasErrors } = fieldValidator([{
      name: 'requestInformationText', value: requestInformationText, rules: ['empty'],
    }]);
    setErrorFields(validFields);

    if(hasErrors) return;

    residentialCareClarifyCommercial(residentialCarePackageId, requestInformationText)
      .then(() => {
        setDisplayMoreInfoForm(false);
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        updateErrorFields(error)
        setErrors([...errors, `Status change failed. ${error}`]);
      });
  };

  return (
    <Layout
      clientSummaryInfo={{
        title: "RESIDENTIAL CARE BROKERED",
        client: residentialCarePackageData?.clientName,
        hackneyId: residentialCarePackageData?.hackneyId,
        age: residentialCarePackage && getAgeFromDateString(residentialCarePackage.dateOfBirth),
        preferredContact: residentialCarePackageData?.preferredContact,
        canSpeakEnglish: residentialCarePackageData?.canSpeakEnglish,
        packagesCount: 4,
        dateOfBirth: residentialCarePackage && getEnGBFormattedDate(residentialCarePackage.dateOfBirth),
        postcode: residentialCarePackageData?.clientPostCodeId,
      }}
    >
      <div className="hackney-text-black font-size-12px">
        <ApprovalHistory
          approvalData={residentialCarePackageData}
          costSummary={residentialCarePackageData?.costSummary}
          history={approvalHistoryEntries}
          careType='Residential Care Brokered'
        />

        <div className="columns">
          <div className="column">
            <div className="mt-4 mb-1">
              <TitleHeader>Package Details</TitleHeader>
              <ResidentialCareSummary
                startDate={residentialCarePackageData?.startDate}
                endDate={residentialCarePackageData?.endData}
                typeOfStayText={residentialCarePackageData?.typeOfStayOptionName}
                additionalNeedsEntries={additionalNeedsEntries}
                setAdditionalNeedsEntries={setAdditionalNeedsEntries}
                needToAddress={residentialCarePackageData?.needToAddress}
              />
            </div>
          </div>
        </div>

        <div className="button-group mb-5">
          <Button className="gray" onClick={handleRejectPackage}>Deny</Button>
          <Button onClick={handleApprovePackageCommercials}>Approve Commercials</Button>
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

export default ResidentialCareApproveBrokered;
