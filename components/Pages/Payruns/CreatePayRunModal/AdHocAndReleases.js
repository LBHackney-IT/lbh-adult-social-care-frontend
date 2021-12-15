import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import {
  Button,
  Container,
  DatePicker,
  FormGroup, Hint,
  HorizontalSeparator,
  RadioGroup,
  VerticalSeparator,
} from 'components';
import React, { useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { formValidationSchema } from 'service/formValidationSchema';
import { addDays, differenceInDays } from 'date-fns';
import { useLatestPayRunToDate } from '../../../../api';


const cycleOptions = [
  { id: 3, label: 'Residential released holds' }
];

export const AdHocAndReleases = ({ createPayrun, isLoading, onClose }) => {
  const {
    handleSubmit,
    watch,
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

  const [paidUpToDate, type] = watch(['paidUpToDate', 'type']);

  const { data: lastCycleDate, isLoading: lastCycleDateLoading } = useLatestPayRunToDate(type);
  const fullLoading = lastCycleDateLoading || isLoading;

  const daysLastCycle = useMemo(() => {
    if (paidUpToDate) {
      const formattedCycleDate = new Date(lastCycleDate);
      return differenceInDays(
        new Date(paidUpToDate.getFullYear(), paidUpToDate.getMonth(), paidUpToDate.getDate()),
        new Date(formattedCycleDate.getFullYear(), formattedCycleDate.getMonth(), formattedCycleDate.getDate()),
      );
    }
    return 0;
  }, [paidUpToDate, lastCycleDate]);

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
        <FormGroup label="Pay run to" error={errors.paidUpToDate?.message} smallLabel>
          <Controller
            name="paidUpToDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                date={field.value ? new Date(field.value) : null}
                setDate={field.onChange}
                {...field}
                minDate={lastCycleDate && addDays(new Date(lastCycleDate), 1)}
                floatingCalendar
                calendarStylePosition={{ top: -132, left: 32 }}
                hasClearButton
              />
            )}
          />
        </FormGroup>
        {daysLastCycle !== null && (
          <>
            <HorizontalSeparator height={10} />
            <Hint className="font-size-14px">{daysLastCycle}{daysLastCycle === 1 ? ' day' : ' days'} since last
              cycle</Hint>
          </>
        )}
        <HorizontalSeparator height="20px" />
        <Container display="flex" justifyContent="flex-start">
          <Button type="button" onClick={onClose} outline secondary color="red">
            Cancel
          </Button>
          <VerticalSeparator width="10px" />
          <Button type="submit" isLoading={fullLoading}>
            Create
          </Button>
        </Container>
      </form>
    </Container>
  );
};
