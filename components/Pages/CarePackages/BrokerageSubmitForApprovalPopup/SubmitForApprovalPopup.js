import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Popup from '../../../Popup';
import { submitCarePackage, useApprovers } from '../../../../api/index';
import FormGroup from '../../../HackneyDS/FormGroup';
import { Button, Container, Select, Textarea } from '../../../HackneyDS';
import { addNotification } from '../../../../reducers/notificationsReducer';
import { BROKER_PORTAL_ROUTE } from '../../../../routes/RouteConstants';

const SubmitForApprovalPopup = ({ closePopup, packageId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { options: approverOptions, isLoading } = useApprovers();

  const [approverId, setApproverId] = useState('');
  const [approverError, setApproverError] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const changeApprover = (value) => {
    setApproverError('');
    setApproverId(value);
  }

  const submit = async () => {
    if(!approverId) {
      setApproverError('Required field');
      return;
    }
    setLoading(true);
    try {
      await submitCarePackage({
        packageId,
        data: { approverId, notes },
      });
      dispatch(addNotification({ text: 'Success', className: 'success' }));
      router.push(BROKER_PORTAL_ROUTE);
    } catch (e) {
      dispatch(addNotification({ text: e || 'Something went wrong' }));
    }
    setLoading(false);
  };

  const popupMainContent = (
    <Container>
      <FormGroup error={approverError} required className="brokerage__approved-by-select" label="To be approved by">
        <Select disabledEmptyComponent error={approverError} options={approverOptions} value={approverId} onChangeValue={changeApprover} />
      </FormGroup>
      <FormGroup className="brokerage__add-notes" label="Add notes">
        <Textarea value={notes} handler={setNotes} />
      </FormGroup>
      <Container className="brokerage__actions">
        <Button isLoading={loading || isLoading} disabled={loading || isLoading} onClick={submit}>Submit</Button>
        <Button onClick={closePopup} className="link-button red">
          Cancel
        </Button>
      </Container>
    </Container>
  );

  return (
    <Popup
      className="brokerage__submit-for-approval"
      closePopup={closePopup}
      mainContent={popupMainContent}
      title="Submit for approval"
    />
  );
};

export default SubmitForApprovalPopup;
