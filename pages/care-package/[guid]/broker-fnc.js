import React, { useEffect } from 'react';
import FundedNursingCare from 'components/Pages/CarePackages/FundedNursingCare';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { createCarePackageReclaimFnc, updateCarePackageReclaimFnc } from 'api/CarePackages/CarePackageReclaim';
import useReclaimApi from 'api/SWR/CarePackage/useReclaimApi';
import { addNotification } from 'reducers/notificationsReducer';
import { getCareChargesRoute } from 'routes/RouteConstants';

const FundedNursingCarePage = () => {
  const router = useRouter();
  const carePackageId = router.query.guid;

  const dispatch = useDispatch();
  const { data: carePackageReclaimFnc } = useReclaimApi.fnc(carePackageId);
  const { data: activeFncPrice } = useReclaimApi.activeFncPrice(carePackageId);

  const collectedByOptions = [
    { text: 'Select One', value: null },
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
