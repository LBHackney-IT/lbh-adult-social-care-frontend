import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { submitCarePackage, useApproversOptions } from 'api';
import { usePushNotification } from 'service';
import { BROKERAGE_ROUTE } from 'routes/RouteConstants';
import { Button, Container, Dialog, Select, Textarea, FormGroup } from '../../../HackneyDS';

const SubmitForApprovalPopup = ({ closePopup, packageId }) => {
  const router = useRouter();
  const pushNotification = usePushNotification();
  const { options: approverOptions, isLoading } = useApproversOptions();

  const [approverId, setApproverId] = useState('');
  const [approverError, setApproverError] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const changeApprover = (value) => {
    setApproverError('');
    setApproverId(value);
  };

  const submit = async () => {
    if (!approverId) {
      setApproverError('Required field');
      return;
    }
    setLoading(true);
    try {
      await submitCarePackage({
        packageId,
        data: { approverId, notes },
      });
      pushNotification('Success', 'success');
      router.push(BROKER_PORTAL_ROUTE);
    } catch (e) {
      pushNotification(e)
    }
    setLoading(false);
  };

  return (
    <Dialog className="brokerage__submit-for-approval" onClose={closePopup} isOpen>
      <Container>
        <h2>Submit for approval</h2>
        <FormGroup error={approverError} className="brokerage__approved-by-select" label="To be approved by">
          <Select
            disabledEmptyComponent
            error={approverError}
            options={approverOptions}
            value={approverId}
            onChangeValue={changeApprover}
          />
        </FormGroup>
        <FormGroup className="brokerage__add-notes" label="Add notes">
          <Textarea value={notes} handler={setNotes} />
        </FormGroup>
        <Container className="brokerage__actions">
          <Button onClick={closePopup} outline secondary className='link-button no-border' color="red">
            Cancel
          </Button>
          <Button disabled={loading || isLoading} isLoading={loading || isLoading} onClick={submit}>
            Submit
          </Button>
        </Container>
      </Container>
    </Dialog>
  );
};

export default SubmitForApprovalPopup;
