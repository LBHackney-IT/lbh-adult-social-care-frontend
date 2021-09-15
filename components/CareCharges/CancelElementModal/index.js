import React, { useState } from 'react';
import CancelElementContent from './CancelElementContent';
import { Dialog } from '../../HackneyDS';

const testFirstElement = [
  {
    id: 1,
    name: 'Residential SU contribution',
    property: 'Without Property 1-12 weeks',
    dateFromWeeks: 1,
    dateToWeeks: 12,
    value: '200',
    claimedBy: 'net',
    startDate: new Date(2021, 1, 2),
    endDate: new Date(2021, 1, 5),
  },
];
const testSecondElement = [
  {
    id: 1,
    name: 'Residential SU contribution',
    property: 'Without Property 13+ weeks',
    dateFromWeeks: 0,
    value: '200',
    claimedBy: 'net',
    startDate: new Date(2021, 2, 5),
    endDate: new Date(2021, 2, 9),
  },
];

export const CancelElementModal = ({ isOpened = true, firstElement = testFirstElement, secondElement = testSecondElement }) => {
  const [openedModal, setOpenedModal] = useState(true);

  const closeModal = () => setOpenedModal(false);

  return (
    <Dialog className='care-charges-modal' isOpen={isOpened || openedModal} onClose={closeModal}>
      <CancelElementContent
        closeModal={closeModal}
        firstElement={firstElement}
        secondElement={secondElement}
        headerText='Cancel element'
      />
    </Dialog>
  )
};