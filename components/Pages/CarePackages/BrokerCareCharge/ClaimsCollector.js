import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, HorizontalSeparator, FormGroup, RadioGroup, Select, Textarea } from 'components';

export const ClaimsCollector = ({ control, errors, collectedBy, isS117Client }) => {
  const collectingReasonOptions = [
    { text: 'Service user unable to manage finances', value: '1' },
    { text: 'Agreement with provider to pay gross', value: '2' },
    { text: 'Service user or family declining payment', value: '3' },
    { text: 'Finance managed by CFAT', value: '4' },
    { text: 'Other', value: '5' },
  ];
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
                { id: 1, label: 'Hackney council (gross)' },
                { id: 2, label: 'Supplier (net)' },
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
          render={({ field }) => <Select options={collectingReasonOptions} {...field} />}
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
};
