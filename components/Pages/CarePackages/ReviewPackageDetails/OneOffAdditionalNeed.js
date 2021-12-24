import React from 'react';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import EditOrRemoveLink from './EditOrRemoveLink';

const OneOffAdditionalNeed = ({ data, goToPackage }) => (
  <Container className="review-package-details__cost-info-item">
    <PackageInfo
      containerId="on-off-additional-need"
      headerTitle="One Off Additional Need"
      items={data?.additionalOneOffNeeds}
    />
    {data?.additionalOneOffCost > 0 && (
      <BrokerageBorderCost totalCost={data?.additionalOneOffCost} totalCostHeader="Total (Net Off)" />
    )}
    <EditOrRemoveLink goToPackage={() => goToPackage(getBrokerPackageRoute)} />
  </Container>
);

export default OneOffAdditionalNeed;