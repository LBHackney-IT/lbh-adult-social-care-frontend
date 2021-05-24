import React from "react";
import Popup from "../../components/Popup";
import TextArea from "../../components/TextArea";

const PopupBillsPayDownload = ({
  closePopup,
  payBills
}) => {
  const createPayRun = (
    <div className='pay-bills'>
      <TextArea classes='pay-bills__textarea' rows={8}>
        {payBills}
      </TextArea>
    </div>
  );

  return (
    <Popup
      closePopup={closePopup}
      mainContent={createPayRun}
      title='Pay Bills'
      firstButton={{text: 'Cancel'}}
      secondButton={{text: 'Pay & Download Export File'}}
    />
  );
};

export default PopupBillsPayDownload;
