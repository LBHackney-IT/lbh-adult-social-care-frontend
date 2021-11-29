import React from 'react';
import { Controller } from 'react-hook-form';
import { FormGroup, RadioGroup } from '../../../HackneyDS';

export const NursingHasFNC = ({ control }) => (
  <FormGroup label="Has a FNC assessment been carried out?">
    <Controller
      render={(({ field }) => (
        <RadioGroup
          inline
          value={field.value}
          handle={field.onChange}
          name="hasAssessmentBeenCarried"
          items={[
            { label: 'Yes', id: true },
            { label: 'No', id: false }
          ]}
        />
      ))}
      name="hasAssessmentBeenCarried"
      control={control}
    />
  </FormGroup>
);