import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import {
  APPROVALS_ROUTE,
  getHistoryRoute,
  getPaymentHistoryRoute,
  getServiceUserPackagesRoute,
} from 'routes/RouteConstants';
import { dateToIsoString } from 'service';
import { addNotification } from 'reducers/notificationsReducer';
import { approveCarePackage, cancelCarePackage, declineCarePackage, endCarePackage, stringIsNullOrEmpty } from 'api';
import { useDispatch } from 'react-redux';
import { Container } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Loading from '../../../Loading';
import ActionCarePackageModal from '../../Brokerage/ActionCarePackageModal';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';
import PackageDetailsButtons from './PackageDetailsButtons';
import { FluidLinks } from './FluidLinks';
import { Summary } from './Summary';
import { ReviewHeader } from './ReviewHeader';
import EndDetailsModal from '../../Details/EndModal';
import FncInfo from './FncInfo';
import CarePackageInfo from './CarePackageInfo';
import WeeklyAdditionalNeed from './WeeklyAdditionalNeed';
import OneOffAdditionalNeed from './OneOffAdditionalNeed';
import CareChargeReclaim from './CareChargeReclaim';

const initialNotes = {
  endNotes: '',
  cancelNotes: '',
  approveNotes: '',
  declineNotes: '',
};

const isNursingCarePackage = (packageType) =>
  !stringIsNullOrEmpty(packageType) && packageType.toLowerCase().includes('nursing');

const ReviewPackageDetails = ({
  data,
  userDetails,
  packageData,
  packageId,
  isVisibleLink = true,
  showEditActions,
  className = '',
  summaryData = [],
  openedPopup,
  buttons,
  setOpenedPopup,
  title,
  additionalButtons,
  subTitle = 'Package details',
  isLoading,
}) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const pushRoute = (getRoute) => router.push(getRoute(packageId));
  const goToPackage = isVisibleLink && pushRoute;

  const onCheckHide = () => !isNursingCarePackage(title);

  const links = useMemo(
    () => [
      { text: 'Care Package', href: '#care-package' },
      { text: 'Weekly Additional Need', href: '#weekly-additional-need' },
      { text: 'One Off Additional Need', href: '#on-off-additional-need' },
      { text: 'Funded Nursing Care', href: '#funded-nursing-care', hide: onCheckHide },
      { text: 'Care Charges', href: '#care-charges' },
      { text: 'Summary', href: '#summary' },
    ],
    [title]
  );

  const router = useRouter();

  const [actionNotes, setActionNotes] = useState(initialNotes);

  const goToHistory = () => router.push(getHistoryRoute(packageId));
  const goToPaymentHistory = () => router.push(getPaymentHistoryRoute(packageId));

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

  const endCarePackageAction = async ({ notes, endDate }) => {
    setLoading(true);
    try {
      await endCarePackage({ packageId, notes, endDate: dateToIsoString(endDate) });
      router.push(getServiceUserPackagesRoute(userDetails.id));
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  const approveCarePackageActions = [
    { title: 'Cancel', onClick: closePopup, className: 'link-button', color: 'red' },
    {
      loading,
      title: 'Approve',
      onClick: () => makeActionPackage(approveCarePackage, actionNotes.approveNotes, APPROVALS_ROUTE),
    },
  ];

  const declineCarePackageActions = [
    { title: 'Cancel', onClick: closePopup, className: 'link-button', color: 'gray' },
    {
      loading,
      title: 'Decline',
      className: 'secondary-red',
      onClick: () => makeActionPackage(declineCarePackage, actionNotes.approveNotes, APPROVALS_ROUTE),
    },
  ];

  const cancelCarePackageActions = [
    { title: 'Back', onClick: closePopup, className: 'outline secondary-gray large-button' },
    {
      loading,
      title: 'Cancel package',
      className: 'secondary-red large-button',
      onClick: () =>
        makeActionPackage(cancelCarePackage, actionNotes.cancelNotes, getServiceUserPackagesRoute(userDetails.id)),
    },
  ];

  const modalActions = [
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
      <EndDetailsModal
        onClose={closePopup}
        packageData={packageData}
        endPackage={endCarePackageAction}
        isOpen={openedPopup === 'end'}
      />
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
          goToPaymentHistory={goToPaymentHistory}
          additionalButtons={additionalButtons}
          showEditActions={showEditActions}
          title={title}
          subTitle={subTitle}
        />
        <PackageUserDetails {...userDetails} />
        <Container className="review-package-details__main-container">
          <FluidLinks links={links} />
          <Container className="review-package-details__cost-info">
            <CarePackageInfo goToPackage={goToPackage} data={data} />
            <WeeklyAdditionalNeed data={data} goToPackage={goToPackage} />
            <OneOffAdditionalNeed data={data} goToPackage={goToPackage} />
            <FncInfo data={data} goToPackage={goToPackage} onCheckHide={onCheckHide} />
            <CareChargeReclaim data={data} goToPackage={goToPackage} />
            <Summary summaryData={summaryData} />
            <PackageDetailsButtons buttons={buttons} />
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewPackageDetails;
