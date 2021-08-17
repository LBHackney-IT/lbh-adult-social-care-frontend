import React, { useEffect } from 'react';
import { Button } from './Button';
import { CircleCloseIcon } from './Icons';
import Loading from './Loading'

const Popup = ({ mainContent, loading, firstButton, className = '', secondButton, title, closePopup }) => {
  useEffect(() => {
    const onClickOutside = (e) => {
      if (e.target.classList.contains('popup')) {
        closePopup();
      }
    };
    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, [closePopup]);

  return (
    <div className={`popup ${className}`}>
      <div className="popup__inner-content">
        {loading && <Loading />}
        <div className="popup__header">
          <p className="popup__header-title">{title}</p>
          <div onClick={closePopup} className="popup__close-button" role="presentation">
            <CircleCloseIcon />
          </div>
        </div>
        <div className="popup_main">{mainContent && mainContent}</div>
        <div className="popup__action-buttons">
          {firstButton && (
            <Button onClick={() => (firstButton.onClick ? firstButton.onClick() : console.log(firstButton.text))}>
              {firstButton.text}
            </Button>
          )}
          {secondButton && (
            <Button onClick={() => (secondButton.onClick ? secondButton.onClick() : console.log(secondButton.text))}>
              {secondButton.text}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Popup;
