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
  { id: 3, label: 'Residential released holds' },
  { id: 4, label: 'Direct payments released holds' },
];

export const AdHocAndReleases = ({ createPayrun, isLoading, onClose }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.adHochAndReleasesSchema),
    defaultValues: {
      type: 3,
      paidUpToDate: null,
      paidFromDate: null,
    },
  });

  const onSubmit = (data) => createPayrun(data);

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)} style={{ flex: '1' }}>
        <FormGroup label="Ad Hoc and Releases" smallLabel>
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
        <FormGroup label="Paid From" error={errors.paidUpToDate?.message} smallLabel>
          <Controller
            name="paidFromDate"
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
        <HorizontalSeparator height="10px" />
        <FormGroup label="Paid To" error={errors.paidUpToDate?.message} smallLabel>
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
          <Button type="button" onClick={onClose} outline secondary color="red">
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
