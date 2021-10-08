import React, { useState } from 'react';
import AddElementContent from './AddElementContent';
import { Dialog } from '../../HackneyDS';

const testActiveElements = [
  {
    id: 1,
    name: 'Residential SU contribution',
    property: 'Without Property',
    dateFromWeeks: 0,
    value: '200',
    claimedBy: 'gross',
    startDate: new Date(),
    endDate: new Date(),
  },
];

export const AddElementModal = ({ isOpened = true, activeElements = testActiveElements }) => {
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