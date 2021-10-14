import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { BROKER_PORTAL_ROUTE, getBrokerPackageRoute } from '../../../../routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, Link, Breadcrumbs } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { currency } from '../../../../constants/strings';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';

const links = [
  { text: 'Care Package', href: '#care-package' },
  { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
  { text: 'One Off Additional Need', href: '#on-off-additional-need' },
  { text: 'Funded Nursing Care', href: '#funded-nursing-care' },
  { text: 'Care charges', href: '#care-charges' },
  { text: 'Summary', href: '#summary' },
];

const breadcrumbs = [
  { text: 'Home', href:  '/' },
  { text: 'Broker Portal', href: BROKER_PORTAL_ROUTE },
  { text: 'Full overview' },
];

export const ReviewPackageDetails = ({
  userDetails,
  packageId,
  packageInfoItems = [],
  summary = [],
  supplierName,
  title = 'Nursing Care',
  subTitle = 'Package details',
}) => {
  const router = useRouter();
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  const goBack = () => router.back();

  const redirectToBrokerPackage = () => {
    router.push({
      pathname: getBrokerPackageRoute(packageId),
      query: { supplierName },
    });
  };

  return (
    <div className="review-package-details">
      {isOpenedPopup && (
        <SubmitForApprovalPopup
          packageId={packageId}
          closePopup={() => setIsOpenedPopup(false)}
        />
      )}
      <BrokerageHeader serviceName='' />
      <Container maxWidth="1080px" margin="0 auto" padding='8px 60px 0 60px'>
        <Breadcrumbs values={breadcrumbs} />
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        <Container className="brokerage__container-header brokerage__container">
          <p>{title}</p>
          <h2>{subTitle} <span className="text-blue font-size-19px">Package history</span></h2>
        </Container>
        <PackageUserDetails {...userDetails} />
        <Container className="review-package-details__main-container">
          <Container className="review-package-details__links">
            {links.map(link => (
              <p key={link.text}>— <Link className="link-button" href={link.href}>{link.text}</Link></p>
            ))}
          </Container>
          <Container className="review-package-details__cost-info">
            {packageInfoItems.map(({
              id: itemId,
              headerTitle,
              items,
              totalCost,
              totalCostHeader,
              costOfPlacement,
              totalCostComponent,
              details,
            }) => {
              return (
                <Container key={itemId} className="review-package-details__cost-info-item">
                  <PackageInfo details={details} containerId={itemId} headerTitle={headerTitle} items={items}/>
                  {!!costOfPlacement &&
                  <p className="brokerage__cost-of-placement">
                    Cost of placement
                    <span className="text-lbh-f01 font-weight-bold">{currency.euro}{costOfPlacement.toFixed(2)}</span>
                  </p>
                  }
                  {!!totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader}/>}
                  {totalCostComponent}
                  {!!totalCost &&
                  <Container className="review-package-details__items-actions" display="flex">
                    <p onClick={() => redirectToBrokerPackage()} className="link-button">Edit</p>
                    <p onClick={() => redirectToBrokerPackage()} className="link-button red">Remove</p>
                  </Container>
                  }
                </Container>
              );
            })}
            <Container className="review-package-details__summary">
              <h3 id="summary" className="font-weight-bold">Summary</h3>
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