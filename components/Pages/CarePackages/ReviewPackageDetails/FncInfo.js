import React from 'react';
import { getFundedNursingCareRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import { SummaryTotalCostInfo } from './SummaryTotalCostInfo';
import EditOrRemoveLink from './EditOrRemoveLink';

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
      <EditOrRemoveLink goToPackage={() => goToPackage(getFundedNursingCareRoute)} />
    </Container>
  );
};

export default FncInfo;