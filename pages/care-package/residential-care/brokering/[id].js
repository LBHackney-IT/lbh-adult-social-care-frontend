import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HASC_TOKEN_ID } from '../../../../api/BaseApi';
import { getHomeCareSummaryData } from '../../../../api/CarePackages/HomeCareApi';
import {
  createResidentialCareBrokerageInfo,
  getResidentialCarePackageApprovalHistory,
  getResidentialCarePackageDetailsForBrokerage,
  residentialCareChangeStage,
  residentialCareChangeStatus,
} from '../../../../api/CarePackages/ResidentialCareApi';
import { getAgeFromDateString, getEnGBFormattedDate } from '../../../../api/Utils/FuncUtils';
import Layout from '../../../../components/Layout/Layout';
import PackagesResidentialCare from '../../../../components/packages/residential-care';
import withSession from '../../../../lib/session';
import { selectBrokerage } from '../../../../reducers/brokerageReducer';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { APPROVER_HUB_ROUTE } from '../../../../routes/RouteConstants';
import { getLoggedInUser, getUserSession, uniqueID } from '../../../../service/helpers';
import { mapCarePackageApprovalHistory } from '../../../../api/Mappers/optionsMapper';
import { mapCareAdditionalNeedsEntries } from '../../../../api/Mappers/CarePackageMapper'

// start before render
export const getServerSideProps = withSession(async ({ req, res, query: { id: residentialCarePackageId } }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  const user = getLoggedInUser({ req });

  const data = {
    errorData: [],
  };

  try {
    // Call to api to get package
    const result = await getResidentialCarePackageDetailsForBrokerage(
      residentialCarePackageId,
      req.cookies[HASC_TOKEN_ID]
    );
    const newAdditionalNeedsEntries = mapCareAdditionalNeedsEntries(result.residentialCarePackage.residentialCareAdditionalNeeds);
    data.residentialCarePackage = result;
    data.additionalNeedsEntries = newAdditionalNeedsEntries;
  } catch (error) {
    data.errorData.push(`Retrieve residential care package details failed. ${error}`);
  }

  try {
    const res = await getResidentialCarePackageApprovalHistory(residentialCarePackageId, req.cookies[HASC_TOKEN_ID]);
    const newApprovalHistoryItems = mapCarePackageApprovalHistory(res);

    data.approvalHistoryEntries = newApprovalHistoryItems.slice();
  } catch (error) {
    data.errorData.push(`Retrieve residential care approval history failed. ${error}`);
  }

  return { props: { ...data, loggedInUserId: user.userId } };
});

const ResidentialCareBrokering = ({
  residentialCarePackage,
  additionalNeedsEntries,
  approvalHistoryEntries,
  loggedInUserId,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [initialPackageReclaim] = useState({
    type: '',
    notes: '',
    from: '',
    category: '',
    amount: '',
    id: '1',
  });
  const [errors, setErrors] = useState([]);
  const brokerage = useSelector(selectBrokerage);
  const [tab, setTab] = useState('approvalHistory');
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const createBrokerageInfo = (residentialCarePackageId, brokerageInfoForCreation) => {
    createResidentialCareBrokerageInfo(residentialCarePackageId, brokerageInfoForCreation)
      .then(() => {
        pushNotification('Package brokerage saved successfully', 'success');
        router.push(`${APPROVER_HUB_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Create brokerage info failed. ${error.message}`]);
      });
  };

  const changePackageBrokeringStatus = (residentialCarePackageId, brokeringStatusId) => {
    residentialCareChangeStatus(residentialCarePackageId, brokeringStatusId)
      .then(() => {
        pushNotification('Status changed.', 'success');
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Change package status failed. ${error.message}`]);
      });
  };

  const changePackageBrokeringStage = (residentialCarePackageId, stageId) => {
    residentialCareChangeStage(residentialCarePackageId, stageId)
      .then(() => {
        pushNotification('Stage changed.');
      })
      .catch((error) => {
        pushNotification(error);
        setErrors([...errors, `Change brokerage stage failed. ${error.message}`]);
      });
  };

  const addPackageReclaim = () => {
    setPackagesReclaimed([...packagesReclaimed, { ...initialPackageReclaim, id: uniqueID() }]);
  };

  const removePackageReclaim = (id) => {
    const newPackagesReclaim = packagesReclaimed.filter((item) => item.id !== id);
    setPackagesReclaimed(newPackagesReclaim);
  };

  const changePackageReclaim = (id) => (updatedPackage) => {
    const newPackage = packagesReclaimed.slice();
    const packageIndex = packagesReclaimed.findIndex((item) => item.id === id);
    newPackage.splice(packageIndex, 1, updatedPackage);
    setPackagesReclaimed(newPackage);
  };

  const changeTab = (chosenTab) => {
    if (chosenTab === 'packageDetails') {
      setSummaryData(getHomeCareSummaryData());
    }
    setTab(chosenTab);
  };

  return (
    <Layout
      clientSummaryInfo={{
        client: residentialCarePackage?.residentialCarePackage?.clientName,
        hackneyId: residentialCarePackage?.residentialCarePackage?.clientHackneyId,
        age:
          residentialCarePackage?.residentialCarePackage &&
          getAgeFromDateString(residentialCarePackage?.residentialCarePackage?.clientDateOfBirth),
        preferredContact: residentialCarePackage?.residentialCarePackage?.clientPreferredContact,
        canSpeakEnglish: residentialCarePackage?.residentialCarePackage?.clientCanSpeakEnglish,
        packagesCount: 4,
        dateOfBirth:
          residentialCarePackage?.residentialCarePackage &&
          getEnGBFormattedDate(residentialCarePackage?.residentialCarePackage?.clientDateOfBirth),
        postcode: residentialCarePackage?.residentialCarePackage?.clientPostCode,
        title: 'Residential Care Brokering',
      }}
    >
      <PackagesResidentialCare
        tab={tab}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={brokerage}
        changeTab={changeTab}
        summaryData={summaryData}
        approvalHistory={approvalHistoryEntries}
        residentialCarePackage={residentialCarePackage}
        residentialCareSummary={{
          additionalNeedsEntries,
          needToAddress: residentialCarePackage?.residentialCarePackage?.needToAddress,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
        changePackageBrokeringStage={changePackageBrokeringStage}
        loggedInUserId={loggedInUserId}
      />
    </Layout>
  );
};

export default ResidentialCareBrokering;
