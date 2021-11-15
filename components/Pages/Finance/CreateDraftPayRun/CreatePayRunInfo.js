import { Controller } from 'react-hook-form';
import React from 'react';
import { Container, RadioGroup } from '../../../HackneyDS';
import CreatePayRunDates from './CreatePayRunDates';

const CreatePayRunInfo = ({
  errors,
  control,
  fieldStart = 'startDate',
  startDate,
  paidUpToDate,
  onChangeDate,
  name = 'regularCycles',
  options,
  maxDate,
  minDate,
  onChangeRadio,
  startDateLabel = 'Pay run to',
  dateText,
}) => (
  <Container>
    <Container className="create-pay-run__radios">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <RadioGroup
            small
            name={name}
            error={errors[name]?.message}
            handle={(value) => {
              field.onChange(value);
              onChangeRadio?.(value);
            }}
            items={options}
            {...field}
          />
        )}
      />
    </Container>
    <h4>Payrun scheduling</h4>
    <CreatePayRunDates
      minDate={minDate}
      startDate={startDate}
      startDateLabel={startDateLabel}
      errors={errors}
      fieldStart={fieldStart}
      paidUpToDate={paidUpToDate}
      maxDate={maxDate}
      onChangeDate={onChangeDate}
      dateText={dateText}
      control={control}
    />
  </Container>
);

export default CreatePayRunInfo;