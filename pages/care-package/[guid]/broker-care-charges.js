import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { CareCharges } from 'components';
import {
  createCareChargeReclaim,
  updateCareChargeReclaim,
  usePackageCareCharge,
  usePackageCalculatedCost,
  useSingleCorePackageInfo,
} from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import { DEFAULT_REDIRECT_ROUTE_INFO, getCarePackageReviewRoute } from 'routes/RouteConstants';
import { getLoggedInUser, useRedirectIfPackageNotExist } from 'service';
import withSession from 'lib/session';
import { reclaimType } from 'constants/variables';

export const getServerSideProps = withSession(({ req }) => {
  const user = getLoggedInUser({ req });
  if (!user) return DEFAULT_REDIRECT_ROUTE_INFO;
  return { props: {} };
});

const CareChargesPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const carePackageId = router.query.guid;
  const [loading, setLoading] = useState(false);

  const coreLoading = useRedirectIfPackageNotExist();

  const serviceUserId = '2f043f6f-09ed-42f0-ab30-c0409c05cb7e'; // todo to be removed

  const { data: careCharge, isLoading: careChargeLoading } = usePackageCareCharge(
    carePackageId,
    reclaimType.careCharge
  );

  const { data: calculatedCost, isLoading: calculatedCostLoading } = usePackageCalculatedCost(
    carePackageId,
    serviceUserId
  );

  const { data: packageInfo } = useSingleCorePackageInfo(carePackageId);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const packageReviewPageLink = getCarePackageReviewRoute(carePackageId);

  const createCareCharge = async (packageId, careChargeCreation) => {
    setLoading(true);
    try {
      await createCareChargeReclaim(packageId, careChargeCreation);
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
      await updateCareChargeReclaim(packageId, careChargeUpdate);
      pushNotification(`Care charge updated successfully`, 'success');
      router.push(packageReviewPageLink);
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  return (
    <CareCharges
      loading={loading || calculatedCostLoading || careChargeLoading || coreLoading}
      calculatedCost={calculatedCost}
      isS117={packageInfo?.settings?.isS117Client}
      careCharge={careCharge?.length && careCharge[0]}
      createCareCharge={createCareCharge}
      updateCareCharge={updateCareCharge}
    />
  );
};

export default CareChargesPage;
