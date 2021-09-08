import React, { useState } from 'react';
import Popup from '../../Popup';
import EditElementContent from './EditElementContent';

const EditElementModal = () => {
  const [openedModal, setOpenedModal] = useState(false);
  const closeModal = () => setOpenedModal(false);

  return (
    <Popup
      closePopup={openedModal}
      title='Edit element'
      mainContent={<EditElementContent />}
      firstButton={{
        text: 'Next',
        onClick: () => console.log('next'),
      }}
      secondButton={{
        text: 'Cancel',
        onClick: () => closeModal(),
      }}
    />
  )
};