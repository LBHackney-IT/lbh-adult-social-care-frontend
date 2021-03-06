import { Controller, useForm } from 'react-hook-form';
import React, { useMemo, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { approvePayRun } from 'api/PayRun';
import {
  Button,
  Container,
  Dialog,
  FormGroup,
  HorizontalSeparator,
  Textarea,
  VerticalSeparator,
  Heading,
} from '../../../HackneyDS';
import Loading from '../../../Loading';

const errorText = {
  Approve: 'approval',
  Reject: 'reject',
};

const ApproveRejectModal = ({ openedModal, title = 'Pay Run', closeModal, rejectRequest, updateData, payRunId }) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const isRejectModal = openedModal === 'Reject';
  const isApproveModal = openedModal === 'Approve';

  const schema = useMemo(
    () =>
      yup.object().shape({
        notes: yup
          .string()
          .required(`Please put a reason for ${errorText[openedModal]}`)
          .test('notes', `Please put a reason for ${errorText[openedModal]}`, (value) => value.trim?.()),
      }),
    [openedModal]
  );

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleApprove = async (notes) => {
    try {
      await approvePayRun(payRunId, notes);
      pushNotification(`Pay run status changed`, 'success');
      updateData();
    } catch (e) {
      pushNotification(e);
    }
  };

  const onCloseModal = () => {
    closeModal('');
    reset();
  };

  const makeAction = async ({ notes }) => {
    setLoading(true);
    if (isApproveModal) {
      await handleApprove(notes);
    } else {
      await handleReject(notes);
    }
    onCloseModal();
    setLoading(false);
  };

  const handleReject = async (notes) => {
    try {
      if (rejectRequest) await rejectRequest(notes);
    } catch (e) {
      pushNotification(e);
    }
  };

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { notes: '' },
  });
  const onSubmit = (data) => makeAction(data);

  return (
    <>
      <Loading isLoading={loading} />
      <Dialog className="high-level-insight--dialog" isOpen={openedModal} noBorder closeIcon="" onClose={onCloseModal}>
        <Heading size="xl">
          {openedModal} {title}
        </Heading>
        <HorizontalSeparator height={32} />
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="notes"
            render={({ field }) => (
              <FormGroup horizontalSeparator={8} error={errors.notes?.message} required label="Add Notes">
                <Textarea value={field.value} handler={field.onChange} rows={5} {...field} />
              </FormGroup>
            )}
          />
          <HorizontalSeparator height={32} />
          <Container display="flex" alignItems="center">
            <Button type="submit" secondary={isRejectModal} color={isRejectModal && 'red'}>
              {openedModal} {title}
            </Button>
            <VerticalSeparator width={24} />
            <Button onClick={onCloseModal} outline color="gray" secondary className="no-border link-button">
              Cancel
            </Button>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default ApproveRejectModal;
