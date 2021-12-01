import React, { memo } from 'react';
import { Dialog } from '../../../../HackneyDS';
import EditElementContent from './EditElementContent';

const EditElementModal = ({ isOpen, coreStartDate, onClose, fileInfo, data }) => (
  <Dialog className="care-charges-modal" isOpen={isOpen} onClose={onClose}>
    <EditElementContent coreStartDate={coreStartDate} fileInfo={fileInfo} data={data} onClose={onClose} />
  </Dialog>
);

export default memo(EditElementModal);
