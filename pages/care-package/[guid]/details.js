import React, { useState } from 'react';
import { usePackageDetails, usePackageSummary } from 'api';
import { useRouter } from 'next/router';
import { ReviewPackageDetails } from 'components';
import { useRedirectIfPackageNotExist } from 'service';
import {
  getBrokerPackageRoute,
  getCareChargesRoute,
  getCarePackageCareChargeRoute,
  getCorePackageRoute,
  getFundedNursingCareRoute,
  getHistoryRoute,
  getPaymentHistoryRoute,
} from 'routes/RouteConstants';

const settingsTypes = [
  { field: 'hasRespiteCare', text: 'Respite Care' },
  { field: 'hasDischargePackage', text: 'Discharge Package' },
  { field: 'hospitalAvoidance', text: 'Hospital Avoidance' },
  { field: 'isReEnablement', text: 'ReEnabled' },
  { field: 'isS117Client', text: 'S117' },
];

const PackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const { data, isLoading: packageSummaryLoading } = usePackageSummary(carePackageId);
  const { data: { startDate, endDate }, isLoading: detailsLoading } = usePackageDetails(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');
  const editableStatus = data?.status < 6;
  const isApprovedStatus = data?.status === 4;

  const { isLoading: coreLoading, data: packageData } = useRedirectIfPackageNotExist();

  const checkSettings = (settings) =>
    settings &&
    settingsTypes
      .filter((item) => settings[item.field])
      .map((item) => settingsTypes.find((setting) => setting[item])?.text);

  const end = () => setOpenedPopup('end');
  const cancel = () => setOpenedPopup('cancel');
  const edit = () => router.push(getCorePackageRoute(carePackageId));

  const pushRoute = (route) => () => router.push(route);

  const packageInfoItems = [
    {
      headerTitle: data?.packageType,
      id: 'care-package',
      goToPackage: editableStatus && !isApprovedStatus && pushRoute(getCorePackageRoute(carePackageId)),
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
      goToPackage: editableStatus && !isApprovedStatus && pushRoute(getBrokerPackageRoute(carePackageId)),
      id: 'weekly-additional-need',
      items: data?.additionalWeeklyNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalWeeklyCost,
    },
    {
      headerTitle: 'One Off Additional Need',
      id: 'on-off-additional-need',
      goToPackage: editableStatus && !isApprovedStatus && pushRoute(getBrokerPackageRoute(carePackageId)),
      items: data?.additionalOneOffNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalOneOffCost,
    },
    {
      headerTitle: 'Funded Nursing Care',
      id: 'funded-nursing-care',
      checkHide: true,
      goToPackage: editableStatus && !isApprovedStatus && pushRoute(getFundedNursingCareRoute(carePackageId)),
      items: data?.fundedNursingCare ? [data.fundedNursingCare] : null,
      totalCostHeader: `Total (${data?.fundedNursingCare?.cost <= 0 ? 'Net Off' : 'Gross'})`,
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.fnc,
        supplier: data?.supplierReclaims?.fnc,
      },
    },
    {
      headerTitle: 'Care Charges',
      id: 'care-charges',
      items: data?.careCharges,
      goToPackage: editableStatus && !isApprovedStatus && pushRoute(getCareChargesRoute(carePackageId)),
      totalCostInfo: {
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      },
    },
  ];

  return (
    <ReviewPackageDetails
      className="package-details"
      showEditActions
      isLoading={coreLoading || packageSummaryLoading || detailsLoading}
      openedPopup={openedPopup}
      buttons={editableStatus && [
        { title: 'Edit', onClick: edit, secondary: true, outline: true, color: 'blue' },
        { title: 'Cancel', onClick: cancel, secondary: true, outline: true, color: 'red' },
        { title: 'End', onClick: end, secondary: true, outline: true, color: 'blue' },
      ]}
      additionalButtons={[
        { title: 'Package history', onClick: pushRoute(getHistoryRoute(carePackageId)), secondary: true, outline: true, color: 'blue' },
        { title: 'Care Plan', onClick: pushRoute(getCarePackageCareChargeRoute(carePackageId)), secondary: true, outline: true, color: 'blue' },
        { title: 'Payment history', onClick: pushRoute(getPaymentHistoryRoute(carePackageId)), secondary: true, outline: true, color: 'blue' },
      ]}
      setOpenedPopup={setOpenedPopup}
      title={data?.packageType}
      subTitle="Package details"
      packageData={{ ...packageData, startDate, endDate  }}
      packageId={carePackageId}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      goBack={router.back}
      summaryData={data}
    />
  );
};

export default PackageDetailsPage;
