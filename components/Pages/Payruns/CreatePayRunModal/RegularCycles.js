import React, { useMemo } from 'react';
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
import { Controller, useForm } from 'react-hook-form';
import { formValidationSchema } from 'service/formValidationSchema';
import { addDays, differenceInDays } from 'date-fns';
import { useLatestPayRunToDate, useReleasedInvoiceNumber } from 'api';
import { Hint } from '../../../HackneyDS';

export const RegularCycles = ({ createPayrun, isLoading, onClose }) => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formValidationSchema.newPayRunRegularCyclesSchema),
    defaultValues: {
      type: 1,
      paidUpToDate: null,
    },
  });

  const [paidUpToDate, type] = watch(['paidUpToDate', 'type']);

  const { data: invoiceNumber, isLoading: invoiceNumberLoading } = useReleasedInvoiceNumber();
  const { data: lastCycleDate, isLoading: lastCycleDateLoading } = useLatestPayRunToDate(type);
  const fullLoading = lastCycleDateLoading || invoiceNumberLoading || isLoading;

  const daysLastCycle = useMemo(() => {
    if (paidUpToDate) {
      const formattedCycleDate = addDays(new Date(lastCycleDate), 1);
      return differenceInDays(
        new Date(paidUpToDate.getFullYear(), paidUpToDate.getMonth(), paidUpToDate.getDate()),
        new Date(formattedCycleDate.getFullYear(), formattedCycleDate.getMonth(), formattedCycleDate.getDate()),
      );
    }
    return 0;
  }, [paidUpToDate, lastCycleDate]);

  const cycleOptions = useMemo(() => [
    {
      id: 1,
      label:
        <p>
          Residential Recurring
          {invoiceNumber ? <span className="lbh-color-green font-size-14px"> ({invoiceNumber} releases)</span> : ''}
        </p>
    },
    { id: 2, label: 'Direct Payments' },
  ], [invoiceNumber]);

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
                minDate={lastCycleDate && addDays(new Date(lastCycleDate), 1)}
                floatingCalendar
                calendarStylePosition={{ top: -100, left: 32 }}
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
        <HorizontalSeparator height="24px" />
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
