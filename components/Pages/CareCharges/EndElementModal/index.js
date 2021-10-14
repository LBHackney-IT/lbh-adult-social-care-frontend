import React, { useState } from 'react';
import EndElementContent from './EndElementContent';
import { Dialog } from '../../../HackneyDS';

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
  {
    id: 2,
    name: 'Residential SU contribution',
    property: 'Without Property 13+ weeks',
    dateFromWeeks: 13,
    value: '200',
    claimedBy: 'net',
    startDate: new Date(2021, 5, 2),
    endDate: new Date(2021, 9, 2),
  }
];

export const EndElementModal = ({ isOpened = true, activeElements = testActiveElements }) => {
  const [openedModal, setOpenedModal] = useState(true);

  const closeModal = () => setOpenedModal(false);

  return (
    <Dialog className='care-charges-modal end-element-modal' isOpen={isOpened || openedModal} onClose={closeModal}>
      <EndElementContent
        closeModal={closeModal}
        activeElements={activeElements}
        headerText='End current element'
      />
    </Dialog>
  )
};