import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, FormGroup, HorizontalSeparator, RadioGroup, Select, Textarea } from 'components';
import { CLAIM_REASON_OPTIONS, claimCollector } from 'constants/variables';

export const ClaimsCollector = ({ control, errors, collectedBy, isS117Client }) => {
  const disabledClaimsCollector = collectedBy === claimCollector.supplier || isS117Client;

  return (
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
      <FormGroup label="Why is Hackney collecting these care charges?" disabled={disabledClaimsCollector}>
        <Controller
          name="claimReason"
          control={control}
          render={({ field }) =>
            <Select disabled={disabledClaimsCollector} options={CLAIM_REASON_OPTIONS} {...field} />
          }
        />
        <HorizontalSeparator height="10px" />
        <Controller
          name="description"
          control={control}
          render={({ field }) =>
            <Textarea disabled={disabledClaimsCollector} value={field.value} handler={field.onChange} />}
        />
      </FormGroup>
    </Container>
  );
}
