import React, { useState } from 'react';
import Popup from '../../Popup';
import { Button, Container, Select, Textarea } from '../../HackneyDS';
import FormGroup from '../../HackneyDS/FormGroup';

const SubmitForApprovalPopup = ({ closePopup, approvedByOptions = [] }) => {
  const [approvedBy, setApprovedBy] = useState('');
  const [notes, setNotes] = useState('');

  const submit = () => alert('Submit');

  const popupMainContent = (
    <Container>
      <FormGroup className="brokerage__approved-by-select" label="To be approved by">
        <Select
          options={approvedByOptions}
          value={approvedBy}
          onChangeValue={setApprovedBy}
        />
      </FormGroup>
      <FormGroup className="brokerage__add-notes" label="Add notes">
        <Textarea value={notes} handler={setNotes}/>
      </FormGroup>
      <Container className='brokerage__actions'>
        <Button handler={submit}>Submit</Button>
        <Button handler={closePopup} className="link-button red">Cancel</Button>
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