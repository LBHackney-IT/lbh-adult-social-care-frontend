import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  Button,
  Container,
  DatePicker,
  FormGroup,
  HorizontalSeparator,
  RadioGroup,
  VerticalSeparator,
} from 'components';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formValidationSchema } from 'service/formValidationSchema';

const cycleOptions = [
  { id: 1, label: 'Residential Recurring' },
  { id: 2, label: 'Direct Payments' },
];

export const RegularCycles = ({ createPayrun, isLoading, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.newPayRunRegularCyclesSchema),
    defaultValues: {
      type: 1,
      paidUpToDate: null,
    },
  });

  const onSubmit = (data) => createPayrun(data);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1' }}>
        <FormGroup label="Regular Cycles" smallLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup
                // name="type"
                error={errors.type?.message}
                small
                handle={field.onChange}
                items={cycleOptions}
                {...field}
              />
            )}
          />
        </FormGroup>
        <HorizontalSeparator height="10px" />
        <FormGroup label="Paid up to" error={errors.paidUpToDate?.message} smallLabel>
          <Controller
            name="paidUpToDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                date={field.value ? new Date(field.value) : null}
                setDate={field.onChange}
                {...field}
                floatingCalendar
                hasClearButton
              />
            )}
          />
        </FormGroup>
        <HorizontalSeparator height="20px" />
        <Container display="flex" justifyContent="flex-start">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <VerticalSeparator width="10px" />
          <Button type="submit" isLoading={isLoading}>
            Create
          </Button>
        </Container>
      </form>
    </Container>
  );
};
