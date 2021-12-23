import React, { useState } from 'react';
import withSession from 'lib/session';
import { useRouter } from 'next/router';
import { usePackageSummary } from 'api';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import { ReviewPackageDetails } from 'components';

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
  return { props: {} };
});

const ApprovalPackageDetail = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const { data, isLoading: summaryLoading } = usePackageSummary(carePackageId);
  const [openedPopup, setOpenedPopup] = useState('');

  const { isLoading: coreLoading } = useRedirectIfPackageNotExist();

  return (
    <ReviewPackageDetails
      className="approval-package-detail"
      isLoading={summaryLoading || coreLoading}
      subTitle="Package details"
      title={data?.packageType}
      packageId={carePackageId}
      userDetails={data?.serviceUser}
      data={data}
      packageStatus={data?.packageStatus}
      setOpenedPopup={setOpenedPopup}
      openedPopup={openedPopup}
      showEditActions
      buttons={data.status && data.status !== 4 && [
        {
          title: 'Decline',
          onClick: () => setOpenedPopup('decline'),
          secondary: true,
          color: 'red',
          outline: true,
        },
        {
          title: 'Approve',
          onClick: () => setOpenedPopup('approve'),
          className: 'disable-shadow'
        },
      ]}
      submitButtonText="Approve"
      goBack={router.back}
      summaryData={data}
    />
  );
};

export default ApprovalPackageDetail;
