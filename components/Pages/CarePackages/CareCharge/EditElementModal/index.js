import React, { memo } from 'react';
import { Dialog } from '../../../../HackneyDS';
import EditElementContent from './EditElementContent';

const EditElementModal = ({ isOpen, onClose, assessmentFileInfo, data }) => (
  <Dialog className="care-charges-modal" isOpen={isOpen} onClose={onClose}>
    <EditElementContent assessmentFileInfo={assessmentFileInfo} data={data} onClose={onClose} />
  </Dialog>
);

export default memo(EditElementModal);
