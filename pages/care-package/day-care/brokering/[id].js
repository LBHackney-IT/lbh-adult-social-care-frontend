import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getUserSession, uniqueID } from 'service/helpers';
import { getHomeCareSummaryData } from 'api/CarePackages/HomeCareApi';
import Layout from 'components/Layout/Layout';
import { getAgeFromDateString, getEnGBFormattedDate } from 'api/Utils/FuncUtils';
import { changeDayCarePackageStatus, createDayCareBrokerageInfo } from 'api/CarePackages/DayCareApi';
import { getInitialPackageReclaim } from 'api/Utils/CommonOptions';
import { mapDayCarePackageDetailsForBrokerage } from 'api/Mappers/DayCareMapper';
import { CARE_PACKAGE_ROUTE } from 'routes/RouteConstants';
import PackagesDayCare from 'components/packages/day-care';
import withSession from 'lib/session';
import useDayCareApi from 'api/SWR/useDayCareApi';
import { addNotification } from 'reducers/notificationsReducer';

// start before render
export const getServerSideProps = withSession(({ req, res }) => {
  const isRedirect = getUserSession({ req, res });
  if (isRedirect) return { props: {} };

  return { props: {} };
});

const DayCareBrokering = () => {
  const router = useRouter();
  const dayCareId = router.query.id;
  const dispatch = useDispatch();
  const [tab, setTab] = useState('approvalHistory');
  const [summaryData, setSummaryData] = useState([]);
  const [packagesReclaimed, setPackagesReclaimed] = useState([]);
  const [approvalHistoryEntries, setApprovalHistoryEntries] = useState([]);
  const [opportunityEntries, setOpportunityEntries] = useState([]);
  const [daysSelected, setDaysSelected] = useState([]);
  const [clientDetails, setClientDetails] = useState([]);

  const { data: dayCarePackage } = useDayCareApi.detailsForBrokerage(dayCareId);
  const packageDetails = dayCarePackage?.packageDetails;

  useEffect(() => {
    if(!dayCarePackage?.packageApprovalHistory) return;

    const {
      newApprovalHistoryItems,
      newOpportunityEntries,
      currentDaysSelected
    } = mapDayCarePackageDetailsForBrokerage(dayCarePackage);

    setApprovalHistoryEntries(newApprovalHistoryItems);
    setOpportunityEntries(newOpportunityEntries);
    setOpportunityEntries(newOpportunityEntries);
    setClientDetails(dayCarePackage.clientDetails);
    setDaysSelected(currentDaysSelected);
  }, [dayCarePackage]);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const createBrokerageInfo = (dayCarePackageId, brokerageInfoForCreation) => {
    createDayCareBrokerageInfo(dayCarePackageId, brokerageInfoForCreation)
      .then(() => {
        pushNotification('Package saved', 'success');
        router.push(`${CARE_PACKAGE_ROUTE}`);
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const changePackageBrokeringStatus = (dayCarePackageId, brokeringStatusId) => {
    changeDayCarePackageStatus(dayCarePackageId, brokeringStatusId)
      .then(() => {
        pushNotification('Status changed');
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const addPackageReclaim = () => {
    setPackagesReclaimed([...packagesReclaimed, { ...getInitialPackageReclaim(), id: uniqueID() }]);
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

  const changeTab = (newTab) => {
    if (newTab === 'packageDetails') {
      setSummaryData(getHomeCareSummaryData());
    }
    setTab(newTab);
  };

  return (
    <Layout
      showBackButton
      clientSummaryInfo={{
        client: clientDetails?.clientName,
        hackneyId: clientDetails?.hackneyId,
        age: clientDetails && getAgeFromDateString(clientDetails.dateOfBirth),
        preferredContact: clientDetails?.preferredContact,
        canSpeakEnglish: clientDetails?.canSpeakEnglish,
        packagesCount: 4,
        dateOfBirth: clientDetails && getEnGBFormattedDate(clientDetails.dateOfBirth),
        postcode: clientDetails?.postCode,
        title: 'Day care brokering',
      }}
    >
      <PackagesDayCare
        tab={tab}
        addPackageReclaim={addPackageReclaim}
        removePackageReclaim={removePackageReclaim}
        packagesReclaimed={packagesReclaimed}
        changePackageReclaim={changePackageReclaim}
        brokerage={dayCarePackage?.dayCarePackage}
        changeTab={changeTab}
        summaryData={summaryData}
        approvalHistory={approvalHistoryEntries}
        dayCarePackage={dayCarePackage}
        dayCareSummary={{
          opportunityEntries,
          needToAddress: packageDetails?.needToAddress,
          transportNeeded: packageDetails?.transportNeeded,
          daysSelected,
          deleteOpportunity: () => {},
        }}
        createBrokerageInfo={createBrokerageInfo}
        changePackageBrokeringStatus={changePackageBrokeringStatus}
      />
    </Layout>
  );
};

export default DayCareBrokering;
