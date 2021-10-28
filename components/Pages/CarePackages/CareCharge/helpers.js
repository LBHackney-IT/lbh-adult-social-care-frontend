import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useToggle } from 'react-use';
import { useLookups, usePackageCareCharge } from 'api';

export const useIsDisabledByStatus = (status) => {
  const [isDisabled, toggleDisabled] = useToggle(false);

  useEffect(() => {
    toggleDisabled(['Active', 'Pending'].includes(status));
  }, [status]);

  const makeEnabled = useCallback(() => {
    toggleDisabled(false);
  }, []);

  return [isDisabled, makeEnabled];
};

export const checkIfActionsVisible = (status) => ['Active', 'Pending'].includes(status);

export const useGetChargeStatus = (subType) => {
  const router = useRouter();
  const { guid: packageId } = router.query;

  const { data: careChargeData } = usePackageCareCharge(packageId);
  const { data: statusOptions } = useLookups('reclaimStatus');

  const provisionalData = careChargeData.find((el) => el.subType === subType);

  return statusOptions.find((el) => el.id === provisionalData?.status)?.name;
};

export const useClaimCollectorOptions = (formKey) => {
  const { data: claimCollectors } = useLookups('claimCollector');

  return claimCollectors.map((el) => ({
    id: formKey ? `${formKey}-${el.id}` : el.id,
    label: el.name,
  }));
};
