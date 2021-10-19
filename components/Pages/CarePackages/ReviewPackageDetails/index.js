import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  BROKER_PORTAL_ROUTE,
  getBrokerPackageRoute,
  getCorePackageRoute,
  getHistoryRoute
} from '../../../../routes/RouteConstants';
import BrokerageHeader from '../BrokerageHeader/BrokerageHeader';
import { Button, Container, Link, Breadcrumbs } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import { currency } from '../../../../constants/strings';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import ReviewPackageDetailsButtons from './ReviewPackageDetailsButtons';
import { EndElementModal } from '../../CareCharges/EndElementModal';
import { CancelElementModal } from '../../CareCharges/CancelElementModal';
import ActionCarePackageModal from '../../BrokerPortal/ActionCarePackageModal';

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

export const ReviewPackageDetails = ({
  userDetails,
  packageId,
  packageInfoItems = [],
  showEditActions,
  className = '',
  summary = [],
  title = 'Nursing Care',
  subTitle = 'Package details',
  goBack,
}) => {
  const [openedPopup, setOpenedPopup] = useState('');

  const router = useRouter();

  const [actionNotes, setActionNotes] = useState({
    endNotes: '',
    cancelNotes: '',
  });

  const goToBrokerPackage = () => router.push(getBrokerPackageRoute(packageId));
  const goToHistory = () => router.push(getHistoryRoute(packageId));

  const closePopup = () => setOpenedPopup('');

  const end = () => setOpenedPopup('end');
  const cancel = () => setOpenedPopup('cancel');
  const edit = () => router.push(getCorePackageRoute(packageId));

  const cancelCarePackageActions = [
    { title: 'End package', onClick: () => alert('end package') },
    { title: 'Cancel', onClick: closePopup, className: 'link-button red' },
  ];

  const endCarePackageActions = [
    { title: 'Cancel package', className: 'color-lbh-e01', onClick: () => alert('end package') },
    { title: 'Back', onClick: closePopup, className: 'link-button black' },
  ];

  const changeActionNotes = (field, value) => {
    setActionNotes(prevState => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className={`review-package-details ${className}`}>
      {openedPopup === 'submit' && <SubmitForApprovalPopup packageId={packageId} closePopup={closePopup}/>}
      <ActionCarePackageModal
        className='package-details__action-modal'
        title={`End ${title.toLowerCase()} package`}
        close={closePopup}
        notes={actionNotes.endNotes}
        setNotes={(value) => changeActionNotes('endNotes', value)}
        isOpened={openedPopup === 'end'}
        actions={endCarePackageActions}
      />
      <ActionCarePackageModal
        className='package-details__action-modal'
        notes={actionNotes.cancelNotes}
        setNotes={(value) => changeActionNotes('cancelNotes', value)}
        title={`Cancel ${title.toLowerCase()} package`}
        isOpened={openedPopup === 'cancel'}
        close={closePopup}
        actions={cancelCarePackageActions}
      />
      <BrokerageHeader/>
      <Container maxWidth="1080px" margin="0 auto" padding="8px 60px 0 60px">
        <Breadcrumbs values={breadcrumbs}/>
      </Container>
      <Container maxWidth="1080px" margin="0 auto" padding="60px">
        <Container className="brokerage__container-header brokerage__container">
          <Container>
            <p>{title}</p>
            <h2>
              {subTitle}{' '}
              <span onClick={goToHistory} className="text-blue font-size-19px package-history-link">
            Package history
          </span>
            </h2>
          </Container>
          {showEditActions && <ReviewPackageDetailsButtons end={end} edit={edit} cancel={cancel}/>}
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
                  <PackageInfo details={details} containerId={itemId} headerTitle={headerTitle} items={items}/>
                  {!!costOfPlacement && (
                    <p className="brokerage__cost-of-placement">
                      Cost of placement
                      <span className="text-lbh-f01 font-weight-bold">
                        {currency.euro}
                        {costOfPlacement.toFixed(2)}
                      </span>
                    </p>
                  )}
                  {!!totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader}/>}
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
                <BrokerageTotalCost key={id} value={value} name={key} className={className}/>
              ))}
            </Container>
            {showEditActions ? (
              <ReviewPackageDetailsButtons end={end} edit={edit} cancel={cancel}/>
            ) : (
              <Container className="review-package-details__actions" display="flex">
                <Button handler={goBack}>Back</Button>
                <Button handler={() => setOpenedPopup('submit')}>Submit for approval</Button>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </div>
  );
};
