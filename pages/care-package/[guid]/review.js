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

const fundedNursingCareClaimCollector = {
  2: 'Hackney Council (gross/net)',
  1: 'Supplier (gross/net)',
};

const careChargesClaimCollector = {
  2: 'Hackney Council (gross)',
  1: 'Supplier (net)',
};

const ReviewPackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const { data, isLoading: summaryLoading } = usePackageSummary(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');

  const coreLoading = useRedirectIfPackageNotExist();

  const checkSettings = (settings) =>
    settings &&
    settingsTypes
      .filter((item) => settings[item.field])
      .map((item) => settingsTypes.find((setting) => setting[item])?.text);

  const summary = [
    { id: 1, key: 'Cost of placement', value: data?.costOfPlacement },
    { id: 2, key: 'FNC payment', value: data?.fncPayment, checkHide: true },
    { id: 3, key: 'Additional weekly cost', value: data?.additionalWeeklyCost },
    {
      id: 4,
      key: 'Sub total cost of package',
      value: data?.subTotalCost,
      className: 'brokerage__summary-cost',
    },
    {
      id: 5,
      key: data?.hackneyReclaims?.fnc && 'FNC (net collected at source)',
      value: data?.hackneyReclaims?.fnc,
      checkHide: true,
    },
    {
      id: 6,
      key: data?.hackneyReclaims?.careCharge && 'Care charges (gross collected from service user)',
      value: data?.hackneyReclaims?.careCharge,
    },
    {
      id: 7,
      key: data?.hackneyReclaims?.subTotal && 'Sub reclaimed by Hackney',
      value: data?.hackneyReclaims?.subTotal,
      className: 'brokerage__summary-cost',
    },
    {
      id: 8,
      key: data?.supplierReclaims?.fnc && 'FNC (net collected at source)',
      value: data?.supplierReclaims?.fnc,
      checkHide: true,
    },
    {
      id: 9,
      key: data?.supplierReclaims?.careCharge && 'Care charges (Net collected at source)',
      value: data?.supplierReclaims?.careCharge,
    },
    {
      id: 10,
      key: data?.supplierReclaims?.subTotal && 'Sub reclaimed by Supplier',
      value: data?.supplierReclaims?.subTotal,
      className: 'brokerage__summary-cost',
    },
    {
      id: 11,
      key: 'Total weekly cost',
      value: data?.totalWeeklyCost,
      className: 'brokerage__summary-cost',
    },
    {
      id: 12,
      key: 'Total one off payment',
      value: data?.additionalOneOffCost,
      className: 'brokerage__summary-cost',
    },
  ];

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
      fncDetails: {
        fncClaimCollector: fundedNursingCareClaimCollector[data?.fundedNursingCare?.claimCollector],
        assessmentFileUrl: data?.fundedNursingCare?.assessmentFileName ? 'Yes' : 'No',
      },
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
      careChargeClaimCollector: careChargesClaimCollector[data?.fundedNursingCare?.claimCollector],
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      },
    },
  ];

  return (
    <ReviewPackageDetails
      isLoading={summaryLoading || coreLoading}
      subTitle="Review package details"
      title={data?.packageType}
      openedPopup={openedPopup}
      setOpenedPopup={setOpenedPopup}
      packageId={carePackageId}
      packageStatus={data?.packageStatus}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      buttons={[
        { title: 'Back', className: 'secondary-gray', onClick: router.back },
        { title: 'Submit for approval', onClick: () => setOpenedPopup('submit') },
      ]}
      goBack={router.back}
      summary={summary}
    />
  );
};

export default ReviewPackageDetailsPage;
