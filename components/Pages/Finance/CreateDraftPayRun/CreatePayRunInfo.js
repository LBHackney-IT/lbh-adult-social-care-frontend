import { Controller } from 'react-hook-form';
import React from 'react';
import { Container, DatePicker, FormGroup, RadioGroup } from '../../../HackneyDS';

const CreatePayRunInfo = ({
  errors,
  control,
  fieldStart = 'startDate',
  startDate,
  endDate,
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
    <Container className="create-pay-run__date-to">
      <Controller
        name={fieldStart}
        control={control}
        render={({ field }) => (
          <FormGroup error={errors[fieldStart]?.message}>
            <DatePicker
              date={field.value}
              setDate={(value) => {
                onChangeDate('startDate', value);
                field.onChange(value);
              }}
              maxDate={maxDate}
              minDate={minDate}
              dateValue={field.value}
              day={{ label: startDateLabel }}
            />
            {dateText}
          </FormGroup>
        )}
      />
      {endDate !== undefined && (
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <FormGroup error={errors.endDate?.message}>
              <DatePicker
                date={field.value}
                setDate={(value) => {
                  onChangeDate('endDate', value);
                  field.onChange(value);
                }}
                day={{ label: 'To' }}
                checkMinDate
                maxDate={maxDate}
                minDate={startDate}
                dateValue={field.value}
              />
            </FormGroup>
          )}
        />
      )}
    </Container>
  </Container>
);

export default CreatePayRunInfo;