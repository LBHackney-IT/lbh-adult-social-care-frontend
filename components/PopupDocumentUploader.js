import React from 'react';
import Popup from './Popup';
import DropZone from './DropZone';

const PopupDocumentUploader = ({
  closePopup,
  classes = '',
  firstButton = { text: 'Upload evidence and more to be uploaded' },
  secondButton = { text: 'Upload evidence and mark done' },
  title = 'Document Uploader',
}) => {
  const popupMainContent = (
    <div className="popup-document-uploader__container">
      <DropZone />
    </div>
  );

  return (
    <Popup
      closePopup={closePopup}
      mainContent={popupMainContent}
      className={`popup-document-uploader ${classes}`}
      title={title}
      firstButton={firstButton}
      secondButton={secondButton}
    />
  );
};

export default PopupDocumentUploader;
