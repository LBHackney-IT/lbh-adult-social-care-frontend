import React, { useState } from 'react';
import { usePackageSummary } from 'api';
import { useRouter } from 'next/router';
import { ReviewPackageDetails } from 'components';
import { getLoggedInUser } from 'service';
import withSession from 'lib/session';
import {
  BROKER_PORTAL_ROUTE,
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

const fundedNursingCareClaimCollector = {
  2: 'Hackney Council (gross/net)',
  1: 'Supplier (gross/net)',
};

const careChargesClaimCollector = {
  2: 'Hackney Council (gross)',
  1: 'Supplier (net)',
};

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Full overview' },
];

const PackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const { data } = usePackageSummary(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');

  const checkSettings = (settings) => settings && settingsTypes
    .filter((item) => settings[item.field])
    .map(item => settingsTypes.find(setting => setting[item])?.text);

  const end = () => setOpenedPopup('end');
  const cancel = () => setOpenedPopup('cancel');
  const edit = () => router.push(getCorePackageRoute(carePackageId));

  const summary = [
    { id: 1, key: 'Cost of placement', value: data?.costOfPlacement },
    { id: 2, key: 'FNC payment', value: data?.fncPayment },
    { id: 3, key: 'Additional weekly cost', value: data?.additionalWeeklyCost },
    { id: 4, key: 'Sub total cost of package', value: data?.subTotalCost, className: 'brokerage__summary-cost' },
    {
      id: 5,
      key: data?.hackneyReclaims?.fnc && 'FNC (net collected at source)',
      value: data?.hackneyReclaims?.fnc
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
      value: data?.supplierReclaims?.fnc
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
    { id: 11, key: 'Total weekly cost', value: data?.totalWeeklyCost, className: 'brokerage__summary-cost' },
    { id: 12, key: 'Total one off payment', value: data?.additionalOneOffCost, className: 'brokerage__summary-cost' },
  ];

  const packageInfoItems = [
    {
      headerTitle: data?.packageType,
      id: 'care-package',
      goToPackage: (packageId) => router.push(getCorePackageRoute(packageId)),
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
      goToPackage: (packageId) => router.push(getBrokerPackageRoute(packageId)),
      id: 'weekly-additional-need',
      items: data?.additionalWeeklyNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalWeeklyCost,
    },
    {
      headerTitle: 'One Off Additional Need',
      id: 'on-off-additional-need',
      goToPackage: (packageId) => router.push(getBrokerPackageRoute(packageId)),
      items: data?.additionalOneOffNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalOneOffCost,
    },
    {
      headerTitle: 'Funded Nursing Care',
      id: 'funded-nursing-care',
      goToPackage: (packageId) => router.push(getFundedNursingCareRoute(packageId)),
      items: data?.fundedNursingCare ? [data.fundedNursingCare] : null,
      totalCostHeader: `Total (${data?.fundedNursingCare?.cost <= 0 ? 'Net Off' : 'Gross'})`,
      fncDetails: {
        funcClaimCollector: fundedNursingCareClaimCollector[data?.fundedNursingCare?.claimCollector],
        assessmentFileUrl: data?.fundedNursingCare?.assessmentFileUrl ? 'Yes' : 'No',
      },
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.fnc,
        supplier: data?.supplierReclaims?.fnc,
      }
    },
    {
      headerTitle: 'Care Charges',
      id: 'care-charges',
      items: data?.careCharges,
      goToPackage: (packageId) => router.push(getCareChargesRoute(packageId)),
      careChargeClaimCollector: careChargesClaimCollector[data?.fundedNursingCare?.claimCollector],
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      },
    },
  ];

  return (
    <ReviewPackageDetails
      className='package-details'
      showEditActions
      openedPopup={openedPopup}
      buttons={[
        { title: 'Edit', onClick: edit, className: 'outline blue' },
        { title: 'Cancel', onClick: cancel, className: 'outline red' },
        { title: 'End', onClick: end, className: 'outline blue' },
      ]}
      setOpenedPopup={setOpenedPopup}
      title={data?.packageType}
      breadcrumbs={breadcrumbs}
      subTitle="Package details"
      packageId={carePackageId}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      goBack={router.back}
      summary={summary}
    />
  );
};

export default PackageDetailsPage;
