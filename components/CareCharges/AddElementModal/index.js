import React, { useEffect, useState } from 'react';
import AddElementContent from './AddElementContent';
import { Dialog } from '../../HackneyDS';

const testActiveElements = [
  {
    id: 1,
    name: 'Residential SU contribution',
    property: 'Without Property 1-12 weeks',
    dateFromWeeks: 1,
    dateToWeeks: 12,
    value: '200',
    claimedBy: 'gross',
    startDate: new Date(2021, 2, 1),
    endDate: new Date(2021, 5, 1),
  },
];

export const EditElementModal = ({ isOpened = true, activeElements = testActiveElements, isEditStep = true }) => {
  const [openedModal, setOpenedModal] = useState(true);
  const [editStep, setEditStep] = useState(isEditStep);

  const closeModal = () => setOpenedModal(false);

  useEffect(() => {
    setEditStep(isEditStep);
  }, [isEditStep]);

  return (
    <Dialog className='care-charges-modal' isOpen={isOpened || openedModal} onClose={closeModal}>
      <AddElementContent
        editStep={editStep}
        setEditStep={setEditStep}
        closeModal={closeModal}
        activeElements={activeElements}
        headerText='Edit element'
      />
    </Dialog>
  )
};