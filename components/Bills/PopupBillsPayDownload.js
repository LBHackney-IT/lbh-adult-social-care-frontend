import React from 'react';
import Popup from '../Popup';
import TextArea from '../TextArea';

const PopupBillsPayDownload = ({ closePopup, payBills }) => {
  const createPayRun = (
    <div className="pay-bills">
      <TextArea className="pay-bills__textarea" rows={8}>
        {payBills}
      </TextArea>
    </div>
  );

  return (
    <Popup
      closePopup={closePopup}
      mainContent={createPayRun}
      title="Pay Index"
      firstButton={{ text: 'Cancel' }}
      secondButton={{ text: 'Pay & Download Export File' }}
    />
  );
};

export default PopupBillsPayDownload;
