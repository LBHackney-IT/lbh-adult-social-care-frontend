import React, { useState } from 'react';
import AddElementContent from './AddElementContent';
import { Dialog } from '../../HackneyDS';

export const AddElementModal = ({ isOpened = true, activeElements }) => {
  const [openedModal, setOpenedModal] = useState(true);

  const closeModal = () => setOpenedModal(false);

  return (
    <Dialog className='care-charges-modal' isOpen={isOpened || openedModal} onClose={closeModal}>
      <AddElementContent
        closeModal={closeModal}
        activeElements={activeElements}
        headerText='Set up a new element'
      />
    </Dialog>
  );
};