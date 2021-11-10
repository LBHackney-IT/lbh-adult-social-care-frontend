import React, { useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createDraftPayRun } from 'api/PayRun';
import { addNotification } from 'reducers/notificationsReducer';
import DatePick from '../../../DatePick';
import { Button, Container, Dialog, FormGroup, HorizontalSeparator, RadioGroup } from '../../../HackneyDS';
import { Loading } from '../../../index';

const regularCyclesOptions = [
  { divider: <><h4>Ad Hoc and Releases</h4><p>NB - pay cycles will always include released holds.</p></> },
  {
    label: <p>Residential Recurring <span className="lbh-primary-color">(3 releases)</span></p>,
    id: 1
  },
  { label: 'Direct Payments', id: 2 },
  { label: 'Home care', id: 3 },
  { divider: <HorizontalSeparator height={26} /> },
  { divider: <><h4>Ad Hoc and Releases</h4><p>NB - pay cycles will always include released holds.</p></> },
  { label: 'Residential released holds', id: 4 },
  { label: 'Direct payments released holds', id: 5 },
];

const lastCycleDate = new Date();

const defaultValues = {
  type: null,
  paidUpToDate: null,
};

const schema = yup.object().shape({
  type: yup
    .number()
    .typeError('Please select a package type')
    .required()
    .min(1, 'Please select a package type'),
  paidUpToDate: yup
    .date()
    .typeError('Please select correct date')
    .required('Pay run date to is required'),
});

const CreateDraftPayRun = ({ isOpened, setIsOpened }) => {
  const dispatch = useDispatch();
  const [paidUpToDate, setPaidUpToDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [maxDate] = useState(new Date());

  const daysLastCycle = useMemo(() => {
    if (paidUpToDate) {
      return differenceInDays(
        new Date(lastCycleDate.getFullYear(), lastCycleDate.getMonth(), lastCycleDate.getDate()),
        new Date(paidUpToDate.getFullYear(), paidUpToDate.getMonth(), paidUpToDate.getDate()),
      );
    }
    return null;
  }, [paidUpToDate]);

  const closeModal = () => {
    reset();
    setIsOpened(false);
  };

  const onCreateDraftPayRun = async (data) => {
    setIsLoading(true);
    try {
      await createDraftPayRun(data);
      setIsOpened(false);
    } catch (e) {
      dispatch(addNotification({ text: e }));
    }
    setIsLoading(false);
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <>
      <Dialog noBorder isOpen={isOpened} onClose={closeModal} className="create-pay-run__modal">
        <Loading isLoading={isLoading} />
        <h3>Create pay run</h3>
        <form onSubmit={handleSubmit(onCreateDraftPayRun)}>
          <Container display="flex" justifyContent="space-between">
            <Container className="create-pay-run__radios">
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <RadioGroup
                    small
                    name="type"
                    error={errors.type?.message}
                    handle={field.onChange}
                    items={regularCyclesOptions}
                    {...field}
                  />
                )}
              />
            </Container>
            <Container className="create-pay-run__date-to">
              <Controller
                name="paidUpToDate"
                control={control}
                render={({ field }) => (
                  <FormGroup error={errors.paidUpToDate?.message}>
                    <DatePick
                      startDate={field.value}
                      setDate={(value) => {
                        setPaidUpToDate(value);
                        field.onChange(value);
                      }}
                      maxDate={maxDate}
                      dateValue={field.value}
                      label="Pay run to:"
                    />
                    <p>
                      <span className="lbh-primary-color">{daysLastCycle ?? 'XX'}</span> days since last cycle
                    </p>
                  </FormGroup>
                )}
              />
            </Container>
          </Container>
          <Container className="create-pay-run__actions" display="flex">
            <Button onClick={closeModal} borderRadius={0} outline color="gray" secondary>Cancel</Button>
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              className="disable-shadow"
              borderRadius={0}
            >
              Create Draft Pay Run
            </Button>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default CreateDraftPayRun;