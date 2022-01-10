import React, { useEffect, useState } from 'react';
import { usePackageDetails, usePackageSummary } from 'api';
import { useRouter } from 'next/router';
import { ReviewPackageDetails } from 'components';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import withSession from 'lib/session';
import {
  getCarePackageCareChargeRoute,
  getCarePackageReviewRoute,
  getCorePackageRoute,
  getHistoryRoute,
  getPaymentHistoryRoute,
} from 'routes/RouteConstants';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes, userRoles } from '../../api/accessMatrix';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.CARE_PACKAGE_DETAILS)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const PackageDetailsPage = ({ roles }) => {
  const router = useRouter();
  const carePackageId = router.query.guid;

  useEffect(() => {
    if (!roles.includes(userRoles.ROLE_BROKERAGE)) {
      router.push(getCarePackageReviewRoute(carePackageId));
    }
  }, []);

  const { data, isLoading: packageSummaryLoading } = usePackageSummary(carePackageId);
  const {
    data: { startDate, endDate },
    isLoading: detailsLoading,
  } = usePackageDetails(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');
  const editableStatus = data?.status < 6;
  const isApprovedStatus = data?.status === 4;

  const { isLoading: coreLoading, data: packageData } = useRedirectIfPackageNotExist();

  const end = () => setOpenedPopup('end');
  const cancel = () => setOpenedPopup('cancel');
  const edit = () => router.push(getCorePackageRoute(carePackageId));

  const pushRoute = (route) => () => router.push(route);

  return (
    <>
      <NewHeader roles={roles ?? []} />
      <ReviewPackageDetails
        className="package-details"
        showEditActions
        isLoading={coreLoading || packageSummaryLoading || detailsLoading}
        openedPopup={openedPopup}
        buttons={
          editableStatus && [
            { title: 'Edit', onClick: edit, secondary: true, outline: true, color: 'blue' },
            { title: 'Cancel', onClick: cancel, secondary: true, outline: true, color: 'red' },
            { title: 'End', onClick: end, secondary: true, outline: true, color: 'blue' },
          ]
        }
        additionalButtons={[
          {
            title: 'Package history',
            onClick: pushRoute(getHistoryRoute(carePackageId)),
            secondary: true,
            outline: true,
            color: 'blue',
          },
          {
            title: 'Care Plan',
            onClick: pushRoute(getCarePackageCareChargeRoute(carePackageId)),
            secondary: true,
            outline: true,
            color: 'blue',
          },
          {
            title: 'Payment history',
            onClick: pushRoute(getPaymentHistoryRoute(carePackageId)),
            secondary: true,
            outline: true,
            color: 'blue',
          },
        ]}
        setOpenedPopup={setOpenedPopup}
        title={data?.packageType}
        isVisibleLink={editableStatus && !isApprovedStatus}
        data={data}
        subTitle="Package details"
        packageData={{ ...packageData, startDate, endDate }}
        packageId={carePackageId}
        userDetails={data?.serviceUser}
        goBack={router.back}
        summaryData={data}
      />
    </>
  );
};

export default PackageDetailsPage;
