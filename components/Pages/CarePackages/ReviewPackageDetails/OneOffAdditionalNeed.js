import React from 'react';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';

const OneOffAdditionalNeed = ({ data, goToPackage }) => (
  <Container className="review-package-details__cost-info-item">
    <PackageInfo
      containerId="on-off-additional-need"
      headerTitle="One Off Additional Need"
      items={data?.additionalOneOffNeeds}
    />
    {goToPackage && (
      <Container className="review-package-details__items-actions" display="flex">
        <p onClick={() => goToPackage(getBrokerPackageRoute)} className="link-button">
          Edit or Remove
        </p>
      </Container>
    )}
  </Container>
);

export default OneOffAdditionalNeed;
