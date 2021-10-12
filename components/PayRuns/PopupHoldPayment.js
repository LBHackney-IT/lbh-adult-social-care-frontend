import React from 'react';
import Popup from '../Popup';
import TextArea from '../TextArea';
import CustomDropDown from '../CustomDropdown'

const PopupHoldPayment = ({
  closePopup,
  changeActionRequiredBy,
  actionRequiredBy,
  actionRequiredByOptions,
  reason,
  holdInvoice,
  changeReason,
}) => {
  const createPayRun = (
    <div className="hold-payment">
      <div className="create-pay-run__regular-cycles">
        <CustomDropDown
          className="hold-payment__dropdown"
          label="Action required by"
          fields={{
            value: 'departmentId',
            text: 'departmentName',
          }}
          onOptionSelect={(value) => changeActionRequiredBy(value)}
          options={actionRequiredByOptions}
          selectedValue={actionRequiredBy}
        />
        <TextArea
          className="hold-payment__textarea"
          rows={8}
          label="Enter reason for hold And suggested remedial action"
          onChange={(value) => changeReason(value)}
        >
          {reason}
        </TextArea>
      </div>
    </div>
  );

  return (
    <Popup
      closePopup={closePopup}
      mainContent={createPayRun}
      title="Hold Payment"
      firstButton={{ text: 'Cancel', onClick: closePopup }}
      secondButton={{ text: 'Hold', onClick: holdInvoice }}
    />
  );
};

export default PopupHoldPayment;
