import React, { useState } from 'react';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import { usePackageSummary } from 'api';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import { ReviewPackageDetails } from 'components';
import {
  getBrokerPackageRoute,
  getCareChargesRoute,
  getCorePackageRoute,
  getFundedNursingCareRoute,
} from 'routes/RouteConstants';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  return { props: {} };
});

const settingsTypes = [
  { field: 'hasRespiteCare', text: 'Respite Care' },
  { field: 'hasDischargePackage', text: 'Discharge Package' },
  { field: 'hospitalAvoidance', text: 'Hospital Avoidance' },
  { field: 'isReEnablement', text: 'ReEnabled' },
  { field: 'isS117Client', text: 'S117' },
];

const ReviewPackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const { data, isLoading: summaryLoading } = usePackageSummary(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');

  const { isLoading: coreLoading } = useRedirectIfPackageNotExist();

  const checkSettings = (settings) =>
    settings &&
    settingsTypes
      .filter((item) => settings[item.field])
      .map((item) => settingsTypes.find((setting) => setting[item])?.text);

  const packageInfoItems = [
    {
      headerTitle: data?.packageType,
      id: 'care-package',
      goToPackage: () => router.push(getCorePackageRoute(carePackageId)),
      costOfPlacement: data?.costOfPlacement,
      items: [
        {
          startDate: data?.startDate,
          endDate: data?.endDate,
          title: 'Supplier',
          place: data?.supplier?.place,
          id: data?.supplier?.creatorId,
          address: `${data?.supplier?.supplierName}, ${data?.supplier?.address}`,
          serviceUserNeed: {
            term: data?.primarySupportReason,
            careType: checkSettings(data?.settings),
          },
        },
      ],
    },
    {
      headerTitle: 'Weekly Additional Need',
      id: 'weekly-additional-need',
      goToPackage: () => router.push(getBrokerPackageRoute(carePackageId)),
      items: data?.additionalWeeklyNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalWeeklyCost,
    },
    {
      headerTitle: 'One Off Additional Need',
      id: 'on-off-additional-need',
      goToPackage: () => router.push(getBrokerPackageRoute(carePackageId)),
      items: data?.additionalOneOffNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalOneOffCost,
    },
    {
      headerTitle: 'Funded Nursing Care',
      id: 'funded-nursing-care',
      goToPackage: () => router.push(getFundedNursingCareRoute(carePackageId)),
      items: data?.fundedNursingCare ? [data?.fundedNursingCare] : null,
      checkHide: true,
      totalCostHeader: `Total (${data?.fundedNursingCare?.cost <= 0 ? 'Net Off' : 'Gross'})`,
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.fnc,
        supplier: data?.supplierReclaims?.fnc,
      },
    },
    {
      headerTitle: 'Care Charges',
      id: 'care-charges',
      goToPackage: () => router.push(getCareChargesRoute(carePackageId)),
      items: data?.careCharges,
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      },
    },
  ];

  const isNotApprovedStatus = data?.status < 3

  return (
    <ReviewPackageDetails
      isLoading={summaryLoading || coreLoading}
      subTitle="Review package details"
      title={data?.packageType}
      openedPopup={openedPopup}
      setOpenedPopup={setOpenedPopup}
      packageId={carePackageId}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      buttons={[
        { title: 'Back', className: 'secondary-gray', onClick: router.back },
        isNotApprovedStatus && { title: 'Submit for approval', onClick: () => setOpenedPopup('submit') },
      ]}
      goBack={router.back}
      summaryData={data}
    />
  );
};

export default ReviewPackageDetailsPage;
