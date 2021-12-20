import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { APPROVALS_ROUTE, getHistoryRoute, getServiceUserPackagesRoute } from 'routes/RouteConstants';
import { approveCarePackage, cancelCarePackage, declineCarePackage, endCarePackage, stringIsNullOrEmpty, } from 'api';
import { usePushNotification } from 'service';
import { Container } from '../../../HackneyDS';
import PackageUserDetails from '../PackageUserDetails';
import PackageInfo from './PackageInfo';
import BrokerageBorderCost from '../BrokerageBorderCost';
import SubmitForApprovalPopup from '../BrokerageSubmitForApprovalPopup/SubmitForApprovalPopup';
import Loading from '../../../Loading';
import ActionCarePackageModal from '../../Brokerage/ActionCarePackageModal';
import DynamicBreadcrumbs from '../../DynamicBreadcrumbs';
import PackageDetailsButtons from './PackageDetailsButtons';
import { SummaryTotalCostInfo } from './SummaryTotalCostInfo';
import { SummaryCostOfPlacement } from './SummaryCostOfPlacement';
import { FluidLinks } from './FluidLinks';
import { Summary } from './Summary';
import { ReviewHeader } from './ReviewHeader';
import EndDetailsModal from '../../Details/EndModal';
import { dateToIsoString } from '../../../../service';

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
  packageData,
  packageId,
  packageInfoItems = [],
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
  const pushNotification = usePushNotification();
  const [loading, setLoading] = useState(false);

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

  const closePopup = () => {
    setOpenedPopup('');
    setActionNotes({ ...initialNotes });
  };

  const makeActionPackage = async (action, notes, route = '/') => {
    setLoading(true);
    try {
      await action(packageId, notes);
      router.push(route);
    } catch (e) {
      pushNotification(e);
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
    { title: 'Back', onClick: closePopup, className: 'link-button', color: 'gray' },
    {
      loading,
      title: 'Cancel package',
      className: 'secondary-red',
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
          additionalButtons={additionalButtons}
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
                if (checkHide && onCheckHide()) return null;

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
            <Summary summaryData={summaryData} />
            <PackageDetailsButtons buttons={buttons} />
          </Container>
        </Container>
      </Container>
    </div>
  );
};

export default ReviewPackageDetails;
