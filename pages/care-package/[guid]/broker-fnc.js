import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getCareChargesRoute } from 'routes/RouteConstants';
import { addNotification } from 'reducers/notificationsReducer';
import {
  createCarePackageReclaimFnc,
  updateCarePackageReclaimFnc,
  usePackageFnc,
  usePackageActiveFncPrice,
  usePackageDetails
} from 'api';
import { FundedNursingCare } from 'components';
import { getLoggedInUser } from 'service';
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

const collectedByOptions = [
  { text: 'Supplier', value: '1' },
  { text: 'Hackney', value: '2' },
];

const FundedNursingCarePage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;

  const dispatch = useDispatch();
  const { data: carePackageReclaimFnc, isLoading: fncLoading } = usePackageFnc(carePackageId);
  const { data: activeFncPrice, isLoading: fncPriceLoading } = usePackageActiveFncPrice(carePackageId);
  const { data: detailsData, isLoading: detailsLoading } = usePackageDetails(carePackageId);
  const [loading, setLoading] = useState(false);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const createFundedNursingCare = async (packageId, fundedNursingCareCreation) => {
    setLoading(true);
    try {
      await createCarePackageReclaimFnc(packageId, fundedNursingCareCreation);
      pushNotification(`Funded Nursing Care created successfully`, 'success');
      router.push(getCareChargesRoute(carePackageId));
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  const skipAndContinue = () => router.push(getCareChargesRoute(carePackageId));

  const updateFundedNursingCare = async (packageId, fundedNursingCareUpdate) => {
    setLoading(true);
    try {
      await updateCarePackageReclaimFnc(packageId, fundedNursingCareUpdate);
      pushNotification(`Funded Nursing Care updated successfully`, 'success');
      router.push(getCareChargesRoute(carePackageId));
    } catch (e) {
      pushNotification(e);
    }
    setLoading(false);
  };

  return (
    <FundedNursingCare
      loading={loading || fncLoading || fncPriceLoading || detailsLoading}
      carePackageId={carePackageId}
      collectedByOptions={collectedByOptions}
      activeFncPrice={activeFncPrice}
      carePackageReclaimFnc={carePackageReclaimFnc}
      createFundedNursingCare={createFundedNursingCare}
      updateFundedNursingCare={updateFundedNursingCare}
      detailsData={detailsData}
      goBack={router.back}
      skipAndContinue={skipAndContinue}
    />
  );
};

export default FundedNursingCarePage;
