import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CircleCloseIcon } from '../../Icons';
import { useScrollLock } from '../../../service';

export default function Dialog ({
  children,
  noBorder,
  onClose,
  isOpen,
  className = '',
  closeIcon = <CircleCloseIcon />,
}) {
  const [windowState, setWindowState] = useState();

  useScrollLock(isOpen);

  useEffect(() => {
    const onClickOutside = (e) => {
      if (e.target.classList.contains('lbh-dialog-container')) {
        onClose();
      }
    };
    setWindowState(window);
    window.addEventListener('click', onClickOutside);

    return () => {
      window.removeEventListener('click', onClickOutside);
    };
  }, [onClose]);

  if (!windowState) return null;

  const noBorderClass = noBorder ? ' no-border' : '';

  return (
    isOpen &&
    createPortal(
      <div className={`lbh-dialog-container ${className}`} data-reach-dialog-overlay>
        <div aria-modal="true" role="dialog" className={`lbh-dialog${noBorderClass}`} data-reach-dialog-content>
          {children}
          <button className="lbh-dialog__close" type="button" onClick={onClose}>
            <span className="govuk-visually-hidden">Close</span>
            {closeIcon}
          </button>
        </div>
      </div>,
      window?.document?.body
    )
  );
}
