import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { differenceInDays } from 'date-fns';
import * as yup from 'yup';
import CreatePayRunInfo from './CreatePayRunInfo';
import { Button, Container } from '../../../HackneyDS';
import { useLatestPayRunToDate, useReleasedInvoiceNumber } from '../../../../api';

const defaultValues = {
  paidUpToDate: null,
  regularCycles: null,
};

const schema = yup.object().shape({
  regularCycles: yup.number().typeError('Required field').required('Required field'),
  paidUpToDate: yup.date().typeError('Required field').required('Required field'),
});

const RegularCycles = ({ isLoading, setIsLoading, onCreateDraftPayRun, closeModal }) => {
  const [paidUpToDate, setPaidUpToDate] = useState(null);
  const [payRunTypeId, setPayRunTypeId] = useState();

  const { data: latestPayRunToDateString, isLoading: payRunToDateLoading } = useLatestPayRunToDate({ payRunTypeId });
  const { data: releasedInvoiceNumber, isLoading: invoiceNumberLoading } = useReleasedInvoiceNumber();

  const latestPayRunToDate = latestPayRunToDateString ? new Date(latestPayRunToDateString) : null;

  const daysLastCycle = useMemo(() => {
    if (paidUpToDate && latestPayRunToDate) {
      return differenceInDays(
        new Date(paidUpToDate.getFullYear(), paidUpToDate.getMonth(), paidUpToDate.getDate()),
        new Date(latestPayRunToDate.getFullYear(), latestPayRunToDate.getMonth(), latestPayRunToDate.getDate())
      );
    }
    return null;
  }, [paidUpToDate, latestPayRunToDate]);

  const regularCyclesOptions = useMemo(
    () => [
      { divider: <h4>Regular Cycles:</h4> },
      {
        label: (
          <p>
            Residential Recurring
            <span className="lbh-primary-color">
              {' '}
              ({releasedInvoiceNumber || 0} {releasedInvoiceNumber === 1 ? 'release' : 'releases'})
            </span>
          </p>
        ),
        id: 1,
      },
      { label: 'Direct Payments', id: 2 },
    ],
    [releasedInvoiceNumber]
  );

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (payRunToDateLoading || invoiceNumberLoading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [payRunToDateLoading, invoiceNumberLoading]);

  return (
    <form onSubmit={handleSubmit(onCreateDraftPayRun)}>
      <CreatePayRunInfo
        minDate={latestPayRunToDate}
        fieldStart="paidUpToDate"
        startDate={paidUpToDate}
        onChangeDate={(field, value) => setPaidUpToDate(value)}
        options={regularCyclesOptions}
        onChangeRadio={setPayRunTypeId}
        control={control}
        dateText={<p>{daysLastCycle ?? 'XX'} days since last cycle</p>}
        setPaidUpToDate={setPaidUpToDate}
        errors={errors}
      />
      <Container className="create-pay-run__actions" display="flex">
        <Button onClick={closeModal} borderRadius={0} outline color="gray" secondary>
          Cancel
        </Button>
        <Button isLoading={isLoading} disabled={isLoading} type="submit" className="disable-shadow" borderRadius={0}>
          Create Draft Pay Run
        </Button>
      </Container>
    </form>
  );
};

export default RegularCycles;
