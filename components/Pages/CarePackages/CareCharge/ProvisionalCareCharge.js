import React, { useEffect, useState } from 'react';
import { HorizontalSeparator, Heading, Collapse, Container, FormGroup } from 'components';
import { cancelCareChargeReclaim, endCareChargeReclaim } from 'api';
import { usePushNotification } from 'service';
import { CareChargeCost } from './CareChargeCost';
import { ClaimCollector } from './ClaimCollector';
import { CareChargeSchedule } from './CareChargeSchedule';
import { ActionButtons } from './ActionButtons';
import EndCareChargeModal from './EndCareChargeModal';

export const ProvisionalCareCharge = ({
  carePackageId,
  control,
  errors,
  getValues,
  hideForm,
  isOpen,
  originalValues,
  packageStartDate,
  packageEndDate,
  refreshPage,
  reset,
  resetField,
  setValue,
  watch,
}) => {
  const pushNotification = usePushNotification();
  const [isExpanded, setExpanded] = useState(isOpen);
  const [disabled, setDisabled] = useState(!!originalValues);

  const collectedBy = watch('provisional.claimCollector');
  const startDate = watch('provisional.startDate');
  const endDate = watch('provisional.endDate');

  const provCost = watch('provisional.cost');
  const res12cost = watch('residential12.cost');
  const res13cost = watch('residential13.cost');

  const provDescription = watch('provisional.description');
  const res12Description = watch('residential12.description');
  const res13Description = watch('residential13.description');

  const provCollector = watch('provisional.claimCollector');
  const res12Collector = watch('residential12.claimCollector');
  const res13Collector = watch('residential13.claimCollector');

  const provClaimReason = watch('provisional.claimReason');
  const res12ClaimReason = watch('residential12.claimReason');
  const res13ClaimReason = watch('residential13.claimReason');

  const reclaimId = watch('provisional.id');

  useEffect(() => {
    setValue('provisional.isOngoing', !endDate);
    // if no data exists then copy other care charge data...
    if (!startDate) setValue('provisional.startDate', packageStartDate);
    setValue('provisional.cost', provCost ?? res12cost ?? res13cost);
    setValue('provisional.claimCollector', provCollector ?? res12Collector ?? res13Collector);
    if (collectedBy !== 1) {
      setValue('provisional.claimReason', provClaimReason ?? res12ClaimReason ?? res13ClaimReason);
      setValue('provisional.description', provDescription ?? res12Description ?? res13Description);
    }
  }, []);

  useEffect(() => {
    setValue('provisional.checkValidation', !disabled);
    return () => {
      resetField('provisional');
    };
  }, [disabled]);

  const handleRevert = () => {
    const values = getValues(['residential12', 'residential13']);
    hideForm();
    setDisabled(true);
    reset({
      packageStart: packageStartDate,
      packageEnd: packageEndDate,
      provisional: {
        ...originalValues,
        description: originalValues?.description ?? '',
        claimReason: originalValues?.claimReason ?? 0,
        subType: 1,
        carePackageId,
      },
      residential12: values[0],
      residential13: values[1],
    });
  };

  const handleCancel = async () => {
    if (carePackageId && reclaimId) {
      try {
        await cancelCareChargeReclaim(carePackageId, reclaimId);
        refreshPage();
        pushNotification('Provisional Care Charge cancelled', 'success');
      } catch (e) {
        pushNotification(e);
      }
    }
  };

  const [isEnding, setIsEnding] = useState(false);

  const endCareCharge = async (end) => {
    if (end && reclaimId) {
      try {
        await endCareChargeReclaim(carePackageId, reclaimId, end);
        refreshPage();
        pushNotification('Provisional Care Charge ended', 'success');
      } catch (e) {
        pushNotification(e);
      }
    }
  };

  return (
    <>
      <EndCareChargeModal
        isOpen={isEnding}
        onClose={() => setIsEnding(false)}
        handleConfirmation={endCareCharge}
        chargeType="Provisional"
        careCharge={getValues(['provisional'])}
      />
      <Collapse
        title={<Heading size="xl">Provisional care charge (pre-assessment)</Heading>}
        setExpanded={setExpanded}
        expanded={isExpanded}
      >
        <FormGroup>
          <HorizontalSeparator height="30px" />
          <CareChargeCost
            disabled={disabled}
            control={control}
            errors={errors}
            name="provisional.cost"
            title="Cost per week"
            subtitle="Auto calculated on age"
          />
          <HorizontalSeparator height="24px" />
          <ClaimCollector
            disabled={disabled}
            control={control}
            errors={errors}
            collectedBy={collectedBy}
            radioName="provisional.claimCollector"
            selectName="provisional.claimReason"
            textAreaName="provisional.description"
          />
          <HorizontalSeparator height="24px" />
          <CareChargeSchedule
            disabled={disabled}
            minDate={packageStartDate}
            maxDate={packageEndDate ?? null}
            startDate="provisional.startDate"
            endDate="provisional.endDate"
            checkboxName="provisional.isOngoing"
            control={control}
            errors={errors}
          />
        </FormGroup>
        <HorizontalSeparator height="30px" />
        <ActionButtons
          isNew={!originalValues}
          onRevert={handleRevert}
          onCancel={handleCancel}
          isCancelDisabled={!reclaimId}
          onEdit={() => setDisabled(false)}
          onEnd={() => setIsEnding(true)}
        />
      </Collapse>
      <HorizontalSeparator height="48px" />
      <Container borderBottom="1px solid #bfc1c3" />
    </>
  );
};
