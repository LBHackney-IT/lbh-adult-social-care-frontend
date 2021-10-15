import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { getCareChargesRoute } from 'routes/RouteConstants';
import useReclaimApi from 'api/SWR/CarePackage/useReclaimApi';
import { addNotification } from 'reducers/notificationsReducer';
import { createCarePackageReclaimFnc, updateCarePackageReclaimFnc } from 'api/CarePackages/CarePackageReclaim';
import FundedNursingCare from 'components/Pages/CarePackages/FundedNursingCare';
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

const FundedNursingCarePage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;

  const dispatch = useDispatch();
  const { data: carePackageReclaimFnc } = useReclaimApi.fnc(carePackageId);
  const { data: activeFncPrice } = useReclaimApi.activeFncPrice(carePackageId);

  const collectedByOptions = [
    { text: 'Supplier', value: '1' },
    { text: 'Hackney', value: '2' },
  ];

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const createFundedNursingCare = (packageId, fundedNursingCareCreation) => {
    createCarePackageReclaimFnc(packageId, fundedNursingCareCreation)
      .then(() => {
        pushNotification(`Funded Nursing Care created successfully`, 'success');
        router.push(getCareChargesRoute(carePackageId));
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const updateFundedNursingCare = (packageId, fundedNursingCareUpdate) => {
    updateCarePackageReclaimFnc(packageId, fundedNursingCareUpdate)
      .then(() => {
        pushNotification(`Funded Nursing Care updated successfully`, 'success');
        router.push(getCareChargesRoute(carePackageId));
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  useEffect(() => {});

  const handleBackButton = () => {
    router.back();
  };

  return (
    <FundedNursingCare
      carePackageId={carePackageId}
      collectedByOptions={collectedByOptions}
      activeFncPrice={activeFncPrice}
      carePackageReclaimFnc={carePackageReclaimFnc}
      createFundedNursingCare={createFundedNursingCare}
      updateFundedNursingCare={updateFundedNursingCare}
      goBack={handleBackButton}
    />
  );
};

export default FundedNursingCarePage;
