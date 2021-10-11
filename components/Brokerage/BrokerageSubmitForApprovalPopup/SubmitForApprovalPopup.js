import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Popup from '../../Popup';
import { Button, Container, Select, Textarea } from '../../HackneyDS';
import FormGroup from '../../HackneyDS/FormGroup';
import { submitCarePackage } from '../../../api/CarePackages/CarePackage';
import { addNotification } from '../../../reducers/notificationsReducer';

const SubmitForApprovalPopup = ({ closePopup, packageId }) => {
  const dispatch = useDispatch();
  const [notes, setNotes] = useState('');

  const [approverOptions] = useState([
    { text: 'Furkan Kayar', value: 'aee45700-af9b-4ab5-bb43-535adbdcfb84' },
    { text: 'Duncan Okeno', value: '1f825b5f-5c65-41fb-8d9e-9d36d78fd6d8' }
  ]);
  const [approverId, setApproverId] = useState('');

  const submit = async () => {
    try {
      await submitCarePackage({
        packageId,
        data: { approverId, notes }
      });
      dispatch(addNotification({ text: 'Success', className: 'success' }));
      router.push(BROKERAGE_HUB_ROUTE);
    } catch (e) {
      dispatch(addNotification({ text: e || 'Something went wrong' }));
    }
  };

  const popupMainContent = (
    <Container>
      <FormGroup className="brokerage__approved-by-select" label="To be approved by">
        <Select
          options={approverOptions}
          value={approverId}
          onChangeValue={setApproverId}
        />
      </FormGroup>
      <FormGroup className="brokerage__add-notes" label="Add notes">
        <Textarea value={notes} handler={setNotes} />
      </FormGroup>
      <Container className="brokerage__actions">
        <Button handler={submit}>Submit</Button>
        <Button handler={closePopup} className="link-button red">
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