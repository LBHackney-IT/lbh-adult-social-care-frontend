import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { APPROVALS_ROUTE, getHistoryRoute, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import { approveCarePackage, cancelCarePackage, declineCarePackage, endCarePackage, stringIsNullOrEmpty, } from 'api';
import { useDispatch } from 'react-redux';
import { Container } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Loading from '../../../Loading';
import ActionCarePackageModal from '../../BrokerPortal/ActionCarePackageModal';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';
import PackageDetailsButtons from './PackageDetailsButtons';
import { SummaryTotalCostInfo } from './SummaryTotalCostInfo';
import { SummaryCostOfPlacement } from './SummaryCostOfPlacement';
import { FluidLinks } from './FluidLinks';
import { Summary } from './Summary';
import { ReviewHeader } from './ReviewHeader';

const initialNotes = {
  endNotes: '',
  cancelNotes: '',
  approveNotes: '',
  declineNotes: '',
};

const isNursingCarePackage = (packageType) =>
  !stringIsNullOrEmpty(packageType) && packageType.toLowerCase().includes('nursing');

const ReviewPackageDetails = ({
  userDetails,
  packageId,
  packageInfoItems = [],
  showEditActions,
  className = '',
  summaryData = [],
  openedPopup,
  buttons,
  setOpenedPopup,
  title,
  subTitle = 'Package details',
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const links = useMemo(
    () => [
      { text: 'Care Package', href: '#care-package' },
      { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
      { text: 'One Off Additional Need', href: '#on-off-additional-need' },
      { text: 'Funded Nursing Care', href: '#funded-nursing-care', hide: isNursingCarePackage(title) },
      { text: 'Care Charges', href: '#care-charges' },
      { text: 'Summary', href: '#summary' },
    ],
    [title]
  );

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

  const makeActionPackage = async (action, notes, route = '/') => {
    setLoading(true);
    try {
      await action(packageId, notes);
      router.push(route);
    } catch (e) {
      pushNotification('Something went wrong');
    }
    setLoading(false);
  };

  const endCarePackageActions = [
    {
      loading,
      title: 'End package',
      onClick: () =>
        makeActionPackage(endCarePackage, actionNotes.endNotes, getServiceUserPackagesRoute(userDetails.id)),
    },
    { title: 'Cancel', onClick: closePopup, className: 'link-button', color: 'red' },
  ];

  const approveCarePackageActions = [
    {
      loading,
      title: 'Approve',
      onClick: () => makeActionPackage(approveCarePackage, actionNotes.approveNotes, APPROVALS_ROUTE),
    },
    { title: 'Cancel', onClick: closePopup, className: 'link-button', color: 'red' },
  ];

  const declineCarePackageActions = [
    {
      loading,
      title: 'Decline',
      className: 'secondary-red',
      onClick: () => makeActionPackage(declineCarePackage, actionNotes.approveNotes, APPROVALS_ROUTE),
    },
    { title: 'Cancel', onClick: closePopup, className: 'link-button', color: 'gray' },
  ];

  const cancelCarePackageActions = [
    {
      loading,
      title: 'Cancel package',
      className: 'secondary-red',
      onClick: () =>
        makeActionPackage(cancelCarePackage, actionNotes.cancelNotes, getServiceUserPackagesRoute(userDetails.id)),
    },
    { title: 'Back', onClick: closePopup, className: 'link-button', color: 'gray' },
  ];

  const modalActions = [
    { title: `End package`, field: 'end', actions: endCarePackageActions },
    { title: 'Approve package', field: 'approve', actions: approveCarePackageActions },
    { title: 'Decline package', field: 'decline', actions: declineCarePackageActions },
    { title: `Cancel package`, field: 'cancel', actions: cancelCarePackageActions },
  ];

  const changeActionNotes = (field, value) => {
    setActionNotes((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  return (
    <div className={`review-package-details ${className}`}>
      <Loading isLoading={isLoading || loading} />
      {openedPopup === 'submit' && <SubmitForApprovalPopup packageId={packageId} closePopup={closePopup} />}
      {modalActions.map(({ title: modalTitle, field, actions }) => (
        <ActionCarePackageModal
          key={field}
          className="package-details__action-modal"
          title={modalTitle}
          close={closePopup}
          notes={actionNotes[`${field}Notes`]}
          setNotes={(value) => changeActionNotes(`${field}Notes`, value)}
          isOpened={openedPopup === field}
          actions={actions}
        />
      ))}
      <DynamicBreadcrumbs />
      <Container maxWidth="1080px" margin="0 auto" padding="0 60px 60px">
        <ReviewHeader
          buttons={buttons}
          goToHistory={goToHistory}
          showEditActions={showEditActions}
          title={title}
          subTitle={subTitle}
        />
        <PackageUserDetails {...userDetails} />
        <Container className="review-package-details__main-container">
          <FluidLinks links={links} />
          <Container className="review-package-details__cost-info">
            {packageInfoItems.map(
              ({
                goToPackage,
                id: itemId,
                headerTitle,
                items,
                totalCost,
                checkHide,
                totalCostHeader,
                costOfPlacement,
                totalCostInfo,
              }) => {
                if (checkHide && isNursingCarePackage(title)) return null;

                return (
                  <Container key={itemId} className="review-package-details__cost-info-item">
                    <PackageInfo
                      goToPackage={goToPackage}
                      containerId={itemId}
                      headerTitle={headerTitle}
                      items={items}
                    />
                    <SummaryCostOfPlacement costOfPlacement={costOfPlacement} />
                    {!!totalCost && <BrokerageBorderCost totalCost={totalCost} totalCostHeader={totalCostHeader} />}
                    <SummaryTotalCostInfo totalCostInfo={totalCostInfo} />
                    {goToPackage && (
                      <Container className="review-package-details__items-actions" display="flex">
                        <p onClick={goToPackage} className="link-button">
                          Edit or Remove
                        </p>
                      </Container>
                    )}
                  </Container>
                );
              }
            )}
            <Summary isHide={() => isNursingCarePackage(title)} summaryData={summaryData} />
            <PackageDetailsButtons buttons={buttons} />
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewPackageDetails;
