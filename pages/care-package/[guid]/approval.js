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
  getFundedNursingCareRoute
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

const ApprovalPackageDetail = () => {
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
      goToPackage: () => router.push(getBrokerPackageRoute(carePackageId)),
      headerTitle: 'Weekly Additional Need',
      id: 'weekly-additional-need',
      items: data?.additionalWeeklyNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalWeeklyCost,
    },
    {
      goToPackage: () => router.push(getBrokerPackageRoute(carePackageId)),
      headerTitle: 'One Off Additional Need',
      id: 'on-off-additional-need',
      items: data?.additionalOneOffNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalOneOffCost,
    },
    {
      goToPackage: () => router.push(getFundedNursingCareRoute(carePackageId)),
      headerTitle: 'Funded Nursing Care',
      id: 'funded-nursing-care',
      checkHide: true,
      items: data?.fundedNursingCare ? [data?.fundedNursingCare] : null,
      totalCostHeader: `Total (${data?.fundedNursingCare?.cost <= 0 ? 'Net Off' : 'Gross'})`,
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.fnc,
        supplier: data?.supplierReclaims?.fnc,
      },
    },
    {
      goToPackage: () => router.push(getCareChargesRoute(carePackageId)),
      headerTitle: 'Care Charges',
      id: 'care-charges',
      items: data?.careCharges,
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      },
    },
  ];

  return (
    <ReviewPackageDetails
      className="approval-package-detail"
      isLoading={summaryLoading || coreLoading}
      subTitle="Package details"
      title={data?.packageType}
      packageId={carePackageId}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      packageStatus={data?.packageStatus}
      setOpenedPopup={setOpenedPopup}
      openedPopup={openedPopup}
      showEditActions
      buttons={data.status && data.status !== 4 && [
        {
          title: 'Decline',
          onClick: () => setOpenedPopup('decline'),
          secondary: true,
          color: 'red',
          outline: true,
        },
        {
          title: 'Approve',
          onClick: () => setOpenedPopup('approve'),
          className: 'disable-shadow'
        },
      ]}
      submitButtonText="Approve"
      goBack={router.back}
      summaryData={data}
    />
  );
};

export default ApprovalPackageDetail;
