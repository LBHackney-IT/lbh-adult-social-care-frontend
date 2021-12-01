import React from 'react';
import { Controller } from 'react-hook-form';
import { Checkbox, Container, DatePicker, FormGroup, VerticalSeparator } from 'components';

export const BrokerPackageDateSelection = ({ control, isOngoing, errors }) => (
  <Container className="brokerage__container">
    <FormGroup label="Package dates" error={errors.startDate?.message}>
      <Container display="flex">
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DatePicker
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
          name="endDate"
          control={control}
          render={({ field }) => (
            <DatePicker
              disabled={isOngoing}
              day={{ label: 'To' }}
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
          name="isOngoing"
          control={control}
          render={({ field }) => (
            <Checkbox id='isOngoing' label="Ongoing" value={field.value} onChangeValue={field.onChange} {...field} />
          )}
        />
      </Container>
    </FormGroup>
  </Container>
);
