import React from 'react';
import { getCareChargesRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import { SummaryTotalCostInfo } from './SummaryTotalCostInfo';

const CareChargeReclaim = ({ data, goToPackage }) => (
  <Container className="review-package-details__cost-info-item">
    <PackageInfo containerId="care-charges" headerTitle="Care Charges" items={data?.careCharges} />
    <SummaryTotalCostInfo
      totalCostInfo={{
        hackney: data?.hackneyReclaims?.careCharge,
        supplier: data?.supplierReclaims?.careCharge,
      }}
    />
    {goToPackage && (
      <Container className="review-package-details__items-actions" display="flex">
        <p onClick={() => goToPackage(getCareChargesRoute)} className="link-button">
          Edit or Remove
        </p>
      </Container>
    )}
  </Container>
);

export default CareChargeReclaim;
