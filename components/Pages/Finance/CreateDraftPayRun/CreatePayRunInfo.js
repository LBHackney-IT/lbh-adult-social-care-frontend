import { Controller } from 'react-hook-form';
import React from 'react';
import { Container, FormGroup, RadioGroup } from '../../../HackneyDS';
import DatePick from '../../../DatePick';

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
  disableDatePicker,
  setPayRunType,
  dateText,
  startDateLabel = 'Start Date',
}) => (
  <Container display="flex" justifyContent="space-between">
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
              setPayRunType();
              field.onChange(value);
            }}
            items={options}
            {...field}
          />
        )}
      />
    </Container>
    <Container className="create-pay-run__date-to">
      <Controller
        name={fieldStart}
        control={control}
        render={({ field }) => (
          <FormGroup disabled={disableDatePicker} error={errors[fieldStart]?.message}>
            <DatePick
              startDate={field.value}
              setDate={(value) => {
                onChangeDate('startDate', value);
                field.onChange(value);
              }}
              maxDate={maxDate}
              minDate={minDate}
              dateValue={field.value}
              label={startDateLabel}
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
            <FormGroup disabled={disableDatePicker} error={errors.endDate?.message}>
              <DatePick
                startDate={field.value}
                setDate={(value) => {
                  onChangeDate('endDate', value);
                  field.onChange(value);
                }}
                checkMinDate
                maxDate={maxDate}
                minDate={startDate}
                dateValue={field.value}
                label="End Date"
              />
            </FormGroup>
          )}
        />
      )}
    </Container>
  </Container>
);

export default CreatePayRunInfo;