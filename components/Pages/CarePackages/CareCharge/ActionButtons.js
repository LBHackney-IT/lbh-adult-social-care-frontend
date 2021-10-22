import React from 'react';

const ActionButtons = ({ onEdit, onCancel, onEnd }) => (
  <div className="financial-assessment__buttons">
    <button type="button" onClick={onEdit}>
      Edit
    </button>

    <button type="button" onClick={onCancel}>
      Cancel
    </button>

    <button type="button" onClick={onEnd}>
      End
    </button>
  </div>
);

export default ActionButtons;
