import React, { useState } from 'react';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, Link } from '../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import { useRouter } from 'next/router';
import ReviewPackageInfo from './ReviewPackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { currency } from '../../../constants/strings';

export const ReviewPackageDetails = ({ userDetails, packageInfoItems = [], summary = [], }) => {
  const router = useRouter();

  const [links] = useState([
    { text: 'Care Package', href: 'care-package' },
    { text: 'Weekly Additional Need', href: 'weekly-additional-need' },
    { text: 'One Off Additional Need', href: 'on-off-additional-need' },
    { text: 'Care charges', href: 'care-charges' },
    { text: 'Summary', href: 'summary' },
  ]);

  const goBack = () => router.back();

  const editItem = itemId => alert(`Edit package info id: ${itemId}`);

  const removeItem = itemId => alert(`Remove package info id: ${itemId}`);

  const submitForApproval = () => alert('Submit for approval');

  return (
    <div className="review-package-details">
      <BrokerageHeader/>
      <Container className="brokerage__container-main">
        <Container className="brokerage__container-header brokerage__container">
          <p>Build a care package</p>
          <h2>Review package details</h2>
        </Container>
        <PackageUserDetails {...userDetails} />
        <Container className="review-package-details__main-container">
          <Container className="review-package-details__links">
            {links.map(link => (
              <p key={link.text}>— <Link href={link.href}>{link.text}</Link></p>
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
            }) => (
              <Container key={headerTitle} className="review-package-details__cost-info-item">
                <ReviewPackageInfo headerTitle={headerTitle} items={items}/>
                {costOfPlacement &&
                <p className="brokerage__cost-of-placement">
                  Cost of placement
                  <span className="text-lbh-f01 font-weight-bold">{currency.euro}{costOfPlacement}</span>
                </p>
                }
                {totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader}/>}
                {totalCost &&
                <Container className="review-package-details__items-actions" display="flex">
                  <p onClick={() => editItem(itemId)} className="link-button">Edit</p>
                  <p onClick={() => removeItem(itemId)} className="link-button red">Remove</p>
                </Container>
                }
              </Container>
            ))}
            <Container className="review-package-details__summary">
              <h3 className="font-weight-bold">Summary</h3>
              {summary.map(({ key, value, className }) => (
                <BrokerageBorderCost totalCost={value} totalCostHeader={key} className={`${className} without-border`}/>
              ))}
            </Container>
            <Container className="review-package-details__actions" display="flex">
              <Button handler={goBack}>Back</Button>
              <Button handler={submitForApproval}>Submit for approval</Button>
            </Container>
          </Container>
        </Container>
      </Container>
    </div>
  );
};