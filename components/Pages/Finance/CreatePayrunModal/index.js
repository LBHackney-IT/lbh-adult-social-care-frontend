import React, { useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePick from '../../../DatePick';
import { Button, Container, Dialog, FormGroup, RadioGroup } from '../../../HackneyDS';

const regularCyclesOptions = [
  {
    label: <p>Residential Recurring <span className="lbh-primary-color">(3 releases)</span></p>,
    id: 3
  },
  { label: 'Direct Payments', id: 4 },
];

const hocAndReleasesOptions = [
  { label: 'Residential released holds', id: 1 },
  { label: 'Direct payments released holds', id: 2 },
];

const lastCycleDate = new Date();

const schema = yup.object().shape({
  regularCycles: yup
    .number()
    .typeError('Please select a package type')
    .required()
    .min(1, 'Please select a package type'),
  hocAndReleases: yup
    .number()
    .typeError('Please select a primary support reason')
    .required()
    .min(1, 'Please select a primary support reason'),
  payRunToDate: yup.date().typeError('Please select correct date').required('Pay run date to is required'),
});

const CreatePayrunModal = () => {
  const [isOpened, setIsOpened] = useState(false);
  const [payRunToDate, setPayRunToDate] = useState(null);
  const [minDate] = useState(new Date());

  const daysLastCycle = useMemo(() => {
    if (payRunToDate) {
      return differenceInDays(
        new Date(payRunToDate.getFullYear(), payRunToDate.getMonth(), payRunToDate.getDate()),
        new Date(lastCycleDate.getFullYear(), lastCycleDate.getMonth(), lastCycleDate.getDate())
      );
    }
  }, [payRunToDate]);

  const closeModal = () => setIsOpened(false);

  const onCreateDraftPayRun = (data) => alert(`Create draft Pay Run: ${Object.values(data)}`);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      regularCycles: null,
      hocAndReleases: null,
      payRunToDate: null,
    },
  });

  return (
    <>
      <Button onClick={() => setIsOpened(true)}>New Pay Run</Button>
      <Dialog noBorder isOpen={isOpened} onClose={closeModal} className="create-pay-run__modal">
        <h3>Create pay run</h3>
        <form onSubmit={handleSubmit(onCreateDraftPayRun)}>
          <Container display="flex" justifyContent="space-between">
            <Container className="create-pay-run__radios">
              <h4>Regular Cycles:</h4>
              <p>NB - pay cycles will always include released holds.</p>
              <Controller
                control={control}
                name="regularCycles"
                render={({ field }) => (
                  <RadioGroup
                    small
                    name="regular-cycles"
                    error={errors.regularCycles?.message}
                    handle={field.onChange}
                    items={regularCyclesOptions}
                    {...field}
                  />
                )}
              />
            </Container>
            <Container className="create-pay-run__date-to">
              <Controller
                name='payRunToDate'
                control={control}
                render={({ field }) => (
                  <FormGroup error={errors.payRunToDate?.message}>
                    <DatePick
                      startDate={field.value}
                      setDate={(value) => {
                        setPayRunToDate(value)
                        field.onChange(value);
                      }}
                      minDate={minDate}
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
          <Container className="create-pay-run__radios">
            <h4>Ad Hoc and Releases</h4>
            <p>NB - pay cycles will always include released holds.</p>
            <Controller
              control={control}
              name="hocAndReleases"
              render={({ field }) => (
                <RadioGroup
                  small
                  name="ad-hoc"
                  error={errors.hocAndReleases?.message}
                  handle={field.onChange}
                  items={hocAndReleasesOptions}
                  {...field}
                />
              )}
            />
          </Container>
          <Container className="create-pay-run__actions" display="flex">
            <Button onClick={closeModal} borderRadius={0} outline color="gray" secondary>Cancel</Button>
            <Button type="submit" disableShadow borderRadius={0}>Create Draft Pay Run</Button>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default CreatePayrunModal;