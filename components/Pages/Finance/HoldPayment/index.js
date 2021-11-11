import React, { useMemo, useState } from 'react';
import { differenceInDays } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { createDraftPayRun } from 'api/PayRun';
import { addNotification } from 'reducers/notificationsReducer';
import DatePick from '../../../DatePick';
import { Button, Container, Dialog, FormGroup, RadioGroup, Select } from '../../../HackneyDS';
import { Loading } from '../../../index';

const lastCycleDate = new Date();

const defaultValues = {
  actionRequiredBy: null,
};

const schema = yup.object().shape({
  actionRequiredBy: yup
    .number()
    .typeError('Please select a package type')
    .required()
    .min(1, 'Please select a package type'),
});

const CreateDraftPayRun = ({ isOpened, setIsOpened }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: holdPaymentOptions } = useHoldPaymentOptions();

  const closeModal = () => {
    reset();
    setIsOpened(false);
  };

  const onHoldRequest = async (data) => {
    setIsLoading(true);
    try {
      await createDraftPayRun(data);
      setIsOpened(false);
    } catch (e) {
      const isExistingPayRun = e.includes('already exists!');
      const errorText = isExistingPayRun ? `${e} First it has to be (approved or deleted or archived)` : e;
      dispatch(addNotification({ text: errorText, className: isExistingPayRun ? 'warning' : 'error', time: isExistingPayRun ? 15000 : 3000 }));
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
                  <Select
                    options={holdPaymentOptions}
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
                      <span className="font-weight-bold lbh-primary-color">{daysLastCycle ?? 'XX'}</span> days since last cycle
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