import React, {useEffect} from "react";
import {Button} from "./Button";
import {CircleCloseIcon} from "./Icons";

const Popup = ({ mainContent, firstButton, secondButton, title, closePopup }) => {

  useEffect(() => {
    const onClickOutside = (e) => {
      if(e.target.classList.contains('popup')) {
        closePopup()
      }
    }
    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, []);

  return (
    <div className='popup'>
      <div className='popup__inner-content'>
        <div className='popup__header'>
          <p className='popup__header-title'>{title}</p>
          <div onClick={closePopup} className='popup__close-button'>
            <CircleCloseIcon />
          </div>
        </div>
        <div className='popup_main'>{mainContent && mainContent}</div>
        <div className='popup__action-buttons'>
          {firstButton && <Button >{firstButton.text}</Button>}
          {secondButton && <Button>{secondButton.text}</Button>}
        </div>
      </div>
    </div>
  )
};

export default Popup;
