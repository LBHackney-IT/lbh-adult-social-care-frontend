import React, { useMemo, useState } from 'react';
import { Button, Container, Heading, Hint, HorizontalSeparator, VerticalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import { approvePayRun, rejectPayRun } from 'api/PayRun';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Dialog, FormGroup, Textarea } from '../../../HackneyDS';
import Loading from '../../../Loading';

const errorText = {
  Approve: 'approval',
  Decline: 'decline'
};

export const HighLevelInsight = ({
  payRunId,
  total = 0,
  difference = 0,
  suppliers = 0,
  serviceUsers = 0,
  holdCount = 0,
  holdValue = 0,
  update,
}) => {
  const dispatch = useDispatch();
  const [openedModal, setOpenedModal] = useState('');
  const [loading, setLoading] = useState(false);
  const isDeclineModal = openedModal === 'Decline';
  const isApproveModal = openedModal === 'Approve';

  const schema = useMemo(() => (
    yup.object().shape({
      notes: yup
        .string()
        .required(`Please put a reason for ${errorText[openedModal]}`)
        .test('notes', `Please put a reason for ${errorText[openedModal]}`, (value) => value.trim?.())
    })), [openedModal]);

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleApprove = async (notes) => {
    try {
      await approvePayRun(payRunId, notes);
      pushNotification(`Invoice status changed`, 'success');
      update();
    } catch (e) {
      pushNotification(e);
    }
  };

  const openModal = (name) => () => {
    setOpenedModal(name);
  };

  const closeModal = () => {
    setOpenedModal('');
    reset();
  };

  const makePayRunAction = async ({ notes }) => {
    console.log(notes);
    setLoading(true);
    if (isApproveModal) {
      await handleApprove(notes);
    } else {
      await handleReject(notes);
    }
    closeModal();
    setLoading(false);
  };

  const handleReject = async (notes) => {
    try {
      await rejectPayRun(payRunId, notes);
      pushNotification(`Invoice status changed`, 'success');
      update();
    } catch (e) {
      pushNotification(e);
    }
  };

  const increaseOrDecrease = difference > 0 ? 'increase' : 'decrease';

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { notes: '' },
  });
  const onSubmit = (data) => makePayRunAction(data);

  return (
    <>
      <Loading isLoading={loading} />
      <Dialog className="high-level-insight--dialog" isOpen={openedModal} noBorder closeIcon="" onClose={closeModal}>
        <h3>{openedModal} Pay Run</h3>
        <HorizontalSeparator height={32} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="notes"
            render={({ field }) => (
              <FormGroup horizontalSeparator={8} error={errors.notes?.message} required label="Add Notes">
                <Textarea
                  value={field.value}
                  handler={field.onChange}
                  rows={5}
                  {...field}
                />
              </FormGroup>
            )}
          />
          <HorizontalSeparator height={32} />
          <Container display="flex" alignItems="center">
            <Button
              type="submit"
              secondary={isDeclineModal}
              color={isDeclineModal && 'red'}
            >
              {openedModal} Pay Run
            </Button>
            <VerticalSeparator width={24} />
            <Button
              onClick={closeModal}
              outline
              color="gray"
              secondary
              className="no-border link-button"
            >
              Cancel
            </Button>
          </Container>
        </form>
      </Dialog>
      <Container background="#FAFAFA" padding="24px 16px">
        <Container display="flex" justifyContent="space-between">
          <Container display="flex" flexDirection="column">
            <Hint>High Level Insight</Hint>
            <HorizontalSeparator height="5px" />
            <Heading size="xl" color="#00664F">
              £{getNumberWithCommas(total)}
            </Heading>
            <HorizontalSeparator height="5px" />
            {`£${getNumberWithCommas(Math.abs(difference))} ${increaseOrDecrease} from last cycle`}
          </Container>
          <Container border="1px solid rgba(82, 90, 91, 0.25)" />

          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {suppliers}
            </Heading>
            Suppliers
          </Container>
          <Container border="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {serviceUsers}
            </Heading>
            Service Users
          </Container>
          <Container border="1px solid rgba(82, 90, 91, 0.25)" />
          <Container display="flex" flexDirection="column" textAlign="center" alignSelf="center">
            <Heading size="xl" color="#00664F">
              {holdCount}
            </Heading>
            Holds worth £{getNumberWithCommas(holdValue)}
          </Container>
          <Container display="flex" flexDirection="column" alignSelf="center">
            <Button onClick={openModal('Approve')}>Approve</Button>
            <HorizontalSeparator height="10px" />
            <Button className="no-border link-button" color="red" secondary onClick={openModal('Decline')} outline>
              Reject
            </Button>
          </Container>
        </Container>
      </Container>
    </>
  );
};
