import React from 'react';
import { Button } from '../../../HackneyDS';

const ActionButtons = ({ onEdit, onCancel, onEnd }) => (
  <div className="care-charge__buttons">
    <Button onClick={onEdit} secondary outline color="blue">
      Edit
    </Button>

    <Button onClick={onCancel} secondary outline color="red">
      Cancel
    </Button>

    <Button onClick={onEnd} secondary outline color="blue">
      End
    </Button>
  </div>
);

export default ActionButtons;
