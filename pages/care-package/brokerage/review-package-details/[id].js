import React from 'react';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import { ReviewPackageDetails } from 'components/Brokerage/ReviewPackageDetails';
import BrokerageBorderCost from 'components/Brokerage/BrokerageBorderCost';

const settingsTypes = [
  { field: 'hasRespiteCare', text: 'Respite Care' },
  { field: 'hasDischargePackage', text: 'Discharge Package' },
  { field: 'hospitalAvoidance', text: 'Hospital Avoidance' },
  { field: 'isReEnablement', text: 'ReEnabled' },
  { field: 'isS117Client', text: 'S117' },
];

const ReviewPackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.summary(carePackageId);
  // const { data: detailsData } = useCarePackageApi.details(carePackageId);

  const checkSettings = (settings) => settings && settingsTypes.find((item) => settings[item.field] === true)?.text;

  const summary = [
    { id: 1, key: 'Cost of placement', value: data?.costOfPlacement },
    { id: 2, key: 'FNC payment', value: data?.fncPayment },
    { id: 3, key: 'Additional weekly cost', value: data?.additionalWeeklyCost },
    { id: 4, key: 'Sub total cost of package', value: data?.subTotalCost, className: 'brokerage__summary-cost' },
    { id: 5, key: data?.hackneyReclaims && 'FNC (net collected at source)', value: data?.hackneyReclaims?.fnc },
    {
      id: 6,
      key: data?.hackneyReclaims && 'Care charges (gross collected from service user)',
      value: data?.hackneyReclaims?.careCharges,
    },
    {
      id: 7,
      key: data?.hackneyReclaims && 'Sub reclaimed by Hackney',
      value: data?.hackneyReclaims?.subTotal,
      className: 'brokerage__summary-cost',
    },
    { id: 8, key: data?.supplierReclaims && 'FNC (net collected at source)', value: data?.supplierReclaims?.fnc },
    {
      id: 9,
      key: data?.supplierReclaims && 'Care charges (Net collected at source)',
      value: data?.supplierReclaims?.careCharges,
    },
    {
      id: 10,
      key: data?.supplierReclaims && 'Sub reclaimed by Supplier',
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
      items: data?.additionalWeeklyNeeds,
      totalCostHeader: `Total (${data?.additionalWeeklyNeeds <= 0 ? 'Net Off' : 'Gross'})`,
      totalCost: data?.additionalWeeklyCost,
    },
    {
      headerTitle: 'One Off Additional Need',
      id: 'on-off-additional-need',
      items: data?.additionalOneOffNeeds,
      totalCostHeader: `Total (${data?.additionalOneOffCost <= 0 ? 'Net Off' : 'Gross'})`,
      totalCost: data?.additionalOneOffCost,
    },
    {
      headerTitle: 'Care Charges',
      id: 'care-charges',
      items: data?.careCharges,
      totalCostComponent: (
        <>
          {data?.hackneyReclaims?.careCharge !== 0 && (
            <BrokerageBorderCost totalCost={data?.hackneyReclaims?.careCharge} totalCostHeader="Total (Gross)" />
          )}
          {data?.supplierReclaims?.careCharge && data?.hackneyReclaims?.careCharge && <br />}
          {data?.supplierReclaims?.careCharge !== 0 && (
            <BrokerageBorderCost totalCost={data?.supplierReclaims?.careCharge} totalCostHeader="Total (Net Off)" />
          )}
        </>
      ),
    },
  ];

  return (
    <ReviewPackageDetails
      supplierName={data?.supplier?.supplierName}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      summary={summary}
    />
  );
};

export default ReviewPackageDetailsPage;
