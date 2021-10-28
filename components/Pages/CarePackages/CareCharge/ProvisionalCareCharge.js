import React, { memo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { currency } from 'constants/strings';
import { Input, Label, RadioGroup, Select, Textarea } from 'components/HackneyDS';
import { careChargeAPIKeys, careChargeFormKeys, collectingReasonOptions } from 'constants/variables';
import { useLookups } from 'api';
import { checkIfActionsVisible, useClaimCollectorOptions, useGetChargeStatus, useIsDisabledByStatus } from './helpers';
import ActionButtons from './ActionButtons';

const { provisional } = careChargeFormKeys;

const ProvisionalCareCharge = ({ control, onCancel, onEnd }) => {
  const status = useGetChargeStatus(careChargeAPIKeys.provisional);
  const claimCollectorOptions = useClaimCollectorOptions();

  const [isDisabled, makeEnabled] = useIsDisabledByStatus(status);

  const { data: claimCollectors } = useLookups('claimCollector');
  const collectedBy = useWatch({ control, name: `${provisional}.collectedBy` });
  const isCollectedByHackney = claimCollectors.find((el) => el.id === collectedBy)?.name === 'Hackney';

  return (
    <div className="provisional-care">
      <h3>Provisional care charge (pre-assessment)</h3>

      <Controller
        name={`${provisional}.cost`}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            id="cost-per-week"
            label="Cost per week"
            hint="Auto calculated on age"
            preSign={currency.euro}
            handler={field.onChange}
            value={field.value}
            disabled={isDisabled}
          />
        )}
      />

      <Controller
        name={`${provisional}.collectedBy`}
        control={control}
        render={({ field }) => (
          <RadioGroup
            inline
            name="collected-by"
            label="Collected by"
            items={claimCollectorOptions}
            className="care-charge__radios"
            handle={field.onChange}
            disabled={isDisabled}
            value={field.value}
          />
        )}
      />

      {isCollectedByHackney && (
        <>
          <Label className="reason-collecting" htmlFor="reason-collecting">
            Why is Hackney collecting these care charges?
          </Label>

          <Controller
            name={`${provisional}.reasonCollecting`}
            control={control}
            render={({ field }) => (
              <Select
                options={collectingReasonOptions}
                value={field.value}
                disabled={isDisabled}
                id="reason-collecting"
                onChange={field.onChange}
              />
            )}
          />

          <Controller
            name={`${provisional}.description`}
            control={control}
            render={({ field }) => (
              <Textarea
                className="provisional-care__textarea"
                handler={field.onChange}
                disabled={isDisabled}
                value={field.value}
                rows={3}
              />
            )}
          />
        </>
      )}

      {checkIfActionsVisible(status) && <ActionButtons onEdit={makeEnabled} onCancel={onCancel} onEnd={onEnd} />}
    </div>
  );
};

export default memo(ProvisionalCareCharge);
