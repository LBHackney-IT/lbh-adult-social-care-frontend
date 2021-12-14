import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, Container, DatePicker, FormGroup, VerticalSeparator } from 'components';

export const CareChargeSchedule = ({
  disabled,
  startDate,
  endDate,
  checkboxName,
  minDate,
  maxDate,
  control,
  isOngoing,
  noOngoing,
  errors,
  startDateDisabled,
  endDateDisabled,
}) => (
  <FormGroup label="Care Charge Schedule..." error={errors?.startDate?.message || errors?.endDate?.message}>
    <Container display="flex">
      <Controller
        name={startDate}
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={minDate ? new Date(minDate) : null}
            maxDate={maxDate ? new Date(maxDate) : null}
            disabled={disabled || startDateDisabled}
            day={{ label: 'From' }}
            date={field.value ? new Date(field.value) : null}
            setDate={field.onChange}
            calendarStylePosition={{ top: 42 }}
            {...field}
            hasClearButton
          />
        )}
      />
      <VerticalSeparator width="20px" />
      <Controller
        name={endDate}
        control={control}
        render={({ field }) => (
          <DatePicker
            minDate={minDate ? new Date(minDate) : null}
            maxDate={maxDate ? new Date(maxDate) : null}
            disabled={disabled || endDateDisabled || isOngoing}
            day={{ label: 'To' }}
            date={field.value ? new Date(field.value) : null}
            setDate={field.onChange}
            {...field}
            calendarStylePosition={{ top: 42 }}
            hasClearButton
          />
        )}
      />
      {!noOngoing && (
        <>
          <VerticalSeparator width="20px" />
          <Controller
            name={checkboxName}
            control={control}
            render={({ field }) => (
              <Checkbox
                disabled={disabled}
                id={checkboxName}
                label="Ongoing"
                value={field.value}
                onChangeValue={field.onChange}
                {...field}
              />
            )}
          />
        </>
      )}
    </Container>
  </FormGroup>
);
