import React, { useState } from 'react';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import { usePackageSummary } from 'api';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import { ReviewPackageDetails } from 'components';
import { NewHeader } from 'components/NewHeader';
import { handleRoleBasedAccess } from '../../api/handleRoleBasedAccess';
import { accessRoutes, userRoles} from '../../api/accessMatrix';



export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  if (!handleRoleBasedAccess(user.roles ?? [], accessRoutes.CARE_PACKAGE_REVIEW)) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }
  return { props: { roles: user.roles } };
});

const ReviewPackageDetailsPage = ({ roles }) => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const { data, isLoading: summaryLoading } = usePackageSummary(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');

  const { isLoading: coreLoading } = useRedirectIfPackageNotExist();

  const isNotApprovedStatus = data?.status < 3 && roles.includes(userRoles.ROLE_BROKERAGE);

  return (
    <>
      <NewHeader roles={roles ?? []} />
      <ReviewPackageDetails
        isLoading={summaryLoading || coreLoading}
        subTitle="Review package details"
        title={data?.packageType}
        openedPopup={openedPopup}
        setOpenedPopup={setOpenedPopup}
        data={data}
        packageId={carePackageId}
        userDetails={data?.serviceUser}
        buttons={[
          { title: 'Back', className: 'secondary-gray', onClick: router.back },
          isNotApprovedStatus && { title: 'Submit for approval', onClick: () => setOpenedPopup('submit') },
        ]}
        goBack={router.back}
        summaryData={data}
      />
    </>
  );
};

export default ReviewPackageDetailsPage;
