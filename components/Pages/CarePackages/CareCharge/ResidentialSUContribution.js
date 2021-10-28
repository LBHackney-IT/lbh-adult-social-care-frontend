import React, { memo, useEffect, useMemo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { currency } from 'constants/strings';
import { addWeeks } from 'date-fns';
import { careChargeAPIKeys, careChargeFormKeys } from 'constants/variables';
import { Checkbox, Input, RadioGroup, DatePicker } from 'components/HackneyDS';
import { useIsDisabledByStatus, checkIfActionsVisible, useGetChargeStatus, useClaimCollectorOptions } from './helpers';
import ActionButtons from './ActionButtons';

const { less12, more12 } = careChargeFormKeys;

const getEndDate = (date) => addWeeks(new Date(date), 12);

const useDatesValidation = (isMore12, control, setValue, formKey) => {
  const startDate = useWatch({ control, name: `${formKey}.startDate` });
  const endDate12weeks = useWatch({ control, name: `${less12}.endDate` });
  const isOngoing = useWatch({ control, name: `${more12}.isOngoing` });

  const maxEndDate = useMemo(() => {
    // for 1-12 weeks
    if (!isMore12 && startDate) return getEndDate(startDate);
    // null for 13+ weeks
    return null;
  }, [isMore12, startDate]);

  useEffect(() => {
    // once 1-12 weeks startDate is set - also set endDate
    if (!isMore12 && startDate) {
      const endDate = getEndDate(startDate);
      setValue(`${formKey}.endDate`, endDate);
    }
  }, [isMore12, startDate]);

  return {
    startDate,
    maxEndDate,
    minFromDate: formKey === less12 ? null : endDate12weeks,
    isOngoing,
  };
};

const ResidentialSuContribution = ({ isMore12, control, setValue, onCancel, onEnd }) => {
  const weeks = isMore12 ? '13+' : '1-12';
  const formKey = isMore12 ? more12 : less12;
  const description = `Without Property ${weeks} weeks`;

  const status = useGetChargeStatus(isMore12 ? careChargeAPIKeys.more12 : careChargeAPIKeys.less12);
  const claimCollectorOptions = useClaimCollectorOptions(formKey);

  const [isDisabled, makeEnabled] = useIsDisabledByStatus(status);

  const { startDate, maxEndDate, minFromDate, isOngoing } = useDatesValidation(isMore12, control, setValue, formKey);

  return (
    <div className="residential-contribution">
      <h3>Residential SU contribution</h3>
      <p>{description}</p>

      <Controller
        name={`${formKey}.cost`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            label="Value"
            id={`${weeks}-cost`}
            preSign={currency.euro}
            handler={field.onChange}
            disabled={isDisabled}
            value={field.value}
          />
        )}
      />

      <Controller
        name={`${formKey}.collectedBy`}
        control={control}
        render={({ field }) => (
          <RadioGroup
            inline
            items={claimCollectorOptions}
            name={`${formKey}-collectedBy`}
            className="care-charge__radios"
            handle={field.onChange}
            disabled={isDisabled}
            value={field.value}
          />
        )}
      />

      <div className="care-charge__dates">
        <div>
          <h5>Start date</h5>
          <Controller
            name={`${formKey}.startDate`}
            control={control}
            render={({ field }) => (
              <DatePicker
                day={{ label: 'From' }}
                date={field.value ? new Date(field.value) : null}
                setDate={field.onChange}
                minDate={minFromDate}
                disabled={isDisabled}
              />
            )}
          />
        </div>

        <div>
          <h5>End date</h5>
          <Controller
            name={`${formKey}.endDate`}
            control={control}
            render={({ field }) => (
              <DatePicker
                day={{ label: 'To' }}
                date={field.value}
                setDate={field.onChange}
                disabled={isDisabled || (isMore12 && isOngoing)}
                minDate={startDate}
                maxDate={maxEndDate}
              />
            )}
          />
        </div>

        {isMore12 && (
          <Controller
            name={`${formKey}.isOngoing`}
            control={control}
            render={({ field }) => (
              <Checkbox
                id="ongoing-checkbox"
                value={field.value}
                onChangeValue={field.onChange}
                label="Ongoing"
                disabled={isDisabled}
              />
            )}
          />
        )}
      </div>

      {checkIfActionsVisible(status) && <ActionButtons onEdit={makeEnabled} onCancel={onCancel} onEnd={onEnd} />}
    </div>
  );
};

export default memo(ResidentialSuContribution);
