import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import CareCharges from 'components/Brokerage/CareCharges';
import { createCarePackageReclaimCareCharge, updateCarePackageReclaimCareCharge } from 'api/CarePackages/CarePackageReclaim';
import useReclaimApi from 'api/SWR/CarePackage/useReclaimApi';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';

const CareChargesPage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const serviceUserId = "2f043f6f-09ed-42f0-ab30-c0409c05cb7e";
  const dispatch = useDispatch();
  const { data: carePackageReclaimCareCharge } = useReclaimApi.careCharge(carePackageId);
  const { data: calculatedCost } = useReclaimApi.calculatedCost(carePackageId, serviceUserId);

  const collectingReasonOptions = [
    { text: 'Select One', value: null },
    { text: 'Test Data 1', value: '1' },
    { text: 'Test Data 2', value: '2' },
  ];

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const createCareCharge = (packageId, careChargeCreation) => {
    createCarePackageReclaimCareCharge(packageId, careChargeCreation)
      .then(() => {
        pushNotification(`Care charge created successfully`, 'success');
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const updateCareCharge = (packageId, careChargeUpdate) => {
    updateCarePackageReclaimCareCharge(packageId, careChargeUpdate)
      .then(() => {
        pushNotification(`Care charge updated successfully`, 'success');
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  return <CareCharges 
      carePackageId={carePackageId}
      reasonsCollecting={collectingReasonOptions}
      calculatedCost={calculatedCost}
      carePackageReclaimCareCharge={carePackageReclaimCareCharge}
      createCareCharge={createCareCharge}
      updateCareCharge={updateCareCharge}
  />;
};

export default CareChargesPage;