import React from 'react';
import { Button, Container, Dialog, Textarea, FormGroup } from '../../HackneyDS';

const ActionCarePackageModal = ({ close, title, actions, isOpened, notes, setNotes, className }) => (
  <Dialog isOpen={isOpened} onClose={close} className={className}>
    <h2>{title}</h2>
    <FormGroup className="brokerage__add-notes" label="Add Notes">
      <Textarea value={notes} handler={setNotes}/>
    </FormGroup>
    <Container className="brokerage__actions">
      {actions.map(({ loading, title: actionTitle, onClick, className: actionClassName }) => (
        <Button disabled={loading} isLoading={loading} className={actionClassName} key={actionTitle} onClick={onClick}>
          {actionTitle}
        </Button>
      ))}
    </Container>
  </Dialog>
);

export default ActionCarePackageModal;
