import React, { useEffect, useState } from 'react';
import { HorizontalSeparator, Heading, Collapse, Container, Hint, FormGroup, VerticalSeparator, Tag } from 'components';
import { addDays, isSameDay } from 'date-fns';
import { cancelCareChargeReclaim, endCareChargeReclaim } from 'api';
import { addNotification } from 'reducers/notificationsReducer';
import { useDispatch } from 'react-redux';
import { geTagTextFromReclaimStatus, getTagColorFromReclaimStatus } from 'service/getTagColorFromReclaimStatus';
import { CareChargeCost } from './CareChargeCost';
import { ClaimCollector } from './ClaimCollector';
import { CareChargeSchedule } from './CareChargeSchedule';
import { ActionButtons } from './ActionButtons';
import EndCareChargeModal from './EndCareChargeModal';

export const CareCharge13 = ({
  carePackageId,
  clearErrors,
  control,
  errors,
  getValues,
  hideForm,
  isOpen,
  originalValues,
  packageStartDate,
  packageEndDate,
  reset,
  resetField,
  refreshPage,
  setValue,
  watch,
}) => {
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState(isOpen);
  const [disabled, setDisabled] = useState(!!originalValues);
  const res12End = watch('residential12.endDate');
  const provEnd = watch('provisional.endDate');

  const collectedBy = watch('residential13.claimCollector');
  const isOngoing = watch('residential13.isOngoing');
  const startDate = watch('residential13.startDate');
  const endDate = watch('residential13.endDate');

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

  const reclaimId = watch('residential13.id');
  const status = watch('residential13.status');

  useEffect(() => {
    if (!startDate) {
      if (res12End && !isSameDay(new Date(res12End), new Date(packageEndDate))) {
        setValue('residential13.startDate', addDays(new Date(res12End), 1));
      } else if (provEnd && !isSameDay(new Date(provEnd), new Date(packageEndDate))) {
        setValue('residential13.startDate', addDays(new Date(provEnd), 1));
      }
    }
  }, [res12End, startDate, provEnd]);

  useEffect(() => {
    if (startDate && !endDate && !isOngoing && packageEndDate) {
      setValue('residential13.endDate', packageEndDate);
    }
  }, [startDate]);

  useEffect(() => {
    setValue('residential13.isOngoing', !endDate);
    // if no data exists then copy other care charge data...
    setValue('residential13.cost', res13cost ?? res12cost ?? provCost);
    setValue('residential13.claimCollector', res13Collector ?? res12Collector ?? provCollector);
    if (collectedBy !== 1) {
      setValue('residential13.claimReason', res13ClaimReason ?? res12ClaimReason ?? provClaimReason);
      setValue('residential13.description', res13Description ?? res12Description ?? provDescription);
    }
    return () => {
      resetField('residential13');
    };
  }, []);

  useEffect(() => {
    setValue('residential13.checkValidation', !disabled);
  }, [disabled]);

  const handleRevert = () => {
    const values = getValues(['provisional', 'residential12']);
    hideForm();
    setDisabled(true);
    reset({
      packageStart: packageStartDate,
      packageEnd: packageEndDate,
      residential13: {
        ...originalValues,
        description: originalValues?.description ?? '',
        claimReason: originalValues?.claimReason ?? 0,
        subType: 3,
        carePackageId,
      },
      provisional: values[0],
      residential12: values[1],
    });
  };

  const handleCancel = async () => {
    if (carePackageId && reclaimId) {
      try {
        await cancelCareChargeReclaim(carePackageId, reclaimId);
        refreshPage();
        dispatch(addNotification({ text: 'Residential 13+ weeks cancelled', className: 'success' }));
      } catch (e) {
        dispatch(addNotification({ text: e }));
      }
    }
  };

  const [isEnding, setIsEnding] = useState(false);

  const endCareCharge = async (end) => {
    if (end && reclaimId) {
      try {
        await endCareChargeReclaim(carePackageId, reclaimId, end);
        refreshPage();
        dispatch(addNotification({ text: 'Residential 13 + weeks ended', className: 'success' }));
      } catch (e) {
        dispatch(addNotification({ text: e }));
      }
    }
  };
  return (
    <>
      <EndCareChargeModal
        isOpen={isEnding}
        onClose={() => setIsEnding(false)}
        handleConfirmation={endCareCharge}
        chargeType="Without Property 13 + weeks"
        careCharge={getValues(['residential13'])}
      />
      <HorizontalSeparator height="48px" />
      <Collapse
        title={
          <Container display="flex" flexDirection="column">
            {status ? (
              <Container display="flex" alignItems="flex-start">
                <Tag outline color={getTagColorFromReclaimStatus(status)}>
                  {geTagTextFromReclaimStatus(status)}
                </Tag>
                <VerticalSeparator width="10px" />
                <Container display="flex" flexDirection="column">
                  <Heading size="xl">Residential SU contribution</Heading>
                  <Hint>Without Property 13+ weeks</Hint>
                </Container>
              </Container>
            ) : (
              <Heading size="xl">Residential SU contribution</Heading>
            )}
          </Container>
        }
        setExpanded={setExpanded}
        expanded={isExpanded}
      >
        <FormGroup>
          <HorizontalSeparator height="30px" />
          <CareChargeCost
            control={control}
            disabled={disabled}
            errors={errors}
            name="residential13.cost"
            title="Cost per week"
            subtitle="Auto calculated on age"
          />
          <HorizontalSeparator height="24px" />
          <ClaimCollector
            control={control}
            errors={errors}
            disabled={disabled}
            collectedBy={collectedBy}
            radioName="residential13.claimCollector"
            selectName="residential13.claimReason"
            textAreaName="residential13.description"
          />
          <HorizontalSeparator height="24px" />
          <CareChargeSchedule
            disabled={disabled}
            minDate={packageStartDate}
            maxDate={packageEndDate ?? null}
            startDate="residential13.startDate"
            endDate="residential13.endDate"
            checkboxName="residential13.isOngoing"
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
