import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE, getBrokerPackageRoute, getHistoryRoute } from '../../../../routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader';
import { Button, Container, Link, Breadcrumbs } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { currency } from '../../../../constants/strings';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Loading from '../../../Loading';

const links = [
  { text: 'Care Package', href: '#care-package' },
  { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
  { text: 'One Off Additional Need', href: '#on-off-additional-need' },
  { text: 'Funded Nursing Care', href: '#funded-nursing-care' },
  { text: 'Care charges', href: '#care-charges' },
  { text: 'Summary', href: '#summary' },
];

const breadcrumbs = [
  { text: 'Home', href: '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Full overview' },
];

const ReviewPackageDetails = ({
  userDetails,
  packageId,
  packageInfoItems = [],
  summary = [],
  title = 'Nursing Care',
  subTitle = 'Package details',
  goBack,
  loading,
}) => {
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  const router = useRouter();

  const goToBrokerPackage = () => router.push(getBrokerPackageRoute(packageId));
  const goToHistory = () => router.push(getHistoryRoute(packageId));

  return (
    <div className="review-package-details">
      <Loading isLoading={loading} />
      {isOpenedPopup && <SubmitForApprovalPopup packageId={packageId} closePopup={() => setIsOpenedPopup(false)} />}
      <BrokerageHeader />
      <Container maxWidth="1080px" margin="0 auto" padding="10px 60px 0">
        <Breadcrumbs values={breadcrumbs} />
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px">
        <TitleSubtitleHeader
          title={title}
          subTitle={subTitle}
          link={
            <span onClick={goToHistory} className="text-blue font-size-19px package-history-link">
              Package history
            </span>
          }
        />
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
              ({
                id: itemId,
                headerTitle,
                items,
                totalCost,
                totalCostHeader,
                costOfPlacement,
                totalCostComponent,
                details,
              }) => (
                <Container key={itemId} className="review-package-details__cost-info-item">
                  <PackageInfo details={details} containerId={itemId} headerTitle={headerTitle} items={items} />
                  {!!costOfPlacement && (
                    <p className="brokerage__cost-of-placement">
                      Cost of placement
                      <span className="text-lbh-f01 font-weight-bold">
                        {currency.euro}
                        {costOfPlacement.toFixed(2)}
                      </span>
                    </p>
                  )}
                  {!!totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader} />}
                  {totalCostComponent}
                  {!!totalCost && (
                    <Container className="review-package-details__items-actions" display="flex">
                      <p onClick={goToBrokerPackage} className="link-button">
                        Edit
                      </p>
                      <p onClick={goToBrokerPackage} className="link-button red">
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
              <Button onClick={goBack}>Back</Button>
              <Button onClick={() => setIsOpenedPopup(true)}>Submit for approval</Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewPackageDetails;
