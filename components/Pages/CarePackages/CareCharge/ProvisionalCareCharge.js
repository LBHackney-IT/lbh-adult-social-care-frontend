import React, { memo } from 'react';
import { Controller } from 'react-hook-form';
import { currency } from 'constants/strings';
import { Input, Label, RadioGroup, Select, Textarea } from 'components/HackneyDS';
import ActionButtons from './ActionButtons';

const ProvisionalCareCharge = ({ control, collectedByOptions, onCancel, onEnd }) => (
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
        />
      )}
    />

    <Controller
      name="provisional.collectedBy"
      control={control}
      render={({ field }) => (
        <RadioGroup
          inline
          label="Collected by"
          items={collectedByOptions}
          className="care-charge__radios"
          handle={field.onChange}
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
        <Select id="reason-collecting" options={[]} value={field.value} onChange={field.onChange} />
      )}
    />

    <Controller
      name="provisional.notes"
      control={control}
      render={({ field }) => (
        <Textarea className="provisional-care__textarea" handler={field.onChange} value={field.value} rows={3} />
      )}
    />

    <ActionButtons onCancel={onCancel} onEnd={onEnd} />
  </div>
);

export default memo(ProvisionalCareCharge);
