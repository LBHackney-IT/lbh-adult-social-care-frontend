import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, Select, FormGroup } from 'components';

export const ClaimsCollector = ({ control, errors }) => {
  const collectedOptions = [
    { text: 'Supplier', value: '1' },
    { text: 'Hackney', value: '2' },
  ];
  return (
    <Container className="brokerage__container">
      <FormGroup label="Claims are collected by" error={errors.claimCollector?.message}>
        <Controller
          name="claimCollector"
          control={control}
          render={({ field }) => <Select options={collectedOptions} {...field} />}
        />
      </FormGroup>
    </Container>
  );
};
