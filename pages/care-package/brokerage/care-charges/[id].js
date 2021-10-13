import React from 'react';
import { useRouter } from 'next/router';
import CareCharges from 'components/Brokerage/CareCharges';
import {
  createCarePackageReclaimCareCharge,
  updateCarePackageReclaimCareCharge,
} from 'api/CarePackages/CarePackageReclaim';
import useReclaimApi from 'api/SWR/CarePackage/useReclaimApi';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';

const CareChargesPage = () => {
  const router = useRouter();
  const carePackageId = router.query.id;
  const serviceUserId = '2f043f6f-09ed-42f0-ab30-c0409c05cb7e'; //todo to be removed
  const dispatch = useDispatch();
  const { data: carePackageReclaimCareCharge } = useReclaimApi.careCharge(carePackageId);
  const { data: calculatedCost } = useReclaimApi.calculatedCost(carePackageId, serviceUserId);

  const collectingReasonOptions = [
    { text: 'Select One', value: null },
    { text: 'Service user unable to manage finances', value: '1' },
    { text: 'Agreement with provider to pay gross', value: '2' },
    { text: 'Service user or family declining payment', value: '3' },
    { text: 'Finance managed by CFAT', value: '4' },
    { text: 'Other', value: '5' },
  ];

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const createCareCharge = (packageId, careChargeCreation) => {
    createCarePackageReclaimCareCharge(packageId, careChargeCreation)
      .then(() => {
        pushNotification(`Care charge created successfully`, 'success');
        router.push(`/care-package/brokerage/package-details/${carePackageId}`);
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  const updateCareCharge = (packageId, careChargeUpdate) => {
    updateCarePackageReclaimCareCharge(packageId, careChargeUpdate)
      .then(() => {
        pushNotification(`Care charge updated successfully`, 'success');
        router.push(`/care-package/brokerage/package-details/${carePackageId}`);
      })
      .catch((error) => {
        pushNotification(error);
      });
  };

  return (
    <CareCharges
      carePackageId={carePackageId}
      reasonsCollecting={collectingReasonOptions}
      calculatedCost={calculatedCost}
      carePackageReclaimCareCharge={carePackageReclaimCareCharge}
      createCareCharge={createCareCharge}
      updateCareCharge={updateCareCharge}
    />
  );
};

export default CareChargesPage;
