import React, { useState } from 'react';
import OptionsElementContent from './OptionsElementContent';
import { Dialog } from '../../../HackneyDS';

export const OptionsElementModal = ({ isOpened = true, options = [] }) => {
  const [openedModal, setOpenedModal] = useState(true);

  const closeModal = () => setOpenedModal(false);

  return (
    <Dialog className="care-charges-modal options-element-modal" isOpen={isOpened || openedModal} onClose={closeModal}>
      <OptionsElementContent closeModal={closeModal} options={options} />
    </Dialog>
  );
};