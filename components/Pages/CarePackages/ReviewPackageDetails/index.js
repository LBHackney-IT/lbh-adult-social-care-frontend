import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { currency } from 'constants/strings';
import { getHistoryRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { approveCarePackage, cancelCarePackage, declineCarePackage, endCarePackage } from 'api';
import { useDispatch } from 'react-redux';
import BrokerageHeader from '../BrokerageHeader';
import { Container, Link, Breadcrumbs } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import TitleSubtitleHeader from '../TitleSubtitleHeader';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import BrokerageTotalCost from '../BrokerageTotalCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Loading from '../../../Loading';
import ActionCarePackageModal from '../../BrokerPortal/ActionCarePackageModal';
import PackageDetailsButtons from './PackageDetailsButtons';

const links = [
  { text: 'Care Package', href: '#care-package' },
  { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
  { text: 'One Off Additional Need', href: '#on-off-additional-need' },
  { text: 'Funded Nursing Care', href: '#funded-nursing-care' },
  { text: 'Care charges', href: '#care-charges' },
  { text: 'Summary', href: '#summary' },
];

const initialNotes = {
  endNotes: '',
  cancelNotes: '',
  approveNotes: '',
  declineNotes: '',
};

const ReviewPackageDetails = ({
  userDetails,
  packageId,
  packageInfoItems = [],
  showEditActions,
  className = '',
  summary = [],
  openedPopup,
  buttons,
  breadcrumbs,
  setOpenedPopup,
  title = 'Nursing Care',
  subTitle = 'Package details',
  loading: isLoading,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const [actionNotes, setActionNotes] = useState(initialNotes);

  const goToHistory = () => router.push(getHistoryRoute(packageId));

  const closePopup = () => {
    setOpenedPopup('');
    setActionNotes({ ...initialNotes });
  };

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

  const approveCarePackageActions = [
    {
      loading,
      title: 'Approve',
      onClick: () => makeActionPackage(approveCarePackage, actionNotes.approveNotes)
    },
    { title: 'Cancel', onClick: closePopup, className: 'link-button red' },
  ];

  const declineCarePackageActions = [
    {
      loading,
      title: 'Decline',
      className: 'secondary-red',
      onClick: () => makeActionPackage(declineCarePackage, actionNotes.approveNotes)
    },
    { title: 'Cancel', onClick: closePopup, className: 'link-button black' },
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

  const modalActions = [
    { title: `End ${title.toLowerCase()} package`, field: 'end', actions: endCarePackageActions },
    { title: 'Approve package', field: 'approve', actions: approveCarePackageActions },
    { title: 'Decline package', field: 'decline', actions: declineCarePackageActions },
    { title: `Cancel ${title.toLowerCase()} package`, field: 'cancel', actions: cancelCarePackageActions },
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
      {modalActions.map(({ title: modalTitle, field, actions }) => (
        <ActionCarePackageModal
          key={field}
          className='package-details__action-modal'
          title={modalTitle}
          close={closePopup}
          notes={actionNotes[`${field}Notes`]}
          setNotes={(value) => changeActionNotes(`${field}Notes`, value)}
          isOpened={openedPopup === field}
          actions={actions}
        />
      ))}
      <BrokerageHeader/>
      <Container maxWidth="1080px" margin="10px auto 0" padding="0 60px">
        <Breadcrumbs values={breadcrumbs} />
      </Container>
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
            {showEditActions && <PackageDetailsButtons buttons={buttons} />}
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
                totalCostInfo,
                careChargeClaimCollector,
                fncDetails,
              }) => (
                <Container key={itemId} className="review-package-details__cost-info-item">
                  <PackageInfo
                    fncDetails={fncDetails}
                    careChargeClaimCollector={careChargeClaimCollector}
                    containerId={itemId}
                    headerTitle={headerTitle}
                    items={items}
                  />
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
                  {totalCostInfo && (
                    <>
                      {totalCostInfo?.hackney !== undefined && totalCostInfo?.hackney !== 0 && (
                        <BrokerageBorderCost
                          totalCost={totalCostInfo?.hackney.toFixed(2)}
                          totalCostHeader="Total (Gross)"
                        />
                      )}
                      {totalCostInfo?.supplier !== undefined && totalCostInfo?.hackney !== undefined && <br/>}
                      {totalCostInfo?.supplier !== undefined && totalCostInfo?.supplier !== 0 && (
                        <BrokerageBorderCost
                          totalCost={totalCostInfo?.supplier.toFixed(2)}
                          totalCostHeader="Total (Net Off)"
                        />
                      )}
                    </>
                  )}
                  {goToPackage && (
                    <Container className="review-package-details__items-actions" display="flex">
                      <p onClick={goToPackage} className="link-button">
                        Edit
                      </p>
                      <p onClick={goToPackage} className="link-button red">
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
            <PackageDetailsButtons buttons={buttons} />
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewPackageDetails;
