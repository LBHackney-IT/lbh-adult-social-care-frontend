import React, { memo } from 'react';
import { Dialog, Container, Heading, HorizontalSeparator, VerticalSeparator, Button } from '../../HackneyDS';

const ResetApprovedPackageDialog = ({ isOpen, onClose, handleConfirmation }) => {
  const handleClick = () => {
    handleConfirmation();
    onClose();
  };
  return (
    <Dialog isOpen={isOpen} onClose={onClose}>
      <Container display="flex" flexDirection="column">
        <Heading size="l">Are you sure?</Heading>
        <HorizontalSeparator height="25px" />
        <p>
          Updating this package will reset its status from Waiting for Approval to In Progress.
          <br />
          <HorizontalSeparator height="10px" />
          <strong>This will require it to be resubmitted for approval</strong>.
        </p>
        <HorizontalSeparator height="25px" />
        <Container display="flex" justifyContent="stretch">
          <Button onClick={onClose} outline>
            Cancel
          </Button>
          <VerticalSeparator width="10px" />
          <Button onClick={handleClick}>Update</Button>
        </Container>
      </Container>
    </Dialog>
  );
};

export default memo(ResetApprovedPackageDialog);
