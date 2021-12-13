import React from 'react';
import { FormGroup, HorizontalSeparator, RadioGroup, Select, Textarea } from 'components';
import { Controller } from 'react-hook-form';

export const ClaimCollector = ({ disabled, control, errors, radioName, selectName, textAreaName, collectedBy }) => {
  const collectingReasonOptions = [
    { text: 'Service user unable to manage finances', value: '1' },
    { text: 'Agreement with provider to pay gross', value: '2' },
    { text: 'Service user or family declining payment', value: '3' },
    { text: 'Finance managed by CFAT', value: '4' },
    { text: 'Other', value: '5' },
  ];
  return (
    <>
      <Controller
        name={radioName}
        control={control}
        render={({ field }) => (
          <RadioGroup
            disabled={disabled}
            handle={field.onChange}
            inline
            error={errors?.claimCollector?.message}
            label="Collected by"
            items={[
              { id: 1, label: 'Supplier (net)' },
              { id: 2, label: 'Hackney council (gross)' },
            ]}
            {...field}
          />
        )}
      />
      <HorizontalSeparator height="20px" />
      <FormGroup label="Why is Hackney collecting these care charges?" disabled={collectedBy !== 2 || disabled}>
        <Controller
          name={selectName}
          control={control}
          render={({ field }) => <Select options={collectingReasonOptions} {...field} />}
        />
        <HorizontalSeparator height="10px" />
        <Controller
          name={textAreaName}
          control={control}
          render={({ field }) => <Textarea value={field.value} handler={field.onChange} />}
        />
      </FormGroup>
    </>
  );
};
