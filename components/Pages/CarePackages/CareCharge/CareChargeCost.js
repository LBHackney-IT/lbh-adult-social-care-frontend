import React from 'react';
import { FormGroup, Input } from 'components';
import { Controller } from 'react-hook-form';

export const CareChargeCost = ({ disabled, control, errors, name, title, subtitle }) => (
  <FormGroup label={title} hint={subtitle} error={errors?.cost?.message}>
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Input
          disabled={disabled}
          type="number"
          step="any"
          preSign="£"
          value={field.value}
          onChangeValue={(text) => field.onChange(parseFloat(text))}
          flex
          {...field}
        />
      )}
    />
  </FormGroup>
);
