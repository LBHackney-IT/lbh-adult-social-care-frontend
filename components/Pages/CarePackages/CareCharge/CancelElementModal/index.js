import React, { memo } from 'react';
import CancelElementContent from './CancelElementContent';
import { Dialog } from '../../../../HackneyDS';

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

const CancelElementModal = ({
  isOpen,
  onClose,
  firstElement = testFirstElement,
  secondElement = testSecondElement,
}) => (
  <Dialog className="care-charges-modal cancel-element-modal" isOpen={isOpen} onClose={onClose}>
    <CancelElementContent
      firstElement={firstElement}
      secondElement={secondElement}
      headerText="Cancel element"
      onClose={onClose}
    />
  </Dialog>
);

export default memo(CancelElementModal);
