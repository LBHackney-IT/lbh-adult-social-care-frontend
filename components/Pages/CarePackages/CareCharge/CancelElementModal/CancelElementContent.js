import React, { useState } from 'react';
import CareChargesModalActions from '../CareChargesModalActions';
import CareChargesModalTitle from '../CareChargesModalTitle';
import CareChargesInfoStatic from '../CareChargesInfoStatic';
import { Checkbox } from '../../../../HackneyDS';

const CancelElementContent = ({ data, headerText, onClose }) => {
  const [canceledContribution, setCanceledContribution] = useState(false);

  const showCheckbox = Boolean(data.checkboxLabel);

  const onCancel = () => {
    // let canceledElement = firstElement[0];
    // if (canceledContribution) {
    //   canceledElement = secondElement[0];
    // }
    // alert(`Canceled success for (${canceledElement.name} ${canceledElement.property})`);
  };

  return (
    <>
      <CareChargesModalTitle title={headerText} />

      <div>
        <CareChargesInfoStatic data={data.topItem} />
      </div>

      {showCheckbox && (
        <>
          <Checkbox
            small
            className="care-charges-modal__cancel-checkbox"
            onChangeValue={setCanceledContribution}
            value={canceledContribution}
            id="cancelContribution"
            label={data.checkboxLabel}
          />

          <div className={canceledContribution ? '' : 'opacity-3'}>
            <CareChargesInfoStatic data={data.bottomItem} />
          </div>
        </>
      )}

      <p className="text-warning has-text-weight-bold">
        Warning: This will cancel the element, all
        <br />
        transactions will be reversed
      </p>

      <CareChargesModalActions
        actions={[
          { title: 'Cancel element', handler: onCancel, className: 'warning-button' },
          { title: 'Return', handler: onClose, className: 'without-background' },
        ]}
      />
    </>
  );
};

export default CancelElementContent;
