import React from 'react';
import { Button, Container, DatePicker, FormGroup, HorizontalSeparator, Input } from 'components';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { formValidationSchema } from 'service/formValidationSchema';
import { v4 as uuidv4 } from 'uuid';

export const NewWeeklyNeed = ({ createNeed }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.newWeeklyAdditionalNeedSchema),
    defaultValues: {
      startDate: null,
      endDate: null,
      cost: null,
      type: 2,
      costPeriod: 2,
      id: uuidv4(),
      isNew: true,
    },
  });

  const startDate = watch('startDate')

  const onSubmit = (data) => createNeed(data);
  return (
    <Container display="flex">
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1' }}>
        <Container display="flex" flexDirection="column" flex="1">
          <FormGroup label="Core" error={errors.cost?.message} smallLabel>
            <Container display="flex" justifyContent="stretch">
              <Controller
                name="cost"
                control={control}
                render={({ field }) => (
                  <Input
                    type="number"
                    step="any"
                    preSign="£"
                    value={field.value}
                    onChangeValue={(text) => field.onChange(parseFloat(text))}
                    flex
                  />
                )}
              />
            </Container>
          </FormGroup>
          <HorizontalSeparator height="10px" />
          <FormGroup label="Start date" error={errors.startDate?.message} smallLabel>
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value ? new Date(field.value) : null}
                  setDate={field.onChange}
                  {...field}
                  floatingCalendar
                  hasClearButton
                  calendarStylePosition={{ left: 32, top: -110 }}
                />
              )}
            />
          </FormGroup>
          <HorizontalSeparator height="10px" />
          <FormGroup label="End date" error={errors.startDate?.message} smallLabel>
            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  date={field.value ? new Date(field.value) : null}
                  minDate={startDate}
                  checkMinDate
                  setDate={field.onChange}
                  {...field}
                  floatingCalendar
                  hasClearButton
                  calendarStylePosition={{ left: 32, top: -110 }}
                />
              )}
            />
          </FormGroup>
          <HorizontalSeparator height="10px" />
        </Container>
        <Container display="flex" justifyContent="flex-end">
          <Button type="submit">Add need</Button>
        </Container>
      </form>
    </Container>
  );
};
