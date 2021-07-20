import React from 'react';
import Popup from '../Popup';

const PopupDownloadCEDER = ({ closePopup, onDownload = () => console.log('download ceder') }) => (
  <Popup
    classes="popup__download-ceder"
    closePopup={closePopup}
    mainContent={<p>Click below to download export file for CEDER</p>}
    title="Approved"
    secondButton={{
      text: 'Download file for CEDER import',
      onClick: () => onDownload(),
    }}
  />
);

export default PopupDownloadCEDER;
