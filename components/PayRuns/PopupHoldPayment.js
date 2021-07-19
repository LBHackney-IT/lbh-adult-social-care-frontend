import React from "react";
import Popup from "../Popup";
import Dropdown from "../Dropdown";
import TextArea from "../TextArea";

const PopupHoldPayment = ({
  closePopup,
  changeActionRequiredBy,
  actionRequiredBy,
  actionRequiredByOptions,
  reason,
  changeReason,
}) => {
  const createPayRun = (
    <div className='hold-payment'>
      <div className='create-pay-run__regular-cycles'>
        <Dropdown
          classes='hold-payment__dropdown'
          label='Action required by'
          onOptionSelect={(value) => changeActionRequiredBy(value)}
          options={actionRequiredByOptions}
          selectedValue={actionRequiredBy}
        />
        <TextArea
          classes='hold-payment__textarea'
          rows={8}
          label='Enter reason for hold And suggested remedial action'
          onChange={value => changeReason(value)}
        >
          {reason}
        </TextArea>
      </div>
    </div>
  );

  return (
    <Popup closePopup={closePopup} mainContent={createPayRun} title='Hold Payment' firstButton={{text: 'Cancel'}} secondButton={{text: 'Hold'}} />
  );
};

export default PopupHoldPayment;
