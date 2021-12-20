import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, FormGroup, Input } from 'components';

export const CareChargeCost = ({
  control,
  errors,
  isDisabled,
}) => (
  <Container className="brokerage__container">
    <FormGroup label="Cost per week" hint="Auto calculated on age" error={errors.cost?.message} disabled={isDisabled}>
      <Controller
        name="cost"
        control={control}
        render={({ field }) => (
          <Input
            type="number"
            step="any"
            preSign="£"
            value={field.value}
            onChangeValue={(text) => field.onChange(parseFloat(text))}
            flex
          />
        )}
      />
    </FormGroup>
  </Container>
);
