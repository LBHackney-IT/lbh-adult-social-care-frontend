import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, HorizontalSeparator, FormGroup, Input, WarningText } from 'components';

export const CareChargeCost = ({ control, errors }) => (
  <Container className="brokerage__container">
    <WarningText>Provisional care charge (pre-assessement)</WarningText>
    <HorizontalSeparator height="30px" />
    <FormGroup label="Cost per week" hint="Auto calculated on age" error={errors.cost?.message}>
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
