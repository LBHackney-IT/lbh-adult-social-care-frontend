import React from 'react';
import { Button } from '../../../HackneyDS';

const ActionButtons = ({ onEdit, onCancel, onEnd }) => (
  <div className="care-charge__buttons">
    <Button onClick={onEdit} className="outline blue">
      Edit
    </Button>

    <Button onClick={onCancel} className="outline red">
      Cancel
    </Button>

    <Button onClick={onEnd} className="outline blue">
      End
    </Button>
  </div>
);

export default ActionButtons;
