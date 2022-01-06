import React, { useEffect, useState } from 'react';
import {
  HorizontalSeparator,
  Heading,
  Collapse,
  Container,
  Hint,
  FormGroup,
  Button,
  VerticalSeparator,
  Tag,
} from 'components';
import { addDays, addWeeks, differenceInWeeks, isBefore, isSameDay } from 'date-fns';
import { useDispatch } from 'react-redux';
import { cancelCareChargeReclaim, endCareChargeReclaim, getIsoDateWithoutTimezone } from 'api';
import { geTagTextFromReclaimStatus, getTagColorFromReclaimStatus } from 'service/getTagColorFromReclaimStatus';
import { addNotification } from 'reducers/notificationsReducer';
import { CareChargeCost } from './CareChargeCost';
import { ClaimCollector } from './ClaimCollector';
import { CareChargeSchedule } from './CareChargeSchedule';
import { ActionButtons } from './ActionButtons';
import EndCareChargeModal from './EndCareChargeModal';

export const CareCharge12 = ({
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
  refreshPage,
  reset,
  resetField,
  setValue,
  watch,
}) => {
  const dispatch = useDispatch();
  const [isExpanded, setExpanded] = useState(isOpen);
  const [disabled, setDisabled] = useState(!!originalValues);
  const collectedBy = watch('residential12.claimCollector');
  const provEnd = watch('provisional.endDate');

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

  const startDate = watch('residential12.startDate');
  const endDate = watch('residential12.endDate');

  const reclaimId = watch('residential12.id');
  const status = watch('residential12.status');

  useEffect(() => {
    if (provEnd && !startDate && !isSameDay(new Date(provEnd), new Date(packageEndDate))) {
      setValue('residential12.startDate', addDays(new Date(provEnd), 1));
    }
  }, [provEnd, startDate]);

  useEffect(() => {
    if (startDate && !endDate) {
      const correctEnd = addWeeks(new Date(startDate), 12);
      if (packageEndDate) {
        const packageEnd = new Date(packageEndDate);
        if (isBefore(packageEnd, correctEnd)) {
          setValue('residential12.endDate', getIsoDateWithoutTimezone(packageEnd));
        } else {
          setValue('residential12.endDate', getIsoDateWithoutTimezone(correctEnd));
        }
      } else {
        setValue('residential12.endDate', getIsoDateWithoutTimezone(correctEnd));
      }
    }
  }, [startDate]);

  useEffect(() => {
    // if no data exists then copy other care charge data...
    setValue('residential12.cost', res12cost ?? provCost ?? res13cost);
    setValue('residential12.claimCollector', res12Collector ?? provCollector ?? res13Collector);
    if (collectedBy !== 1) {
      setValue('residential12.claimReason', res12ClaimReason ?? provClaimReason ?? res13ClaimReason);
      setValue('residential12.description', res12Description ?? provDescription ?? res13Description);
    }
  }, []);

  useEffect(() => {
    setValue('residential12.checkValidation', !disabled);
    return () => {
      resetField('residential12');
    };
  }, [disabled]);

  const adjustEnd = () => {
    const newDate = addWeeks(new Date(startDate), 12);
    if (packageEndDate) {
      const packEnd = new Date(packageEndDate);
      if (isBefore(packEnd, newDate)) {
        setValue('residential12.endDate', getIsoDateWithoutTimezone(packEnd));
      }
    } else {
      setValue('residential12.endDate', getIsoDateWithoutTimezone(newDate));
    }
    clearErrors('residential12.endDate');
  };

  const [difference, setDifference] = useState();
  useEffect(() => {
    if (startDate && endDate) {
      setDifference(differenceInWeeks(new Date(endDate), new Date(startDate)));
    }
  }, [startDate, endDate]);

  const handleRevert = () => {
    const values = getValues(['provisional', 'residential13']);
    hideForm();
    setDisabled(true);
    reset({
      packageStart: packageStartDate,
      packageEnd: packageEndDate,
      residential12: {
        ...originalValues,
        description: originalValues?.description ?? '',
        claimReason: originalValues?.claimReason ?? 0,
        subType: 2,
        carePackageId,
      },
      provisional: values[0],
      residential13: values[1],
    });
  };

  const handleCancel = async () => {
    if (carePackageId && reclaimId) {
      try {
        await cancelCareChargeReclaim(carePackageId, reclaimId);
        refreshPage();
        dispatch(addNotification({ text: 'Residential 1 - 12 weeks cancelled', className: 'success' }));
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
        dispatch(addNotification({ text: 'Residential 1 - 12 weeks ended', className: 'success' }));
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
        chargeType="Without Property 1-12 weeks"
        careCharge={getValues(['residential12'])}
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
                  <Hint>Without Property 1-12 weeks</Hint>
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
            name="residential12.cost"
            title="Cost per week"
            subtitle="Auto calculated on age"
          />
          <HorizontalSeparator height="24px" />
          <ClaimCollector
            control={control}
            errors={errors}
            disabled={disabled}
            collectedBy={collectedBy}
            radioName="residential12.claimCollector"
            selectName="residential12.claimReason"
            textAreaName="residential12.description"
          />
          <HorizontalSeparator height="24px" />
          <CareChargeSchedule
            disabled={disabled}
            minDate={packageStartDate}
            maxDate={packageEndDate ?? null}
            startDate="residential12.startDate"
            endDate="residential12.endDate"
            control={control}
            errors={errors}
            noOngoing
          />
        </FormGroup>
        <HorizontalSeparator height="15px" />
        <Container display="flex" alignItems="center">
          <Button
            onClick={adjustEnd}
            disabled={
              difference === 12 || !startDate || disabled || isSameDay(new Date(packageEndDate), new Date(endDate))
            }
          >
            Adjust End Date
          </Button>
          <VerticalSeparator width="10px" />
          <Hint>Difference in weeks: {difference}</Hint>
        </Container>
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
