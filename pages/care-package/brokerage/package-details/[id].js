import React, { useState } from 'react';
import useCarePackageApi from 'api/SWR/CarePackage/useCarePackageApi';
import { useRouter } from 'next/router';
import { PackageDetails } from 'components/Brokerage/PackageDetails';
import BrokerageBorderCost from 'components/Brokerage/BrokerageBorderCost';

const settingsTypes = [
  { field: 'hasRespiteCare', text: 'Respite Care' },
  { field: 'hasDischargePackage', text: 'Discharge Package' },
  { field: 'hospitalAvoidance', text: 'Hospital Avoidance' },
  { field: 'isReEnablement', text: 'ReEnabled' },
  { field: 'isS117Client', text: 'S117' },
];

const PackageDetailsPage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const { data } = useCarePackageApi.summary(carePackageId);

  const [fundedNursingCareClaimCollector] = useState({
    2: 'Hackney Council (gross/net)',
    1: 'Supplier (gross/net)',
  });

  const [careChargesClaimCollector] = useState({
    2: 'Hackney Council (gross)',
    1: 'Supplier (net)',
  });

  const checkSettings = (settings) => settings && settingsTypes
    .filter((item) => settings[item.field] === true)
    .map(item => settingsTypes.find(setting => setting[item])?.text);

  const summary = [
    { id: 1, key: 'Cost of placement', value: data?.costOfPlacement },
    { id: 2, key: 'FNC payment', value: data?.fncPayment },
    { id: 3, key: 'Additional weekly cost', value: data?.additionalWeeklyCost },
    { id: 4, key: 'Sub total cost of package', value: data?.subTotalCost, className: 'brokerage__summary-cost' },
    { id: 5, key: data?.hackneyReclaims?.fnc && 'FNC (net collected at source)', value: data?.hackneyReclaims?.fnc },
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
    { id: 8, key: data?.supplierReclaims?.fnc && 'FNC (net collected at source)', value: data?.supplierReclaims?.fnc },
    {
      id: 9,
      key: data?.supplierReclaims?.careCharges && 'Care charges (Net collected at source)',
      value: data?.supplierReclaims?.careCharges,
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
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalWeeklyCost,
    },
    {
      headerTitle: 'One Off Additional Need',
      id: 'on-off-additional-need',
      items: data?.additionalOneOffNeeds,
      totalCostHeader: 'Total (Net Off)',
      totalCost: data?.additionalOneOffCost,
    },
    {
      headerTitle: 'Funded Nursing Care',
      id: 'funded-nursing-care',
      items: data?.fundedNursingCare ? [data.fundedNursingCare] : null,
      totalCostHeader: `Total (${data?.fundedNursingCare?.cost <= 0 ? 'Net Off' : 'Gross'})`,
      details: (
        <>
          <p>
            <span className="font-weight-bold">FNC assessment been carried out: </span>
            {data.fundedNursingCare?.assessmentFileUrl ? 'Yes' : 'No'}
          </p>
          <p>
            <span className="font-weight-bold">Collected by: </span>
            {fundedNursingCareClaimCollector[data.fundedNursingCare?.claimCollector]}
          </p>
          <p>
            <span className="font-weight-bold">FNC assessment: </span>
            <span className="link-button text-blue">View</span>
          </p>
        </>
      ),
      totalCostComponent: (
        <>
          {data?.hackneyReclaims?.fnc !== 0 && (
            <BrokerageBorderCost totalCost={data?.hackneyReclaims?.fnc} totalCostHeader="Total (Gross)"/>
          )}
          {!!data?.supplierReclaims?.fnc && !!data?.hackneyReclaims?.fnc && <br/>}
          {data?.supplierReclaims?.fnc !== 0 && (
            <BrokerageBorderCost totalCost={data?.supplierReclaims?.fnc} totalCostHeader="Total (Net Off)"/>
          )}
        </>
      ),
    },
    {
      headerTitle: 'Care Charges',
      id: 'care-charges',
      items: data?.careCharges,
      details: (
        <>
          <p>
            <span className="font-weight-bold">Provisional care charge (pre-assessement)</span>
          </p>
          {data?.fundedNursingCare?.claimCollector && <p>
            <span className="font-weight-bold">Collected by: </span>
            {careChargesClaimCollector[data.fundedNursingCare.claimCollector]}
          </p>}
          <p className="font-weight-bold">Why is Hackney collecting these care charges: </p>
          <p>Service user unable to manage finances</p>
        </>
      ),
      totalCostComponent: (
        <>
          {data?.hackneyReclaims?.careCharge !== 0 && (
            <BrokerageBorderCost totalCost={data?.hackneyReclaims?.careCharge} totalCostHeader="Total (Gross)"/>
          )}
          {!!data?.supplierReclaims?.careCharge && !!data?.hackneyReclaims?.careCharge && <br/>}
          {data?.supplierReclaims?.careCharge !== 0 && (
            <BrokerageBorderCost totalCost={data?.supplierReclaims?.careCharge} totalCostHeader="Total (Net Off)"/>
          )}
        </>
      ),
    },
  ];

  return (
    <PackageDetails
      supplierName={data?.supplier?.supplierName}
      packageInfoItems={packageInfoItems}
      userDetails={data?.serviceUser}
      summary={summary}
    />
  );
};

export default PackageDetailsPage;
