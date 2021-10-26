import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { currency } from 'constants/strings';
import { Input, Label, RadioGroup, Select, Textarea } from 'components/HackneyDS';
import ActionButtons from './ActionButtons';
import { checkIfActionsVisible, useIsDisabledByStatus } from './helpers';

const collectedByOptions = [
  { id: 'hackney', label: 'Hackney council (gross)' },
  { id: 'supplier', label: 'Supplier (net)' },
];

const status = 'active';

const ProvisionalCareCharge = ({ control, onCancel, onEnd }) => {
  const [isDisabled, makeEnabled] = useIsDisabledByStatus(status);

  return (
    <div className="provisional-care">
      <h3>Provisional care charge (pre-assessment)</h3>

      <Controller
        name="provisional.costPerWeek"
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
        name="provisional.collectedBy"
        control={control}
        render={({ field }) => (
          <RadioGroup
            inline
            name="collected-by"
            label="Collected by"
            items={collectedByOptions}
            className="care-charge__radios"
            handle={field.onChange}
            disabled={isDisabled}
            value={field.value}
          />
        )}
      />

      <Label className="reason-collecting" htmlFor="reason-collecting">
        Why is Hackney collecting these care charges?
      </Label>

      <Controller
        name="provisional.reasonCollecting"
        control={control}
        render={({ field }) => (
          <Select
            options={[]}
            value={field.value}
            disabled={isDisabled}
            id="reason-collecting"
            onChange={field.onChange}
          />
        )}
      />

      <Controller
        name="provisional.notes"
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

      {checkIfActionsVisible(status) && <ActionButtons onEdit={makeEnabled} onCancel={onCancel} onEnd={onEnd} />}
    </div>
  );
};

export default memo(ProvisionalCareCharge);
