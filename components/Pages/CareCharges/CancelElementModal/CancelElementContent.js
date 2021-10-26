import React, { useState } from 'react';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesModalTitle from '../CareChargesModalTitle';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import { Checkbox } from '../../../HackneyDS';

const CancelElementContent = ({ firstElement, secondElement, headerText }) => {
  const [canceledContribution, setCanceledContribution] = useState(false);

  const returnAction = () => alert('Return');

  const cancelElement = () => {
    let canceledElement = firstElement[0];
    if (canceledContribution) {
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
        className="care-charges-modal__cancel-checkbox"
        onChangeValue={setCanceledContribution}
        value={canceledContribution}
        id="cancelContribution"
        label="Cancel 13+ contribution"
      />
      <div className={canceledContribution ? '' : 'opacity-3'}>
        <CareChargesInfoStatic activeElements={secondElement} />
      </div>
      <p className="text-warning has-text-weight-bold">
        Warning: This will cancel the element, all
        <br />
        transactions will be reversed
      </p>
      <CareChargesModalActions
        actions={[
          { title: 'Cancel element', handler: cancelElement, className: 'warning-button' },
          { title: 'Return', handler: returnAction, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default CancelElementContent;
