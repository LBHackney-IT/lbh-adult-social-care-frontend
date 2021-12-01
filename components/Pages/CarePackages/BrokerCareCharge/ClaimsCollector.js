import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, FormGroup, HorizontalSeparator, RadioGroup, Select, Textarea } from 'components';
import { COLLECTING_REASON_OPTIONS } from 'constants/variables';

export const ClaimsCollector = ({ control, errors, collectedBy, isS117Client }) => (
  <Container>
    <FormGroup disabled={isS117Client}>
      <Controller
        name="claimCollector"
        control={control}
        render={({ field }) => (
          <RadioGroup
            handle={field.onChange}
            inline
            error={errors.claimCollector?.message}
            label="Collected by"
            items={[
              { id: 1, label: 'Supplier (net)' },
              { id: 2, label: 'Hackney council (gross)' },
            ]}
            {...field}
          />
        )}
      />
    </FormGroup>
    <HorizontalSeparator height="20px" />
    <FormGroup label="Why is Hackney collecting these care charges?" disabled={collectedBy !== 1 || isS117Client}>
      <Controller
        name="claimReason"
        control={control}
        render={({ field }) => <Select options={COLLECTING_REASON_OPTIONS} {...field} />}
      />
      <HorizontalSeparator height="10px" />
      <Controller
        name="description"
        control={control}
        render={({ field }) => <Textarea value={field.value} handler={field.onChange} />}
      />
    </FormGroup>
  </Container>
);
