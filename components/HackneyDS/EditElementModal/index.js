import React, { useEffect, useState } from 'react';
import EditElementContent from './EditElementContent';
import { Dialog } from '../index';

export const EditElementModal = ({ isOpened, activeElements }) => {
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
  )
};