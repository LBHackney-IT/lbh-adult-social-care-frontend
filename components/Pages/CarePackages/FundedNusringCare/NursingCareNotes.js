import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, FormGroup, Textarea } from 'components';

export const NursingCareNotes = ({ control, errors }) => (
  <Container>
    <FormGroup label="Funded Nursing Care notes" error={errors.description?.message}>
      <Controller
        name="description"
        control={control}
        render={({ field }) => <Textarea value={field.value} handler={field.onChange} {...field} />}
      />
    </FormGroup>
  </Container>
);
