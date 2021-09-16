import React, { useState } from 'react';
import EditElementContent from './EditElementContent';
import { Dialog } from '../../HackneyDS';

export const EditElementModal = ({ isOpened = true, activeElements }) => {
  const [openedModal, setOpenedModal] = useState(true);

  const closeModal = () => setOpenedModal(false);

  return (
    <Dialog className='care-charges-modal' isOpen={isOpened || openedModal} onClose={closeModal}>
      <EditElementContent
        closeModal={closeModal}
        activeElements={activeElements}
        headerText='Edit element'
      />
    </Dialog>
  );
};