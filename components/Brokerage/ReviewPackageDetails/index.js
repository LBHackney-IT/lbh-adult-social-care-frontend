import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getBrokerPackageRoute } from 'routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, Link } from '../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import ReviewPackageInfo from './ReviewPackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { currency } from '../../../constants/strings';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';

export const ReviewPackageDetails = ({ userDetails, packageInfoItems = [], summary = [], supplierName }) => {
  const router = useRouter();
  const packageId = router.query.id;
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  const [links] = useState([
    { text: 'Care Package', href: '#care-package' },
    { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
    { text: 'One Off Additional Need', href: '#on-off-additional-need' },
    { text: 'Care charges', href: '#care-charges' },
    { text: 'Summary', href: '#summary' },
  ]);

  const goBack = () => router.back();

  const redirectToBrokerPackage = () => {
    router.push({
      pathname: getBrokerPackageRoute(packageId),
      query: { supplierName },
    });
  };

  return (
    <div className="review-package-details">
      {isOpenedPopup && <SubmitForApprovalPopup packageId={packageId} closePopup={() => setIsOpenedPopup(false)} />}
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        <Container className="brokerage__container-header brokerage__container">
          <p>Build a care package</p>
          <h2>Review package details</h2>
        </Container>
        <PackageUserDetails {...userDetails} />
        <Container className="review-package-details__main-container">
          <Container className="review-package-details__links">
            {links.map((link) => (
              <p key={link.text}>
                —{' '}
                <Link className="link-button" href={link.href}>
                  {link.text}
                </Link>
              </p>
            ))}
          </Container>
          <Container className="review-package-details__cost-info">
            {packageInfoItems.map(
              ({ id: itemId, headerTitle, items, totalCost, totalCostHeader, costOfPlacement, totalCostComponent }) => (
                <Container key={itemId} className="review-package-details__cost-info-item">
                  <ReviewPackageInfo containerId={itemId} headerTitle={headerTitle} items={items} />
                  {costOfPlacement && (
                    <p className="brokerage__cost-of-placement">
                      Cost of placement
                      <span className="text-lbh-f01 font-weight-bold">
                        {currency.euro}
                        {costOfPlacement}
                      </span>
                    </p>
                  )}
                  {totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader} />}
                  {totalCostComponent && totalCostComponent}
                  {totalCost && (
                    <Container className="review-package-details__items-actions" display="flex">
                      <p onClick={() => redirectToBrokerPackage()} className="link-button">
                        Edit
                      </p>
                      <p onClick={() => redirectToBrokerPackage()} className="link-button red">
                        Remove
                      </p>
                    </Container>
                  )}
                </Container>
              )
            )}
            <Container className="review-package-details__summary">
              <h3 id="summary" className="font-weight-bold">
                Summary
              </h3>
              {summary.map(({ key, value, className, id }) => (
                <BrokerageTotalCost key={id} value={value} name={key} className={className} />
              ))}
            </Container>
            <Container className="review-package-details__actions" display="flex">
              <Button handler={goBack}>Back</Button>
              <Button handler={() => setIsOpenedPopup(true)}>Submit for approval</Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};
