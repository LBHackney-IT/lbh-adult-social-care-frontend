import React, { memo } from 'react';
import CancelElementContent from './CancelElementContent';
import { Dialog } from '../../../../HackneyDS';

const CancelElementModal = ({ isOpen, onClose, data }) => (
  <Dialog className="care-charges-modal cancel-element-modal" isOpen={isOpen} onClose={onClose}>
    <CancelElementContent headerText="Cancel element" onClose={onClose} data={data} />
  </Dialog>
);

export default memo(CancelElementModal);
