import React, { useState } from 'react';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesModalTitle from '../CareChargesModalTitle';
import { Checkbox } from '../../HackneyDS/index';
import CareChargesInfoStatic from '../CareChargesInfoStatic';

const CancelElementContent = ({
  firstElement,
  secondElement,
  closeModal,
  headerText,
}) => {
  const [canceledContribution, setCanceledContribution] = useState(false);

  const returnAction = () => alert('Return');

  const cancelElement = () => {
    let canceledElement = firstElement[0];
    if(canceledContribution) {
      canceledElement = secondElement[0];
    }
    alert(`Canceled success for (${canceledElement.name} ${canceledElement.property})`);
  };

  return (
    <>
      <CareChargesModalTitle title={headerText} />
      <div className={canceledContribution ? 'opacity-3' : ''}>
        <CareChargesInfoStatic activeElements={firstElement} />
      </div>
      <Checkbox
        small
        className='care-charges-modal__cancel-checkbox'
        handler={(checked) => setCanceledContribution(checked)}
        value={canceledContribution}
        checked={canceledContribution}
        id='cancelContribution'
      >
        Cancel 13+ contribution
      </Checkbox>
      <div className={canceledContribution ? '' : 'opacity-3'}>
        <CareChargesInfoStatic activeElements={secondElement} />
      </div>
      <p className='warning-text has-text-weight-bold mb-5'>
        Warning: This will cancel the element, all<br/>
        transactions will be reversed
      </p>
      <CareChargesModalActions
        actions={[
          { title: 'Cancel element', handler: cancelElement, className: 'warning-button' },
          { title: 'Return', handler: returnAction, className: 'without-background' },
        ]}
      />
    </>
  )
};

export default CancelElementContent;