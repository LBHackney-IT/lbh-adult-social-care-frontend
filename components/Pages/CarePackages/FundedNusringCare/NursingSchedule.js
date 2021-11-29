import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, Container, DatePicker, FormGroup, VerticalSeparator } from 'components';

export const NursingSchedule = ({ control, minStartDate, isOngoing, errors, startDate }) => (
  <Container className="brokerage__container">
    <FormGroup label="Funded Nursing Care Schedule..." error={errors.startDate?.message}>
      <Container display="flex">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              minDate={minStartDate && new Date(minStartDate)}
              day={{ label: 'From' }}
              date={field.value ? new Date(field.value) : null}
              setDate={field.onChange}
              {...field}
              hasClearButton
            />
          )}
        />
        <VerticalSeparator width="20px" />
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              disabled={isOngoing}
              minDate={startDate}
              checkMinDate
              day={{ label: 'To' }}
              date={field.value ? new Date(field.value) : null}
              setDate={field.onChange}
              {...field}
              hasClearButton
            />
          )}
        />
        <VerticalSeparator width="20px" />
        <Controller
          name="isOngoing"
          control={control}
          render={({ field }) => (
            <Checkbox id='ongoing' label="Ongoing" value={field.value} onChangeValue={field.onChange} {...field} />
          )}
        />
      </Container>
    </FormGroup>
  </Container>
);
