import React, { memo } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { currency } from 'constants/strings';
import { FormGroup, Input, Label, RadioGroup, Select, Textarea } from 'components/HackneyDS';
import { careChargeAPIKeys, careChargeFormKeys, CLAIM_REASON_OPTIONS } from 'constants/variables';
import { useLookups } from 'api';
import { checkIfActionsVisible, useClaimCollectorOptions, useGetChargeStatus, useIsDisabledByStatus } from './helpers';
import ActionButtons from './ActionButtons';

const { provisional } = careChargeFormKeys;

const ProvisionalCareCharge = ({ control, onCancel, onEnd, errors }) => {
  const status = useGetChargeStatus(careChargeAPIKeys.provisional);
  const claimCollectorOptions = useClaimCollectorOptions();

  const [isDisabled, makeEnabled] = useIsDisabledByStatus(status);

  const { data: claimCollectors } = useLookups('claimCollector');
  const claimCollector = useWatch({ control, name: `${provisional}.claimCollector` });
  const isClaimedByHackney = claimCollectors.find((el) => el.id === claimCollector)?.name === 'Hackney';

  return (
    <div className="provisional-care">
      <h3>Provisional care charge (pre-assessment)</h3>

      <FormGroup error={errors.cost}>
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
      </FormGroup>

      <FormGroup error={errors.claimCollector}>
        <Controller
          name={`${provisional}.claimCollector`}
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
      </FormGroup>

      {isClaimedByHackney && (
        <>
          <Label className="reason-collecting" htmlFor="claim-reason">
            Why is Hackney collecting these care charges?
          </Label>

          <Controller
            name={`${provisional}.claimReason`}
            control={control}
            render={({ field }) => (
              <Select
                options={CLAIM_REASON_OPTIONS}
                value={field.value}
                disabled={isDisabled}
                id="claim-reason"
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
                // disabled={isDisabled}
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
