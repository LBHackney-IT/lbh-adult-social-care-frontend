import React, { memo } from 'react';
import { Dialog } from '../../../../HackneyDS';
import EditElementContent from './EditElementContent';

const EditElementModal = ({ isOpen, onClose, data, additionalData }) => (
  <Dialog className="care-charges-modal" isOpen={isOpen} onClose={onClose}>
    <EditElementContent data={data} additionalData={additionalData} onClose={onClose} />
  </Dialog>
);

export default memo(EditElementModal);
