import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { getBrokerPackageRoute } from '../../../routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, Link } from '../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { currency } from '../../../constants/strings';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Breadcrumbs from '../../Breadcrumbs';

export const ReviewPackageDetails = ({ userDetails, packageInfoItems = [], summary = [], supplierName }) => {
  const router = useRouter();
  const packageId = router.query.guid;
  const [isOpenedPopup, setIsOpenedPopup] = useState(false);

  const [links] = useState([
    { text: 'Care Package', href: '#care-package' },
    { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
    { text: 'One Off Additional Need', href: '#on-off-additional-need' },
    { text: 'Funded Nursing Care', href: '#funded-nursing-care' },
    { text: 'Care charges', href: '#care-charges' },
    { text: 'Summary', href: '#summary' },
  ]);

  const [breadcrumbs] = useState([
    { text: 'Home', onClick: () => router.push('/') },
    { text: 'Broker Portal', onClick: () => router.push(BROKERAGE_HUB_ROUTE) },
    { text: 'Full overview' },
  ]);

  const goBack = () => router.back();

  const redirectToBrokerPackage = () => {
    router.push({
      pathname: getBrokerPackageRoute(packageId),
      query: { supplierName },
    });
  };

  return (
    <div className="package-details">
      {isOpenedPopup && (
        <SubmitForApprovalPopup
          packageId={packageId}
          closePopup={() => setIsOpenedPopup(false)}
        />
      )}
      <BrokerageHeader/>
      <Container padding='8px 60px 0 60px'>
        <Breadcrumbs values={breadcrumbs}/>
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        <Container className="brokerage__container-header brokerage__container">
          <p>Nursing Care</p>
          <h2>Package details <span className="text-blue font-size-19px">Package history</span></h2>
        </Container>
        <PackageUserDetails {...userDetails} />
        <Container className="package-details__main-container">
          <Container className="package-details__links">
            {links.map(link => (
              <p key={link.text}>— <Link className="link-button" href={link.href}>{link.text}</Link></p>
            ))}
          </Container>
          <Container className="package-details__cost-info">
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
                <Container key={itemId} className="package-details__cost-info-item">
                  <PackageInfo details={details} containerId={itemId} headerTitle={headerTitle} items={items}/>
                  {!!costOfPlacement &&
                  <p className="brokerage__cost-of-placement">
                    Cost of placement
                    <span className="text-lbh-f01 font-weight-bold">{currency.euro}{costOfPlacement}</span>
                  </p>
                  }
                  {!!totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader}/>}
                  {totalCostComponent}
                  {!!totalCost &&
                  <Container className="package-details__items-actions" display="flex">
                    <p onClick={() => redirectToBrokerPackage()} className="link-button">Edit</p>
                    <p onClick={() => redirectToBrokerPackage()} className="link-button red">Remove</p>
                  </Container>
                  }
                </Container>
              );
            })}
            <Container className="package-details__summary">
              <h3 id="summary" className="font-weight-bold">Summary</h3>
              {summary.map(({ key, value, className, id }) => (
                <BrokerageTotalCost key={id} value={value} name={key} className={className} />
              ))}
            </Container>
            <Container className="package-details__actions" display="flex">
              <Button handler={goBack}>Back</Button>
              <Button handler={() => setIsOpenedPopup(true)}>Submit for approval</Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};