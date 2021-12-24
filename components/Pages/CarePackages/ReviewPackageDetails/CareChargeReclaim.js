import React from 'react';
import { getCareChargesRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import { SummaryTotalCostInfo } from './SummaryTotalCostInfo';
import EditOrRemoveLink from './EditOrRemoveLink';

const CareChargeReclaim = ({ data, goToPackage }) => (
  <Container className="review-package-details__cost-info-item">
    <PackageInfo
      containerId="care-charges"
      headerTitle="Care Charges"
      items={data?.careCharges}
    />
    <SummaryTotalCostInfo
      totalCostInfo={{
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      }}
    />
    <EditOrRemoveLink goToPackage={() => goToPackage(getCareChargesRoute)} />
  </Container>
);

export default CareChargeReclaim;