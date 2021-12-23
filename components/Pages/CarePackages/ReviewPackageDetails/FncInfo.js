import React from 'react';
import { getFundedNursingCareRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import { SummaryTotalCostInfo } from './SummaryTotalCostInfo';

const FncInfo = ({ goToPackage, onCheckHide, data }) => {
  if (onCheckHide()) return null;

  return (
    <Container className="review-package-details__cost-info-item">
      <PackageInfo
        containerId="funded-nursing-care"
        headerTitle="Funded Nursing Care"
        items={data?.fundedNursingCare ? [data?.fundedNursingCare] : null}
      />
      <SummaryTotalCostInfo
        totalCostInfo={{
          hackney: data?.hackneyReclaims?.fnc,
          supplier: data?.supplierReclaims?.fnc,
        }}
      />
      {goToPackage && (
        <Container className="review-package-details__items-actions" display="flex">
          <p onClick={() => goToPackage(getFundedNursingCareRoute)} className="link-button">
            Edit or Remove
          </p>
        </Container>
      )}
    </Container>
  );
};

export default FncInfo;