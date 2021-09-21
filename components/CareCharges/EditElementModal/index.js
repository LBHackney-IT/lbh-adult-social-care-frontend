import React, { useEffect, useState } from 'react'
import EditElementContent from './EditElementContent';
import { Dialog } from '../../HackneyDS';

export const EditElementModal = ({ isOpened = true, activeElements, isEditStep }) => {
  const [openedModal, setOpenedModal] = useState(true);
  const [editStep, setEditStep] = useState(isEditStep);

  const closeModal = () => setOpenedModal(false);

  useEffect(() => {
    setEditStep(isEditStep);
  }, [isEditStep]);

  return (
    <Dialog className='care-charges-modal' isOpen={isOpened || openedModal} onClose={closeModal}>
      <EditElementContent
        editStep={editStep}
        setEditStep={setEditStep}
        closeModal={closeModal}
        activeElements={activeElements}
        headerText='Edit element'
      />
    </Dialog>
  );
};