import React from 'react';
import { Controller } from 'react-hook-form';
import { Container, DatePicker, FormGroup } from '../../../HackneyDS';

const CreatePayRunDates = ({
  fieldStart,
  control,
  errors,
  onChangeDate,
  maxDate,
  minDate,
  startDateLabel,
  dateText,
  startDate,
  paidUpToDate,
}) => (
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
    {paidUpToDate !== undefined && (
      <Controller
        name="paidUpToDate"
        control={control}
        render={({ field }) => (
          <FormGroup error={errors.paidUpToDate?.message}>
            <DatePicker
              date={field.value}
              setDate={(value) => {
                onChangeDate('paidUpToDate', value);
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
);

export default CreatePayRunDates;