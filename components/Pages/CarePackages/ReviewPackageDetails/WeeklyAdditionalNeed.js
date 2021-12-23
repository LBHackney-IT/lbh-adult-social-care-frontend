import React from 'react';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import { Container } from '../../../HackneyDS';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';

const WeeklyAdditionalNeed = ({ data, goToPackage }) => (
  <Container className="review-package-details__cost-info-item">
    <PackageInfo
      containerId='weekly-additional-need'
      headerTitle='Weekly Additional Need'
      items={data?.additionalWeeklyNeeds1}
    />
    {data?.additionalWeeklyCost > 0 && (
      <BrokerageBorderCost totalCost={data?.additionalWeeklyCost} totalCostHeader='Total (Net Off)' />
    )}
    {goToPackage && (
      <Container className="review-package-details__items-actions" display="flex">
        <p onClick={() => goToPackage(getBrokerPackageRoute)} className="link-button">
          Edit or Remove
        </p>
      </Container>
    )}
  </Container>
);

export default WeeklyAdditionalNeed;