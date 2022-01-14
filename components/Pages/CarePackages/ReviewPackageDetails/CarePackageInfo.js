import React from 'react';
import { getCorePackageRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import { SummaryCostOfPlacement } from './SummaryCostOfPlacement';

const settingsTypes = [
  { field: 'hasRespiteCare', text: 'Respite Care' },
  { field: 'hasDischargePackage', text: 'Discharge Package' },
  { field: 'hospitalAvoidance', text: 'Hospital Avoidance' },
  { field: 'isReEnablement', text: 'ReEnabled' },
  { field: 'isS117Client', text: 'S117' },
];

const checkSettings = (settings) =>
  settings &&
  settingsTypes
    .filter((item) => settings[item.field])
    .map((item) => settingsTypes.find((setting) => setting[item])?.text);

const CarePackageInfo = ({ data, goToPackage }) => (
  <Container className="review-package-details__cost-info-item">
    <PackageInfo
      containerId="care-package"
      headerTitle={data?.packageType}
      subTitle={data?.schedulingPeriod}
      items={[
        {
          startDate: data?.startDate,
          endDate: data?.endDate,
          title: 'Supplier',
          place: data?.supplier?.place,
          // NOTE id is being used as a key here, and undefined id will cause React throw key error
          id: data?.supplier?.creatorId ?? null,
          address: `${data?.supplier?.supplierName}, ${data?.supplier?.address}`,
          serviceUserNeed: {
            term: data?.primarySupportReason,
            careType: checkSettings(data?.settings),
          },
        },
      ]}
    />
    <SummaryCostOfPlacement costOfPlacement={data?.costOfPlacement} />
    {goToPackage && (
      <Container className="review-package-details__items-actions" display="flex">
        <p onClick={() => goToPackage(getCorePackageRoute)} className="link-button">
          Edit or Remove
        </p>
      </Container>
    )}
  </Container>
);

export default CarePackageInfo;
