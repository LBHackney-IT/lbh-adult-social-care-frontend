import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { CareCharges } from 'components';
import { useReclaimApi, createCarePackageReclaimCareCharge, updateCarePackageReclaimCareCharge } from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import { getCarePackageReviewRoute } from 'routes/RouteConstants';
import { getLoggedInUser } from 'service/helpers';
import withSession from 'lib/session';

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

const CareChargesPage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;
  const [loading, setLoading] = useState(false);

  const serviceUserId = '2f043f6f-09ed-42f0-ab30-c0409c05cb7e'; // todo to be removed

  const dispatch = useDispatch();
  const { data: carePackageReclaimCareCharge, isLoading: careChargeLoading } = useReclaimApi.careCharge(carePackageId);
  const { data: calculatedCost, isLoading: calculatedCostLoading } = useReclaimApi.calculatedCost(
    carePackageId,
    serviceUserId
  );

  const collectingReasonOptions = [
    { text: 'Service user unable to manage finances', value: '1' },
    { text: 'Agreement with provider to pay gross', value: '2' },
    { text: 'Service user or family declining payment', value: '3' },
    { text: 'Finance managed by CFAT', value: '4' },
    { text: 'Other', value: '5' },
  ];

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const packageReviewPageLink = getCarePackageReviewRoute(carePackageId);

  const createCareCharge = async (packageId, careChargeCreation) => {
    setLoading(true);
    try {
      await createCarePackageReclaimCareCharge(packageId, careChargeCreation);
      pushNotification(`Care charge created successfully`, 'success');
      router.push(packageReviewPageLink);
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  const updateCareCharge = async (packageId, careChargeUpdate) => {
    setLoading(true);
    try {
      await updateCarePackageReclaimCareCharge(packageId, careChargeUpdate);
      pushNotification(`Care charge updated successfully`, 'success');
      router.push(packageReviewPageLink);
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  return (
    <CareCharges
      loading={loading || calculatedCostLoading || careChargeLoading}
      reasonsCollecting={collectingReasonOptions}
      calculatedCost={calculatedCost}
      carePackageReclaimCareCharge={carePackageReclaimCareCharge}
      createCareCharge={createCareCharge}
      updateCareCharge={updateCareCharge}
    />
  );
};

export default CareChargesPage;
