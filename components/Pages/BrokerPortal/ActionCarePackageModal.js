import React from 'react';
import { Button, Container, Dialog, Textarea } from '../../HackneyDS';
import FormGroup from '../../HackneyDS/FormGroup';

const ActionCarePackageModal = ({ close, title, actions, isOpened, notes, setNotes, className }) => (
  <Dialog isOpen={isOpened} onClose={close} className={className}>
    <h2>{title}</h2>
    <FormGroup className="brokerage__add-notes" label="Notes">
      <Textarea value={notes} handler={setNotes}/>
    </FormGroup>
    <Container className="brokerage__actions">
      {actions.map(({ title: actionTitle, onClick, className: actionClassName }) => (
        <Button className={actionClassName} key={actionTitle} handler={onClick}>
          {actionTitle}
        </Button>
      ))}
    </Container>
  </Dialog>
);

export default ActionCarePackageModal;
