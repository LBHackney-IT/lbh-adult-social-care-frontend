import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export default function Dialog({ children, onClose, isOpen, className = '' }) {
  const [windowState, setWindowState] = useState();

  useEffect(() => {
    document.querySelector('html').style.overflow = isOpen ? 'hidden' : 'visible';
  }, [isOpen]);

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

  return (
    isOpen &&
    createPortal(
      <div className={`lbh-dialog-container ${className}`} data-reach-dialog-overlay>
        <div aria-modal="true" role="dialog" className="lbh-dialog" data-reach-dialog-content>
          {children}
          <button className="lbh-dialog__close" type="button" onClick={onClose}>
            <span className="govuk-visually-hidden">Close</span>
            <svg width="18" height="18" viewBox="0 0 13 13" fill="none">
              <path
                d="M-0.0501709 1.36379L1.36404 -0.050415L12.6778 11.2633L11.2635 12.6775L-0.0501709 1.36379Z"
                fill="#0B0C0C"
              />
              <path
                d="M11.2635 -0.050293L12.6778 1.36392L1.36404 12.6776L-0.0501709 11.2634L11.2635 -0.050293Z"
                fill="#0B0C0C"
              />
            </svg>
          </button>
        </div>
      </div>,
      window?.document?.body
    )
  );
}
