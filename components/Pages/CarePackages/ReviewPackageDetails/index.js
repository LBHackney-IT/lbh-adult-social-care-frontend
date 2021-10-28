import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { currency } from 'constants/strings';
import {
  getCorePackageRoute,
  getHistoryRoute
} from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { cancelCarePackage, endCarePackage } from 'api';
import { useDispatch } from 'react-redux';
import BrokerageHeader from '../BrokerageHeader';
import { Button, Container, Link } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Loading from '../../../Loading';
import ReviewPackageDetailsButtons from './ReviewPackageDetailsButtons';
import ActionCarePackageModal from '../../BrokerPortal/ActionCarePackageModal';
import CarePackageBreadcrumbs from '../CarePackageBreadcrumbs';

const links = [
  { text: 'Care Package', href: '#care-package' },
  { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
  { text: 'One Off Additional Need', href: '#on-off-additional-need' },
  { text: 'Funded Nursing Care', href: '#funded-nursing-care' },
  { text: 'Care charges', href: '#care-charges' },
  { text: 'Summary', href: '#summary' },
];

const ReviewPackageDetails = ({
  userDetails,
  packageId,
  packageInfoItems = [],
  showEditActions,
  className = '',
  summary = [],
  title = 'Nursing Care',
  subTitle = 'Package details',
  goBack,
  loading: isLoading,
}) => {
  const dispatch = useDispatch();
  const [openedPopup, setOpenedPopup] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [actionNotes, setActionNotes] = useState({
    endNotes: '',
    cancelNotes: '',
  });

  const goToHistory = () => router.push(getHistoryRoute(packageId));

  const closePopup = () => setOpenedPopup('');

  const end = () => setOpenedPopup('end');
  const cancel = () => setOpenedPopup('cancel');
  const edit = () => router.push(getCorePackageRoute(packageId));

  const pushNotification = (text, notificationClassName = 'error') => {
    dispatch(addNotification({ text, notificationClassName }));
  };

  const makeActionPackage = async (action, notes) => {
    setLoading(true);
    try {
      await action(packageId, notes);
      router.push('/');
    } catch (e) {
      pushNotification('Something went wrong');
    }
    setLoading(false);
  }

  const endCarePackageActions = [
    {
      loading,
      title: 'End package',
      onClick: () => makeActionPackage(endCarePackage, actionNotes.endNotes)
    },
    { title: 'Cancel', onClick: closePopup, className: 'link-button red' },
  ];

  const cancelCarePackageActions = [
    {
      loading,
      title: 'Cancel package',
      className: 'secondary-red',
      onClick: () => makeActionPackage(cancelCarePackage, actionNotes.cancelNotes)
    },
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
      <Loading isLoading={isLoading} />
      {openedPopup === 'submit' && <SubmitForApprovalPopup packageId={packageId} closePopup={closePopup} />}
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
      <CarePackageBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <Container className="brokerage__container-header brokerage__container">
          <TitleSubtitleHeader
            width=''
            title={title}
            subTitle={subTitle}
            link={
              <span onClick={goToHistory} className="text-blue font-size-19px package-history-link">
                Package history
              </span>
            }
          >
            {showEditActions && <ReviewPackageDetailsButtons end={end} edit={edit} cancel={cancel} />}
          </TitleSubtitleHeader>
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
                goToPackage,
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
                  {goToPackage && (
                    <Container className="review-package-details__items-actions" display="flex">
                      <p onClick={() => goToPackage(packageId)} className="link-button">
                        Edit
                      </p>
                      <p onClick={() => goToPackage(packageId)} className="link-button red">
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
              {summary.map(({ key, value, className: itemClassName, id }) => (
                <BrokerageTotalCost key={id} value={value} name={key} className={itemClassName} />
              ))}
            </Container>
            {showEditActions ? (
              <ReviewPackageDetailsButtons end={end} edit={edit} cancel={cancel} />
            ) : (
              <Container className="review-package-details__actions" display="flex">
                <Button className='secondary-gray' onClick={goBack}>Back</Button>
                <Button onClick={() => setOpenedPopup('submit')}>Submit for approval</Button>
              </Container>
            )}
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewPackageDetails;
