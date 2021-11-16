import React, { useState } from 'react';
import { Button, Container, Heading, Hint, HorizontalSeparator, VerticalSeparator } from 'components';
import { getNumberWithCommas } from 'service';
import { approvePayRun, rejectPayRun } from 'api/PayRun';
import { useDispatch } from 'react-redux';
import { addNotification } from 'reducers/notificationsReducer';
import { Dialog, FormGroup, Textarea } from '../../../HackneyDS';
import Loading from '../../../Loading';

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
  const [notesError, setNotesError] = useState('');
  const [notes, setNotes] = useState('');
  const isDeclineModal = openedModal === 'Decline';
  const isApproveModal = openedModal === 'Approve';

  const pushNotification = (text, className = 'error') => {
    dispatch(addNotification({ text, className }));
  };

  const handleApprove = async () => {
    try {
      await approvePayRun({ payRunId, notes });
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
    setNotesError('');
    setNotes('');
  };

  const makePayRunAction = async () => {
    if (isApproveModal && notes.trim() === '') {
      return setNotesError('Please write a note');
    }

    setLoading(true);
    if (isApproveModal) {
      await handleApprove();
    } else {
      await handleReject();
    }
    closeModal();
    setLoading(false);
  };

  const handleReject = async () => {
    try {
      await rejectPayRun({ payRunId, notes });
      pushNotification(`Invoice status changed`, 'success');
      update();
    } catch (e) {
      pushNotification(e);
    }
  };

  const onChangeNotes = (value) => {
    setNotesError('');
    setNotes(value);
  };

  const increaseOrDecrease = difference > 0 ? 'increase' : 'decrease';

  return (
    <>
      <Loading isLoading={loading} />
      <Dialog className="high-level-insight--dialog" isOpen={openedModal} noBorder closeIcon="" onClose={closeModal}>
        <h3>{openedModal} Pay Run</h3>
        <HorizontalSeparator height={32} />
        <FormGroup horizontalSeparator={8} error={notesError} required={isApproveModal} label="Add Notes">
          <Textarea value={notes} handler={onChangeNotes} rows={5} />
        </FormGroup>
        <HorizontalSeparator height={32} />
        <Container display="flex" alignItems="center">
          <Button onClick={makePayRunAction} secondary={isDeclineModal}
                  color={isDeclineModal && 'red'}>{openedModal} Pay Run</Button>
          <VerticalSeparator width={24} />
          <p onClick={closeModal} className="link-button black">Cancel</p>
        </Container>
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
            <p className="link-button red" onClick={openModal('Decline')} outline>
              Reject
            </p>
          </Container>
        </Container>
      </Container>
    </>
  );
};
