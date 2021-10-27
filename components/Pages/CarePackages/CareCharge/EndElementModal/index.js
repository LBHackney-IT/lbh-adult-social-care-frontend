import React, { memo } from 'react';
import { Dialog } from '../../../../HackneyDS';
import EndElementContent from './EndElementContent';

const EndElementModal = ({ isOpen, onClose, data, control }) => (
  <Dialog className="care-charges-modal end-element-modal" isOpen={isOpen} onClose={onClose}>
    <EndElementContent onClose={onClose} data={data} control={control} headerText="End current element" />
  </Dialog>
);

export default memo(EndElementModal);
