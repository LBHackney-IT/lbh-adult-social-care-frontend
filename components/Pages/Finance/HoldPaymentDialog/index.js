import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { holdInvoice } from 'api/PayRun';
import { useDepartments } from 'api';
import { Button, Container, Dialog, FormGroup, HorizontalSeparator, Select, Textarea } from '../../../HackneyDS';
import Loading from '../../../Loading';

const defaultValues = {
  actionRequiredFromId: null,
  reasonForHolding: null,
};

const schema = yup.object().shape({
  actionRequiredFromId: yup
    .number()
    .typeError('Please select an option')
    .required('Please select an option')
    .min(1, 'Please select an option'),
  reasonForHolding: yup
    .string()
    .typeError('Please enter a reason')
    .required('Please enter a reason')
    .test('reasonForHolding', 'Please enter a reason', (value) => value?.trim?.())
});

const HoldPaymentDialog = ({ invoiceId, payRunId, isOpen, setIsOpened, update }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { data: holdPaymentOptions } = useDepartments();

  const closeModal = () => {
    reset();
    setIsOpened();
  };

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const onHoldRequest = async ({ reasonForHolding, actionRequiredFromId }) => {
    setIsLoading(true);
    try {
      await holdInvoice({ reasonForHolding, payRunId, actionRequiredFromId, invoiceId });
      pushNotification(`Invoice status changed`, 'success');
      update();
      setIsOpened(false);
    } catch (e) {
      pushNotification(e, 'error');
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
      <Dialog noBorder isOpen={isOpen} onClose={closeModal} className="hold-payment-modal">
        <Loading isLoading={isLoading} />
        <h3>Hold Payment</h3>
        <form onSubmit={handleSubmit(onHoldRequest)}>
          <Controller
            control={control}
            name="actionRequiredFromId"
            render={({ field }) => (
              <FormGroup required error={errors.actionRequiredFromId?.message} label="Action required by">
                <Select
                  options={holdPaymentOptions}
                  fields={{
                    value: 'id',
                    text: 'name',
                  }}
                  value={field.value}
                  onChangeValue={field.onChange}
                />
              </FormGroup>
            )}
          />
          <HorizontalSeparator height={32} />
          <Controller
            control={control}
            name="reasonForHolding"
            render={({ field }) => (
              <FormGroup error={errors.reasonForHolding?.message} required label="Enter reason for hold And suggested remedial action">
                <Textarea
                  trimValue
                  value={field.value}
                  handler={field.onChange}
                  rows={5}
                />
              </FormGroup>
            )}
          />
          <HorizontalSeparator height={32} />
          <Container className="create-pay-run__actions" display="flex">
            <Button onClick={closeModal} borderRadius={0} outline color="gray" secondary>Cancel</Button>
            <Button
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
              className="disable-shadow"
              borderRadius={0}
            >
              Hold
            </Button>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default HoldPaymentDialog;