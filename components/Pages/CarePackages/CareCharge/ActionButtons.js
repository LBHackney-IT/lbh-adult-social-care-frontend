import { Button, Container, VerticalSeparator } from 'components';
import React, { useState } from 'react';

export const ActionButtons = ({ onEdit, onRevert, onCancel,isCancelDisabled, onEnd, isNew }) => {
  const [editMode, setEditMode] = useState(false);

  const handleEdit = () => {
    onEdit();
    setEditMode(true);
  };

  const handleRevert = () => {
    onRevert();
    setEditMode(false);
  };
  return (
    <Container display="flex">
      <Button onClick={editMode || isNew ? handleRevert : handleEdit} secondary outline color="gray">
        {isNew ? 'Cancel' : editMode ? 'Revert' : 'Edit'}
      </Button>
      <VerticalSeparator width="10px" />
      <Button disabled={isCancelDisabled} onClick={onCancel} secondary outline color="blue">
        Cancel Provisional
      </Button>
      <VerticalSeparator width="10px" />
      <Button onClick={onEnd} secondary outline color="red">
        End Provisional
      </Button>
    </Container>
  );
};
